import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addFood, getAllFoods } from "../redux/actions";
import { SHOW_WARNING } from "../redux/constants";

const AddItemsForm = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [calorie, setCalorie] = useState(0);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setError((prev) => {
        return { ...prev, name: "name is required" };
      });
    }
    if (price === "") {
      setError((prev) => {
        return { ...prev, price: "price is required" };
      });
    }
    if (calorie === "") {
      setError((prev) => {
        return { ...prev, calorie: "calorie is required" };
      });
    }
    if (typeof price !== "number") {
      setError((prev) => {
        return { ...prev, price: "price must be in number" };
      });
    }
    if (typeof calorie !== "number") {
      setError((prev) => {
        return { ...prev, calorie: "calorie be in number" };
      });
    }
    if (name === "" || price === "" || calorie === "") {
      return;
    }
    dispatch(addFood(name, calorie, price));
    dispatch(getAllFoods());
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
        Add Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="mx-auto">
            <Form.Group className="mb-3">
              <Form.Label>Enter Food Name</Form.Label>
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
              <Form.Label>Enter Calorie amount</Form.Label>
              <Form.Control
                name="calorie"
                value={calorie}
                onChange={(e) => {
                  setCalorie(e.target.value);
                  setError({ ...error, calorie: "" });
                }}
                className="me-auto"
                placeholder="Add calorie here..."
              />
              {error && error.calorie && (
                <Form.Text className="text-danger">{error.calorie}</Form.Text>
              )}
            </Form.Group>
            <Form.Label>Enter Food Price</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setError({ ...error, price: "" });
                }}
                aria-label="Dollar price (with dot and two decimal places)"
              />
            </InputGroup>
            {error && error.price && (
              <Form.Text className="text-danger">{error.price}</Form.Text>
            )}
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

export default AddItemsForm;
