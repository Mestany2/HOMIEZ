import React from 'react';
import { Button } from 'react-bootstrap';
import NavBar from './NavBar';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <NavBar />
      <div id="hero">
        <div className="fade" />
        <div className="hero-text">
          <h1>Where agents and homebuyers search for a home together</h1>
          <br />
          <Button className="signbtn" onClick={signIn}>Sign In</Button>
        </div>
        <div className="banner-right" />
      </div>
    </>
  );
}

export default Signin;
