import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getRealtorsClients } from '../api/clientsData';
import ListOfClients from '../components/ListOfClients';
import { getRealtors } from '../api/realtorData';
import SideBar from '../components/SideBar';

function Home() {
  const [realtors, setRealtors] = useState([]);
  const [clients, setClients] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    getRealtors().then(setRealtors);
  }, []);

  const viewRealtorClients = () => { realtors?.map((realtor) => (getRealtorsClients(realtor?.firebaseKey).then(setClients))); };

  useEffect(() => {
    viewRealtorClients();
  }, [realtors]);

  return (
    <>
      {realtors?.map((realtor) => ((realtor.realtor_uid === user.uid) ? (
        <>
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
          {clients?.map((client) => <ListOfClients key={client.firebaseKey} client={client} onUpdate={viewRealtorClients} />)}
        </>
      ) : (
        <>
          <div>Hello Client</div>
          <h1>Hello {user.displayName}! </h1>
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button>
        </>
      )))}
    </>

  );
}

export default Home;
