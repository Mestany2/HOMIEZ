import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Houses from '../components/Houses';
import SideBar from '../components/SideBar';
import { getClientByFbk, getClientHouses } from '../api/clientsData';
import SearchBar from '../components/SearchBar';
import { getHousesByHouseId } from '../api/houseData';

const initialValues = {
  listOfHomes: [],
};

export default function InterestedPage() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  // const [realtor, setRealtors] = useState([]);
  const [houses, setHouses] = useState(initialValues);
  const [intHouses, setIntHouses] = useState([]);
  const [client, setClient] = useState([{}]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getClientByFbk(firebaseKey).then(setClient);
    getClientHouses(firebaseKey).then(setIntHouses);
  }, [firebaseKey]);

  useEffect(() => {
    if (intHouses.length === 0) return;

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
  }, [intHouses]);

  console.warn('list of houses', houses);

  const filteredHouses = houses.listOfHomes.filter((house) => house?.address?.full.toLowerCase().includes(query.toLowerCase()) || house?.listPrice?.toLowerCase().includes(query.toLocaleLowerCase()));

  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      <SideBar client={client[0]} />
      {filteredHouses.map((house) => <Houses house={house} client={client[0]} />)}
    </>
  );
}
