import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getRealtorsClients = (rUid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/clients.json?orderBy="realtor_uid"&equalTo="${rUid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const addClient = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/clients.json`, {
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

const updateClient = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/clients/${payload.firebaseKey}.json`, {
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

const deleteClient = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/clients/${firebaseKey}.json`, {
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
  addClient,
  updateClient,
  deleteClient,
  getRealtorsClients,
};
