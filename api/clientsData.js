import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getRealtorsClients = (rFBK) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/clients.json?orderBy="realtor_id"&equalTo="${rFBK}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getClients = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/clients.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getClientByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/clients.json?orderBy="client_uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getClientByFbk = (clientFbk) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/clients.json?orderBy="firebaseKey"&equalTo="${clientFbk}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getClientHouses = (clientFbk) => new Promise((resolve, reject) => {
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
  getClients,
  updateClient,
  deleteClient,
  getRealtorsClients,
  getClientByUid,
  getClientByFbk,
  getClientHouses,
};
