import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getRealtors = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/realtors.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const addRealtor = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/realtors.json`, {
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

const updateRealtor = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/realtors/${payload.firebaseKey}.json`, {
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

const deleteRealtor = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/realtors/${firebaseKey}.json`, {
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
  addRealtor,
  updateRealtor,
  deleteRealtor,
  getRealtors,
};
