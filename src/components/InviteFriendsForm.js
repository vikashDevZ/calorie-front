import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { inviteFriends } from "../redux/actions";

const InviteFriends = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === "") {
      setError((prev) => {
        return { ...prev, name: "name is required" };
      });
    }
    if (email === "") {
      setError((prev) => {
        return { ...prev, email: "email is required" };
      });
    }
    if (name == "" || email == "") {
      return;
    }
    dispatch(inviteFriends(name, email));
    handleClose();
  };

  return (
    <Container
      onKeyDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
    >
      <Button variant="primary" onClick={handleShow}>
        Invite Friends
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="mx-auto">
            <Form.Group className="mb-3">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error?.name?.length) {
                    console.log("error state triggered");
                    setError({ ...error, name: "" });
                  }
                }}
                className="me-auto"
                placeholder="Add food item here..."
              />
              {error && error.name && (
                <Form.Text className="text-danger">{error.name}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter Email</Form.Label>
              <Form.Control
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error?.email?.length) {
                    console.log("error state triggered");
                    setError({ ...error, email: "" });
                  }
                }}
                className="me-auto"
                placeholder="Add food item here..."
              />
              {error && error.email && (
                <Form.Text className="text-danger">{error.email}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
              <Button onClick={handleSubmit} variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default InviteFriends;
