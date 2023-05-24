import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

const SideBar = () => {
  const router = useRouter();
  return (
    <>
      <div className="side-bar">
        <br />
        <Button
          className="bt bg-transparent border-0"
          variant="light"
          onClick={() => {
            router.push('/');
          }}
        >Home
        </Button> <br />
        <br />
        <Link passHref href="/" className="links"> Shorts </Link> <br />
        <br />
        <Link passHref href="/profile"> My Videos </Link> <br />
        <hr className="seperator" />
        <Link passHref href="/" className="links"> Library</Link> <br />
        <br />
        <Link passHref href="/" className="links"> History </Link> <br />
        <br />
        <Link passHref href="/profile" className="links"> My Playlist </Link> <br />
        <br />
        <Link passHref href="/" className="links"> Watch Later </Link> <br />
        <br />
      </div>
    </>
  );
};
export default SideBar;
