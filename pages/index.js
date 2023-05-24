import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getRealtorsClients } from '../api/clientsData';
import ListOfClients from '../components/ListOfClients';
import { getRealtors } from '../api/realtorData';
import SideBar from '../components/SideBar';

function Home() {
  const { user } = useAuth();
  const [realtors, setRealtors] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getRealtors().then(setRealtors);
    realtors?.map((realtor) => (getRealtorsClients(realtor?.firebaseKey).then(setClients)));
  }, [realtors]);

  const viewRealtorClients = () => { realtors?.map((realtor) => (getRealtorsClients(realtor?.firebaseKey).then(setClients))); };
  useEffect(() => {
    viewRealtorClients();
  }, []);

  console.warn('My fb', realtors);

  return (
    <>
      {realtors.map((realtor) => ((realtor.realtor_uid === user.uid) ? (
        <>
        <SideBar />
        <div>Hello Realtor</div><h1>Hello {user.displayName}! </h1>
          {clients?.map((client) => <ListOfClients client={client} />)}
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button>
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
