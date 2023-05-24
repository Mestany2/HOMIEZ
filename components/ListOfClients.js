import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function ListOfClients({ client }) {
  return (
    <>
      <Card
        className="pf-data d-flex mb-4"
        style={{
          width: '25rem',
          display: 'flex',
          flexDirection: 'row',
          border: 'none',
        }}
      >
        <Card.Img style={{ borderRadius: '100px', width: '170px' }} src={client?.client_image} alt="Profile" />
        <Card.Body>
          <Card.Title style={{ color: 'black', fontSize: '30px' }}>{client?.client_name}</Card.Title>
          <Card.Text>{client.client_phone}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

ListOfClients.propTypes = {
  client: PropTypes.arrayOf({
    client_image: PropTypes.string,
    client_name: PropTypes.string,
  }).isRequired,
};
