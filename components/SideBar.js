import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Image } from 'react-bootstrap';

const SideBar = ({ profile }) => (
  <>
    <div className="side-bar">
      <br />
      <Image style={{ width: '5rem', height: '100', borderRadius: '100px' }} src={profile.realtor_image} />
      <h5>{profile.realtor_name}</h5>
      <br />
      <Link passHref href="/" className="links"> View Homes </Link> <br />
      <br />
      <Link passHref href="/"> My Clients </Link> <br />
      <hr className="seperator" />
    </div>
  </>
);
export default SideBar;

SideBar.propTypes = {
  profile: PropTypes.shape({
    realtor_image: PropTypes.string,
    realtor_name: PropTypes.string,
  }).isRequired,
};
