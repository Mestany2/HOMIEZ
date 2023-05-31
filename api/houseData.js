import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getHouses = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/homes.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getHousesByHouseId = (hid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/homes.json?orderBy="listingId"&equalTo="${hid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export { getHouses, getHousesByHouseId };
