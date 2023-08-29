import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Form,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filter, postProducts } from "./CreateSlice";
import Select from "@mui/material/Select/Select";
import { MenuItem } from "@mui/material";

export interface newDataType {
  thumbnail: string;
  title: string;
  price: number;
  description: string;
}
const NavBar = () => {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch<any>();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newData, setNewData] = useState<newDataType>({
    thumbnail: "",
    title: "",
    price: 0,
    description: "",
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleCategory = (event: any) => {
    console.log(event.target.value);
    dispatch(filter(event.target.value));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(postProducts(newData));
  };

  const [category, setCategory] = useState("");
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="d-flex align-items-center justify-content-between">
          <Navbar.Brand href="#home">
            <h3>SHOPNOW</h3>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">
              <Link to={"/"}>Home</Link>
            </Nav.Link>
            <Nav.Link href="#features">
              <Link to={"/cart"}>Cart</Link>
            </Nav.Link>
            <Nav.Link href="">{`Cart Items:- ${count}`}</Nav.Link>

            <Form.Select aria-label="Default select example" style={{height:"10%",width:"30%"}} onChange={handleCategory}>
              <option value="Category">Category</option>
              <option value="laptops">Laptops</option>
              <option value="smartphones">Smart Phones</option>
            </Form.Select>

            <Nav.Link>
              <Button onClick={handleShow}>Add Item</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>ADD YOUR PRODUCT DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} method="POST">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                name="thumbnail"
                placeholder="Enter Image Link"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Title"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter Price"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter Description"
                onChange={handleChange}
              />
            </Form.Group>

            <Modal.Footer>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Submit
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
