import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getClientByUid, getRealtorsClients } from '../api/clientsData';
import ListOfClients from '../components/ListOfClients';
import { getRealtors } from '../api/realtorData';
import SideBar from '../components/SideBar';
import SearchBar from '../components/SearchBar';
import getHouses from '../api/houseData';
import Houses from '../components/Houses';

function Home() {
  const [realtors, setRealtors] = useState([]);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const [houses, setHouses] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useAuth();
  useEffect(() => {
    getRealtors().then(setRealtors);
    getHouses().then(setHouses);
    getClientByUid(user.uid).then(setClient);
  }, []);

  const viewRealtorClients = () => { realtors?.map((realtor) => (getRealtorsClients(realtor?.firebaseKey).then(setClients))); };
  const filteredClients = clients.filter((theClient) => theClient.client_name.toLowerCase().includes(query.toLowerCase()) || theClient.client_phone.toLowerCase().includes(query.toLocaleLowerCase()));
  const filteredHouses = houses.filter((house) => house.address.full.toLowerCase().includes(query.toLowerCase()) || house.listPrice.toLowerCase().includes(query.toLocaleLowerCase()));

  useEffect(() => {
    viewRealtorClients();
  }, [realtors]);

  console.warn('My client', client);
  return (
    <>
      {realtors?.map((realtor) => ((realtor.realtor_uid === user.uid) ? (
        <>
          <SearchBar query={query} setQuery={setQuery} />
          <Button variant="danger" type="button" size="lg" className="signoutbtn" onClick={signOut}>
            Sign Out
          </Button>
          <SideBar profile={realtor} />
          <div>Hello Realtor</div><h1>Hello {user.displayName}! </h1>
          <div className="fixed_headers">
            <table id="table" className="table table-hover table-mc-light-blue">
              <thead>
                <tr>
                  <th> </th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
            </table>
          </div>
          {filteredClients?.map((theclient) => <ListOfClients key={theclient.firebaseKey} client={theclient} onUpdate={viewRealtorClients} />)}
        </>
      ) : (
        <>
          <div>Hello Client</div>
          <h1>Hello {user.displayName}! </h1>
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button>
          <SearchBar query={query} setQuery={setQuery} />
          <SideBar client={client[0]} />
          {filteredHouses?.map((house) => <Houses house={house} />)}
        </>
      )))}
    </>

  );
}

export default Home;
