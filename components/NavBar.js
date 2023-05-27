/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signIn, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import useFirebaseProfile from '../utils/hook/useFirebaseProfile';

export default function NavBar() {
  const { user } = useAuth();
  const profiles = useFirebaseProfile();
  console.warn('here it is', profiles);

  return (
    <Navbar collapseOnSelect>
      <Link passHref href="/">
        <Navbar.Brand>
          <Image src="./HomiezLogo.png" alt="logo" style={{ width: 175, marginTop: 5, marginLeft: 0 }} />
        </Navbar.Brand>
      </Link>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {user ? (
            <Button id="signoutbtn" onClick={signOut}>Sign Out</Button>
          ) : (
            <Nav className="me-auto">
              <Link passHref href="/realtorForm">
                <Nav.Link className="signupbtn" onClick={signIn}>Agent Sign Up</Nav.Link>
              </Link>
              <Link passHref href="/clientForm">
                <Nav.Link className="signupbtn" onClick={signIn}>Client Sign Up</Nav.Link>
              </Link>
              <Button className="signbtn" onClick={signIn}>Sign In</Button>
            </Nav>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
