import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import XLSX from 'xlsx';
import { useAuth } from '../utils/context/authContext';
import { getClientByUid, getRealtorsClients } from '../api/clientsData';
import ListOfClients from '../components/ListOfClients';
import { getRealtorByUid, getRealtors } from '../api/realtorData';
import SideBar from '../components/SideBar';
import SearchBar from '../components/SearchBar';
import { getHouses } from '../api/houseData';
import Houses from '../components/Houses';
import Loading from '../components/Loading';

function Home() {
  const [realtors, setRealtors] = useState([]);
  const [realtor, setRealtor] = useState([]);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const [houses, setHouses] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sheetData, setSheetData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getRealtors().then((data) => {
      setRealtors(data);
      setIsLoading(false);
    })
      .catch(() => { setIsLoading(true); });
    getHouses().then((data) => setHouses(data));
    getClientByUid(user.uid).then(setClient);
    getRealtorByUid(user.uid).then(setRealtor);
  }, [user]);

  const onUpdateClients = () => {
    getRealtorsClients(realtor[0]?.firebaseKey).then(setClients);
  };
  const viewRealtorClients = () => {
    getRealtorsClients(realtor[0]?.firebaseKey).then((clientss) => {
      setClients((prevClients) => [...prevClients, ...clientss]);
      setSheetData(((prevClients) => [...prevClients, ...clientss]));
    });
  };
  const filteredClients = clients.filter(
    (theClient) => theClient.client_name.toLowerCase().includes(query.toLowerCase())
      || theClient.client_phone.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredHouses = houses.filter(
    (house) => house.address.full.toLowerCase().includes(query.toLowerCase())
      || house.listPrice.toLowerCase().includes(query.toLowerCase()),
  );

  const handleOnExport = () => {
    const wb = XLSX?.utils.book_new();
    const ws = XLSX?.utils.json_to_sheet(sheetData);
    XLSX?.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX?.writeFile(wb, 'Client List.xlsx');
  };
  useEffect(() => {
    viewRealtorClients();
    setSheetData(clients);
  }, [realtor]);

  if (realtors && realtors?.some((oneRealtor) => oneRealtor?.realtor_uid === user.uid)) {
    return (
      <div>
        <SearchBar query={query} setQuery={setQuery} />
        <SideBar profile={realtor[0]} />
        <br />
        <div className="p-4">
          <div className="welcome">
            <div className="content rounded-3 p-3">
              <h1 className="fs-3">Welcome to Dashboard</h1>
              <p className="mb-0">Hello {user.displayName}, welcome to your awesome dashboard!</p>
            </div>
          </div>
          <section className="statistics mt-4">
            <div className="row">
              <div className="col-lg-4">
                <div className="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
                  <i className="uil-envelope-shield fs-2 text-center bg-primary rounded-circle"> <FontAwesomeIcon icon={faUser} /></i>
                  <div className="ms-3">
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">{clients.length}</h3> <span className="d-block ms-2">Clients</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
                  <i className="uil-file fs-2 text-center bg-danger rounded-circle"><FontAwesomeIcon icon={faHouse} /></i>
                  <div className="ms-3">
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">{houses.length}</h3> <span className="d-block ms-2">Houses Listed</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="box d-flex rounded-2 align-items-center p-3">
                  <i className="uil-users-alt fs-2 text-center bg-success rounded-circle"><FontAwesomeIcon icon={faFile} /></i>
                  <div className="ms-3">
                    <div className="d-flex align-items-center">
                      <Button className="btn bg-transparent" onClick={handleOnExport}>Export Clients</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="clientCard ">
          {filteredClients?.map((theclient) => (
            <div className="admin d-flex rounded-2 "><ListOfClients key={theclient?.firebaseKey} client={theclient} onUpdate={onUpdateClients} /></div>
          ))}
        </div>
      </div>
    );
  } if (client[0]?.client_uid === user.uid) {
    return (
      <div>
        <SearchBar query={query} setQuery={setQuery} />
        <br />
        <div className="p-4">
          <div className="welcome">
            <div className="content rounded-3 p-3">
              <h1 className="fs-3">Welcome to Dashboard</h1>
              <p className="mb-0">Hello {user.displayName}, welcome to your awesome dashboard!</p>
            </div>
          </div>
        </div>
        <SideBar client={client[0]} />
        {filteredHouses.map((house) => (
          <Houses key={house.mlsId} house={house} client={client} />
        ))}
      </div>
    );
  } if (isLoading) {
    return (
      <Loading />
    );
  }
  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      <div>
        <div className="cotn_principal">
          <div className="cont_centrar">

            <div className="cont_login">
              <div className="cont_info_log_sign_up">
                <div className="col_md_login">
                  <div className="cont_ba_opcitiy">
                    <h2>Agent Sign Up</h2>
                    <p>Account Not Found, Please Sign Up Here As An Agnet</p>
                    <Link passHref href="/realtorForm">
                      <Button variant="success" className="signupbtnform">Agent Sign Up </Button>
                    </Link>
                  </div>
                </div>
                <div className="col_md_sign_up">
                  <div className="cont_ba_opcitiy">
                    <h2>Client Sign Up</h2>

                    <p>Account Not Found, Please Sign Up Here As A Client</p>

                    <Link passHref href="/clientForm">
                      <Button variant="secondary" className="signupbtnform">Client Sign Up </Button>
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
