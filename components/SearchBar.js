/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { faCalculator, faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Image, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function SearchBar({ query, setQuery }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Navbar className="navbar navbar-icon-top navbar-expand-lg">
        <Navbar.Brand>
          <Image src="./HomiezLogo.png" alt="logo" style={{ width: 175, marginTop: 5, marginLeft: 0 }} />
        </Navbar.Brand>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <FontAwesomeIcon icon={faHouse} />
              <Link className="nav-link" passHref href="/">
                Home
              </Link>

            </li>
            <li className="nav-item active">
              <FontAwesomeIcon icon={faCalculator} />
              <Link className="nav-link" passHref href="/MortgageCalculator">
                Mortgage Calculator
              </Link>

            </li>
          </ul>
          <div className="searching">
            <div className="container h-100">
              <div className="d-flex justify-content-center h-100">
                <div className="searchbar">
                  <input className="search_input" type="text" name="" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
                  <li className="search_icon"><FontAwesomeIcon className="fas fa-search" icon={faMagnifyingGlass} /></li>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="Profile-logo" role="button" tabIndex={0} onClick={() => { setOpen(!open); }}>
          <button type="button" id="drop-btn" style={{ marginRight: '175px' }} onClick={() => setOpen((menu) => !menu)}>
            <Image
              id="Logo"
              src={user.photoURL}
              className="rounded-circle"
              height="47"
              width="47"
            />
          </button>
          {open && (
            <div className="dropdown">
              <ul>
                <Link passHref href="/">
                  <li>Home</li>
                </Link>
                <Link passHref href="/MortgageCalculator">
                  <li>Mortgage Calculator </li>
                </Link>
                <li>
                  <Link passHref href="/">
                    <button type="button" id="drop-btn" onClick={signOut}> Sign Out</button>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Navbar>
      <hr className="navhr" />
    </>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

SearchBar.defaultProps = {
  query: '',
  setQuery: '',
};
