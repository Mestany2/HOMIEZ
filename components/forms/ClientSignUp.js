import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { addClient, updateClient } from '../../api/clientsData';
import { getRealtors } from '../../api/realtorData';

const initialState = {
  client_name: '',
  client_phone: '',
};

export default function ClientSignUp({ obj, buttonText, onUpdate }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const [realtors, setRealtors] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const handleShow = () => setShow(true);

  // const getListRealtors = () => { getRealtors().then((allrealtors) => setRealtors(allrealtors)); };
  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  useEffect(() => {
    getRealtors().then((allrealtors) => setRealtors(allrealtors));
  }, [show]);

  const handleClose = () => {
    setShow(false);
    router.push('/');
  };

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
      addClient(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateClient(patchPayload).then(() => {
          handleClose();
        // setFormInput(initialState);
        });
      });
    }
  };

  return (
    <>
      {buttonText ? (
        <Button
          variant="primary"
          className="modalForm"
          onClick={handleShow}
        >
          {buttonText}
        </Button>
      ) : handleShow()}

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
  buttonText: PropTypes.shape.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

ClientSignUp.defaultProps = {
  obj: initialState,
};
