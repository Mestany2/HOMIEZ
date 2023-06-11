import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getClientByUid, getRealtorsClients } from '../api/clientsData';
import ListOfClients from '../components/ListOfClients';
import { getRealtorByUid, getRealtors } from '../api/realtorData';
import SideBar from '../components/SideBar';
import SearchBar from '../components/SearchBar';
import { getHouses } from '../api/houseData';
import Houses from '../components/Houses';
import { signIn } from '../utils/auth';

function Home() {
  const [realtors, setRealtors] = useState([]);
  const [realtor, setRealtor] = useState([]);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const [houses, setHouses] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    getRealtors().then(setRealtors);
    getHouses().then(setHouses);
    getClientByUid(user.uid).then(setClient);
    getRealtorByUid(user.uid).then(setRealtor);
  }, [user]);

  const onUpdateClients = () => {
    realtors?.map((realtorList) => getRealtorsClients(realtorList.firebaseKey).then(setClients));
  };
  const viewRealtorClients = () => {
    realtors?.map((aRealtor) => getRealtorsClients(aRealtor?.firebaseKey).then((clientss) => {
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

  if (realtors && realtors.some((oneRealtor) => oneRealtor.realtor_uid === user.uid)) {
    return (
      <div>
        <SearchBar query={query} setQuery={setQuery} />
        <SideBar profile={realtor[0]} />
        <br />
        <h2>Hello {user.displayName}!</h2>
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
        {filteredClients?.map((theclient) => (
          <ListOfClients key={theclient.firebaseKey} client={theclient} onUpdate={onUpdateClients} />
        ))}
      </div>
    );
  } if (client[0]?.client_uid === user.uid) {
    return (
      <div>
        <SearchBar query={query} setQuery={setQuery} />
        <h1>Hello {user.displayName}!</h1>
        <SideBar client={client[0]} />
        {filteredHouses.map((house) => (
          <Houses key={house.id} house={house} client={client} />
        ))}
      </div>
    );
  }
  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      <div>
        {/* <h2>Please Sign Up</h2>
        <Link passHref href="/realtorForm">
          <Button className="signupbtn" onClick={signIn}>Agent Sign Up </Button>
        </Link>
        <Link passHref href="/clientForm">
          <Button className="signupbtn" onClick={signIn}>Client Sign Up </Button>
        </Link> */}
        <div className="cotn_principal">
          <div className="cont_centrar">

            <div className="cont_login">
              <div className="cont_info_log_sign_up">
                <div className="col_md_login">
                  <div className="cont_ba_opcitiy">
                    <h2>Agent Sign Up</h2>
                    <p>Account Not Found, Please Sign Up Here As An Agnet</p>
                    <Link passHref href="/realtorForm">
                      <Button variant="success" className="signupbtnform" onClick={signIn}>Agent Sign Up </Button>
                    </Link>
                  </div>
                </div>
                <div className="col_md_sign_up">
                  <div className="cont_ba_opcitiy">
                    <h2>Client Sign Up</h2>

                    <p>Account Not Found, Please Sign Up Here As A Client</p>

                    <Link passHref href="/clientForm">
                      <Button variant="secondary" className="signupbtnform" onClick={signIn}>Client Sign Up </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="cont_back_info">
                <div className="cont_img_back_grey">
                  <img src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d" alt="" />
                </div>
              </div>
              <div className="cont_forms">
                <div className="cont_img_back_">
                  <img src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d" alt="" />
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
