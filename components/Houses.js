import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function Houses({ house }) {
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
            <button type="submit" className="Interested"> Interested </button>
            <br />
            <p className="price">${house.listPrice}</p>
            <p className="address">{house.address.full}</p>
          </div>
          <div className="contchild2">
            <div className="cc21">
              <i className="large material-icons">hotel</i>
              <p className="grey"><span>3</span> Bedrooms</p>
            </div>
            <div className="cc22">
              <i className="large material-icons">hot_tub</i>
              <p className="grey"><span>2</span> Bathrooms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Houses.propTypes = {
  house: PropTypes.shape({
    listPrice: PropTypes.string,
    address: PropTypes.string,
    photos: PropTypes.string,
  }).isRequired,
};
