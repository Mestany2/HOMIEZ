/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Image } from 'react-bootstrap';
import { deleteClient } from '../api/clientsData';
import ClientSignUp from './forms/ClientSignUp';

export default function ListOfClients({ client, onUpdate }) {
  const deleteClientFromList = () => {
    if (window.confirm(`Delete ${client.client_name} from your playlist?`)) {
      deleteClient(client.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="table-responsive-vertical shadow-z-1">
      <table id="table" className="fixed_headers">
        <tbody>
          <tr>

            {/* <Link passHref href="/"> */}
            <Image
              style={{
                width: '4rem', height: '100', borderRadius: '100px',
              }}
              className="clientProf"
              src={client?.client_image}
            />
            {/* </Link> */}
            <td data-title="Name">{client.client_name}</td>
            {/* <td data-title="Link">
              <a href="https://github.com/zavoloklom/material-design-color-palette" target="_blank" rel="noreferrer">GitHub</a>
            </td> */}
            <td data-title="Status">{client.client_phone}</td>
            <ClientSignUp
              buttonText={<FontAwesomeIcon icon={faEdit} />}
              obj={client}
              onUpdate={onUpdate}
            />
            <Button
              className="fields"
              onClick={deleteClientFromList}
              style={{
                height: '40px',
                width: '40px',
                backgroundColor: 'transparent',
                color: 'red',
                border: 'none',
              }}

            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </tr>
        </tbody>
      </table>
    </div>

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
