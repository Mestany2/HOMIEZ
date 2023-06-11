import { getClientByFbk, getClientHouses } from './clientsData';

const getClientInterested = (clientFbk) => new Promise((resolve, reject) => {
  Promise.all([getClientByFbk(clientFbk), getClientHouses(clientFbk)])
    .then(([clientObject, clientHouseArray]) => {
      resolve({ ...clientObject, interestedHouses: clientHouseArray });
    }).catch((error) => reject(error));
});

export default getClientInterested;
