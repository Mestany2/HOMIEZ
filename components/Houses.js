import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { addInterestedHouses, updateInterestedHouses } from '../api/interested';

export default function Houses({ house, realtor, client }) {
  const { user } = useAuth();
  const [isInterested, setIsInterested] = useState(false);

  const handleSubmit = () => {
    const payload = {
      client_fbk: client[0].firebaseKey, house_id: house.listingId,
    };
    addInterestedHouses(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateInterestedHouses(patchPayload);
      setIsInterested(true);
    });
  };
  console.warn('Houses', house);
  return (
    <div id="bodyflex">
      <div className="card">
        <Image
          className="image"
          src={house?.photos[0]}
        />
        <div className="heart" />
        <div className="contparent">
          <div className="contchild1">
            <br />
            {(realtor[0]?.realtor_uid === user.uid) ? (<></>)
              : (
                <button
                  type="submit"
                  className={`Interested${isInterested ? ' interested' : ''}`}
                  onClick={handleSubmit}
                  disabled={isInterested}
                >
                  {isInterested ? 'Added' : 'Interested'}
                </button>
              )}
            <br />
            <p className="price">${house?.listPrice}</p>
            <p className="address">{house?.address.full}</p>
          </div>
          <div className="contchild2">
            <div className="cc21">
              <i className="large material-icons"> {house?.mls.status}</i>
              <p className="grey"><span>{house?.property.bedrooms}</span> Bedrooms <span>{house?.property.bathsFull}</span> Bathrooms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Houses.propTypes = {
  house: PropTypes.arrayOf({
    listPrice: PropTypes.string,
    address: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    listingId: PropTypes.string,
  }).isRequired,
  realtor: PropTypes.shape({
    realtor_uid: PropTypes.string,
  }),
  client: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
};
Houses.defaultProps = {
  realtor: '',
  client: '',
};
