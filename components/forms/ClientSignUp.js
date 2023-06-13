import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { addClient, getClientByUid, updateClient } from '../../api/clientsData';
import { getRealtors } from '../../api/realtorData';

const initialState = {
  client_name: '',
  client_phone: '',
};

export default function ClientSignUp({
  obj, onUpdate, buttonText,
}) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const [realtors, setRealtors] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  // const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    router.push('/');
  };

  useEffect(() => {
    getRealtors().then(setRealtors);
    if (obj.firebaseKey) setFormInput(obj);
    if (!obj.firebaseKey) setShow(true);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateClient(formInput).then(() => {
        onUpdate();
        handleClose();
      });
    } else {
      const payload = {
        ...formInput, client_uid: user.uid, client_image: user.photoURL,
      };
      getClientByUid(user.uid).then((clientExist) => {
        if (clientExist.length > 0) {
          window.confirm('You Already Have An Account, You Will Be Logged In!');
          handleClose();
        } else {
          addClient(payload).then(({ name }) => {
            const patchPayload = { firebaseKey: name };
            updateClient(patchPayload).then(() => {
              handleClose();
            });
          });
        }
      });
    }
  };

  return (
    <>
      {obj.firebaseKey ? (
        <Button
          className="bg-transparent border-0 fields"
          onClick={() => setShow(true)}
        >
          {buttonText}
        </Button>
      ) : ''}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{obj.firebaseKey ? 'Update' : 'Create'} an Account </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Video Title  */}
            <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3" style={{ color: 'black' }}>
              <Form.Control
                type="text"
                placeholder="Your Name"
                name="client_name"
                value={formInput.client_name}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* Video Description  */}
            <FloatingLabel controlId="floatingInput3" label="Phone Number" className="mb-3" style={{ color: 'black' }}>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="client_phone"
                value={formInput.client_phone}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingSelect" label="Realtor">
              <Form.Select
                aria-label="Realtor"
                name="realtor_id"
                onChange={handleChange}
                className="mb-3"
                value={formInput.realtor_id} // FIXME: modify code to remove error
                required
              >
                <option value="">Select Your Realtor</option>
                {
            realtors.map((realtor) => (
              <option
                key={realtor.firebaseKey}
                value={realtor.firebaseKey}
              >
                {realtor.realtor_name}
              </option>
            ))
          }
              </Form.Select>
            </FloatingLabel>

            <Button type="submit">{obj.firebaseKey ? 'Update' : 'Submit'}</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
}

ClientSignUp.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    user_photo: PropTypes.string,
    userName: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
  buttonText: PropTypes.func.isRequired,
};

ClientSignUp.defaultProps = {
  obj: initialState,
};
