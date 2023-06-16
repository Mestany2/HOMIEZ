import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faBath, faBed } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';
import { useAuth } from '../utils/context/authContext';
import {
  addInterestedHouses, deleteInterestedHouse, getIntHouse, updateInterestedHouses,
} from '../api/interested';

export default function Houses({
  int, house, realtor, client, onUpdate,
}) {
  const { user } = useAuth();
  const [isInterested, setIsInterested] = useState(false);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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

  const deleteHouseInterestedList = () => {
    if (window.confirm('Delete this house from your list?')) {
      getIntHouse(house?.listingId).then((oneHouse) => {
        deleteInterestedHouse(oneHouse[0]?.firebaseKey);
      });
    }
    onUpdate();
  };

  return (
    <div id="bodyflex">
      <div className="card">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <Image
              className="image"
              src={house?.photos[0]}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="image"
              src={house?.photos[1]}
            />
          </Carousel.Item>
        </Carousel>
        <div className="heart" />
        <div className="contparent">
          <div className="contchild1">
            <br />
            {(realtor[0]?.realtor_uid === user.uid || int.length > 0) ? (<></>)
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
              <p className="grey"><span><FontAwesomeIcon icon={faBed} /> {house?.property.bedrooms}</span> Bedrooms <span><FontAwesomeIcon icon={faBath} /> {house?.property.bathsFull}</span> Bathrooms</p>
            </div>
          </div>
          {(int && client?.client_uid === user.uid) ? <Button className="w-100 ml " variant="danger" onClick={deleteHouseInterestedList}>Delete</Button> : '' }
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
  client: PropTypes.arrayOf(PropTypes.shape({
    firebaseKey: PropTypes.string,
    client_uid: PropTypes.string,
  })),
  int: PropTypes.arrayOf(PropTypes.shape),
  onUpdate: PropTypes.func,
};
Houses.defaultProps = {
  realtor: {},
  client: [],
  int: [],
  onUpdate: deleteInterestedHouse,
};
