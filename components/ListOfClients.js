import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteClient } from '../api/clientsData';
import ClientSignUp from './forms/ClientSignUp';

export default function ListOfClients({ client, onUpdate }) {
  const deleteClientFromList = () => {
    if (window.confirm(`Delete ${client.client_name} from your playlist?`)) {
      deleteClient(client.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="d-flex flex-row mb-2" style={{ width: '70rem', height: '6rem', border: 'none' }}>
      <Card.Img style={{ width: '10rem', height: '150' }} src={client.client_image} />
      <Card.Body className="ms-2 d-flex flex-column">
        <Card.Title style={{ marginBottom: '10px', fontSize: '25px' }}>{client.client_name}</Card.Title>
        <Card.Text style={{ fontSize: '15px' }}>{client.client_phone}</Card.Text>
      </Card.Body>
      <div style={{ marginLeft: '20px' }} className="d-flex flex-column">
        <ClientSignUp
          buttonText={<FontAwesomeIcon icon={faEdit} />}
          obj={client}
          onUpdate={onUpdate}
        />
        <Button
          variant="danger"
          onClick={deleteClientFromList}
          style={{
            height: '40px',
            width: '40px',
            backgroundColor: 'white',
            color: 'red',
            border: 'none',
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </Card>
  );
}

ListOfClients.propTypes = {
  client: PropTypes.shape({
    client_image: PropTypes.string,
    client_name: PropTypes.string,
    client_phone: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
