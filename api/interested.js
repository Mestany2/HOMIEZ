import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getInterestedHouses = (clientFbk) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/interested.json?orderBy="client_fbk"&equalTo="${clientFbk}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const addInterestedHouses = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/interested.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateInterestedHouses = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/interested/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteInterestedHouse = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/interested/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
export {
  getInterestedHouses, addInterestedHouses, updateInterestedHouses, deleteInterestedHouse,
};
