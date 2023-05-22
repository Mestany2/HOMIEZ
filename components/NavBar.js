/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signIn, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
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
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link className="signupbtn">Agent Sign Up</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link className="signupbtn">Client Sign Up</Nav.Link>
            </Link>
            {user ? (
              <Button className="signbtn" onClick={signOut}>Sign Out</Button>
            )
              : (
                <Button className="signbtn" onClick={signIn}>Sign In</Button>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
