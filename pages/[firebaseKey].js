import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Houses from '../components/Houses';
import SideBar from '../components/SideBar';
import { getClientByFbk, getClientHouses } from '../api/clientsData';
import SearchBar from '../components/SearchBar';
import { getHousesByHouseId } from '../api/houseData';
import { useAuth } from '../utils/context/authContext';
import { getRealtorByUid } from '../api/realtorData';

const initialValues = {
  listOfHomes: [],
};

export default function InterestedPage() {
  const router = useRouter();
  // const { firebaseKey } = router.query;
  const [realtor, setRealtor] = useState([]);
  const [houses, setHouses] = useState(initialValues);
  const [intHouses, setIntHouses] = useState([]);
  const [client, setClient] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useAuth();

  const getAllIntHouses = () => {
    const { firebaseKey } = router.query;
    getClientByFbk(firebaseKey).then(setClient);
    getClientHouses(firebaseKey).then(setIntHouses);
    getRealtorByUid(user.uid).then(setRealtor);
    if (intHouses.length === 0) return;
    console.warn('the int', intHouses);
    const fetchHouses = async () => {
      const fetchedHouses = await Promise.all(
        intHouses.map(async (item) => {
          const theseHouses = await getHousesByHouseId(item.house_id);
          return theseHouses;
        }),
      );

      const updatedHouses = fetchedHouses.flat();
      setHouses({ ...houses, listOfHomes: updatedHouses });
    };

    fetchHouses();
  };

  useEffect(
    getAllIntHouses,
    [intHouses.length],
  );
  const filteredHouses = houses.listOfHomes.filter((house) => house?.address?.full.toLowerCase().includes(query.toLowerCase()) || house?.listPrice?.toLowerCase().includes(query.toLocaleLowerCase()));

  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      {client[0]?.client_uid === user.uid ? <SideBar client={client[0]} /> : <SideBar profile={realtor[0]} />}
      <div className="p-4">
        <div className="welcome">
          <div className="content rounded-3 p-3">
            <h1 className="fs-3">Favorite Homes</h1>
            <p className="mb-0">Here is a list of selected homes!</p>
          </div>
        </div>
      </div>
      {filteredHouses.map((house) => <Houses int={intHouses} house={house} realtor={realtor} client={client[0]} onUpdate={getAllIntHouses} />)}
    </>
  );
}
