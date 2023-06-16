import { useState, useEffect } from 'react';
import Calculator from '../components/Calculator';
import SearchBar from '../components/SearchBar';
import SideBar from '../components/SideBar';
import { useAuth } from '../utils/context/authContext';
import { getRealtorByUid } from '../api/realtorData';
import { getClientByUid } from '../api/clientsData';

export default function MortgageCalculator() {
  const [realtor, setRealtor] = useState([]);
  const [client, setClient] = useState();
  const { user } = useAuth();

  useEffect(() => {
    getRealtorByUid(user.uid).then(setRealtor);
    getClientByUid(user.uid).then((clientData) => {
      setClient(clientData);
    });
  }, [user]);

  return (
    <>
      <SearchBar />
      {realtor.length > 0 ? (<SideBar profile={realtor[0]} />) : client?.length > 0 && <SideBar client={client[0]} />}
      <Calculator />
    </>
  );
}
