import { useEffect, useState } from 'react';
import { getHouses } from '../api/houseData';
import Houses from '../components/Houses';
import SideBar from '../components/SideBar';
import { getRealtorByUid } from '../api/realtorData';
import { useAuth } from '../utils/context/authContext';
import { getClientByUid } from '../api/clientsData';
import SearchBar from '../components/SearchBar';

export default function ListOfHouses() {
  const [houses, setHouses] = useState([]);
  const [realtor, setRealtor] = useState([]);
  const [client, setClient] = useState();
  const [query, setQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    getHouses().then(setHouses);
    getRealtorByUid(user.uid).then(setRealtor);
    getClientByUid(user.uid).then((clientData) => {
      console.warn('client data', clientData);
      setClient(clientData);
    });
  }, [user]);

  const filteredHouses = houses.filter((house) => house.address.full.toLowerCase().includes(query.toLowerCase()) || house.listPrice.toLowerCase().includes(query.toLocaleLowerCase()));

  console.warn('list of homes client', client);
  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      {realtor.length > 0 ? (<SideBar profile={realtor[0]} />) : client?.length > 0 && <SideBar client={client[0]} />}
      {filteredHouses?.map((house) => <Houses house={house} realtor={realtor} client={client} />)}
    </>
  );
}