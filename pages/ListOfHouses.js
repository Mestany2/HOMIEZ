import { useEffect, useState } from 'react';
import getHouses from '../api/houseData';
import Houses from '../components/Houses';
import SideBar from '../components/SideBar';
import { getRealtorByUid } from '../api/realtorData';
import { useAuth } from '../utils/context/authContext';
import { getClientByUid } from '../api/clientsData';

export default function ListOfHouses() {
  const [houses, setHouses] = useState([]);
  const [realtor, setRealtor] = useState([]);
  const [client, setClient] = useState();
  const { user } = useAuth();

  useEffect(() => {
    getHouses().then(setHouses);
    getRealtorByUid(user.uid).then(setRealtor);
    getClientByUid(user.uid).then(setClient);
  }, [user]);

  console.warn('my houses', realtor);

  return (
    <>
      {realtor ? (<SideBar profile={realtor[0]} />) : (<SideBar profile={client} />)}
      {houses?.map((house) => <Houses house={house} />)}
    </>
  );
}
