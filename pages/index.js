import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getClientByUid, getRealtorsClients } from '../api/clientsData';
import ListOfClients from '../components/ListOfClients';
import { getRealtors } from '../api/realtorData';
import SideBar from '../components/SideBar';
import SearchBar from '../components/SearchBar';
import { getHouses } from '../api/houseData';
import Houses from '../components/Houses';
import { signIn } from '../utils/auth';

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

  const viewRealtorClients = () => {
    realtors?.map((realtor) => getRealtorsClients(realtor?.firebaseKey).then((clientss) => {
      setClients((prevClients) => [...prevClients, ...clientss]);
    }));
  };

  const filteredClients = clients.filter(
    (theClient) => theClient.client_name.toLowerCase().includes(query.toLowerCase())
      || theClient.client_phone.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredHouses = houses.filter(
    (house) => house.address.full.toLowerCase().includes(query.toLowerCase())
      || house.listPrice.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    viewRealtorClients();
  }, [realtors]);

  if (realtors && realtors.some((realtor) => realtor.realtor_uid === user.uid)) {
    const realtor = realtors.map((theRealtor) => theRealtor.realtor_uid === user.uid);

    return (
      <div>
        <SearchBar query={query} setQuery={setQuery} />
        <SideBar profile={realtor} />
        <div>Hello Realtor</div>
        <h1>Hello {user.displayName}!</h1>
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
        {filteredClients.map((theclient) => (
          <ListOfClients key={theclient.firebaseKey} client={theclient} onUpdate={viewRealtorClients} />
        ))}
      </div>
    );
  } if (client[0]?.client_uid === user.uid) {
    return (
      <div>
        <SearchBar query={query} setQuery={setQuery} />
        <div>Hello Client</div>
        <h1>Hello {user.displayName}!</h1>
        <SideBar client={client} />
        {filteredHouses.map((house) => (
          <Houses key={house.id} house={house} client={client} />
        ))}
      </div>
    );
  }
  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      <Nav className="me-auto">
        <Link passHref href="/realtorForm">
          <Nav.Link className="signupbtn" onClick={signIn}>Agent Sign Up</Nav.Link>
        </Link>
        <Link passHref href="/clientForm">
          <Nav.Link className="signupbtn" onClick={signIn}>Client Sign Up</Nav.Link>
        </Link>
      </Nav>
    </div>
  );
}

export default Home;
