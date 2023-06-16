/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { deleteClient } from '../api/clientsData';
import ClientSignUp from './forms/ClientSignUp';

export default function ListOfClients({ client, onUpdate }) {
  const deleteClientFromList = () => {
    if (window.confirm(`Delete ${client.client_name} from your list?`)) {
      deleteClient(client.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <section className="admins mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="box">
              <div className="admin d-flex rounded-2 p-3 ">
                <div className="img">
                  <Link passHref href={`${client?.firebaseKey}`}>
                    <Image
                      style={{
                        width: '4rem', height: '100', borderRadius: '100px',
                      }}
                      className="clientProf"
                      src={client?.client_image}
                    />
                  </Link>
                </div>
                <div className="listed ms-3">
                  <Link passHref href={`${client?.firebaseKey}`}>
                    <h3 className="fs-5 mb-1">{client?.client_name}</h3>
                  </Link>
                  <p className="phone mb-0">{client?.client_phone}</p>
                </div>
                <div className="clientModify">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="table-responsive-vertical shadow-z-1">
        <table id="table" className="fixed_headers">
          <tbody>
            <tr>
              <td>
                <figure>
                  <Link passHref href={`${client?.firebaseKey}`}>
                    <Image
                      style={{
                        width: '4rem', height: '100', borderRadius: '100px',
                      }}
                      className="clientProf"
                      src={client?.client_image}
                    />
                  </Link>
                </figure>
              </td>
              <Link passHref href={`${client?.firebaseKey}`}>
                <td data-title="Name"><p>{client?.client_name}</p></td>
              </Link>
              <td data-title="Status"><p>{client?.client_phone}</p></td>
              <td>
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
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </>

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
