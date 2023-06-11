import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Image } from 'react-bootstrap';

const SideBar = ({ profile, client }) => (
  <>
    <div className="side-bar">
      <br />
      {profile ? (<><Image style={{ width: '5rem', height: '100', borderRadius: '100px' }} src={profile?.realtor_image} /><h5>{profile?.realtor_name }</h5><br /><Link passHref href="/ListOfHouses" className="links"> View Homes </Link><br /><br /><Link passHref href="/"> My Clients </Link><br /></>)
        : (<><Image style={{ width: '5rem', height: '100', borderRadius: '100px' }} src={client?.client_image} /><h5>{client?.client_name}</h5><br /><Link passHref href="/" className="links"> View Homes </Link><br /><br /><Link passHref href={`${client?.firebaseKey}`}> My List of Homes</Link><br /></>)}

    </div>
  </>
);
export default SideBar;

SideBar.propTypes = {
  profile: PropTypes.shape({
    realtor_image: PropTypes.string,
    realtor_name: PropTypes.string,
  }),
  client: PropTypes.shape({
    client_image: PropTypes.string,
    client_name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
SideBar.defaultProps = {
  client: '',
  profile: '',
};
