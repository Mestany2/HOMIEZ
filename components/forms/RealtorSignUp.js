import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { addRealtor, getRealtorByUid, updateRealtor } from '../../api/realtorData';

const initialState = {
  realtor_name: '',
  realtor_phone: '',
  company_name: '',
};

export default function RealtorSignUp({ obj }) {
  const [show, setShow] = useState(true);
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  //   const handleShow = () => setShow(true);

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
      updateRealtor(formInput).then(() => {
        // onUpdate();
        handleClose();
      });
    } else {
      const payload = {
        ...formInput, realtor_uid: user.uid, realtor_image: user.photoURL,
      };
      getRealtorByUid(user.uid).then((realtorExist) => {
        if (realtorExist.length > 0) {
          window.confirm('Hello Realtor! You Already Have An Account, You Will Be Logged In! ');
          handleClose();
        } else {
          addRealtor(payload).then(({ name }) => {
            const patchPayload = { firebaseKey: name };
            updateRealtor(patchPayload).then(() => {
              handleClose();
            });
          });
        }
      });
    }
  };

  return (
    <>
      {/* <Button
        variant="primary"
        className="modalForm"
        onClick={handleShow}
        // style={{
        //   backgroundColor: bc,
        //   color: colorSet,
        //   border: borderSet,
        //   fontSize: fontSet,
        // }}
      >
        Test
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{obj.firebaseKey ? 'Update' : 'Create'} a Realtor Account </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Video Title  */}
            <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3" style={{ color: 'black' }}>
              <Form.Control
                type="text"
                placeholder="Your Name"
                name="realtor_name"
                value={formInput.realtor_name}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* Video Description  */}
            <FloatingLabel controlId="floatingInput3" label="Phone Number" className="mb-3" style={{ color: 'black' }}>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="realtor_phone"
                value={formInput.realtor_phone}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput1" label="Company" className="mb-3" style={{ color: 'black' }}>
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="company_name"
                value={formInput.company_name}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <Button type="submit">{obj.firebaseKey ? 'Update' : 'Submit'}</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
}

RealtorSignUp.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    user_photo: PropTypes.string,
    userName: PropTypes.string,
  }),
};

RealtorSignUp.defaultProps = {
  obj: initialState,
};
