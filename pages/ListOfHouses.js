import { useEffect, useState } from 'react';
import getHouses from '../api/houseData';
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
    getClientByUid(user.uid).then(setClient);
  }, [user]);

  const filteredHouses = houses.filter((house) => house.address.full.toLowerCase().includes(query.toLowerCase()) || house.listPrice.toLowerCase().includes(query.toLocaleLowerCase()));

  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      {realtor ? (<SideBar profile={realtor[0]} />) : (<SideBar profile={client} />)}
      {filteredHouses?.map((house) => <Houses house={house} realtor={realtor} />)}
    </>
  );
}
