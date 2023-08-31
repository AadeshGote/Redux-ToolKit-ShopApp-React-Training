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
// import Select from "@mui/material/Select/Select";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleClose = () => {
    setShow(false);
    toast.success(" PRODUCTD ADDES SUCCESSFULLY!", {
      position: "top-right",
      theme: "colored",
    });
  };
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

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <>
      <Navbar id="navBar" bg="warning" style={{ height: "10%" }}>
        <Container>
          <Navbar.Brand>
            <h3>SHOPNOW</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">
                <h4>Home</h4>
              </Nav.Link>
              <IconButton aria-label="cart" size="medium">
                <StyledBadge badgeContent={`${count}`} color="success">
                  <Link to={"/cart"}>
                    <ShoppingCartIcon />
                  </Link>
                </StyledBadge>
              </IconButton>
            </Nav>
            <Form className="d-flex ">
              <Form.Select
                aria-label="Default select example"
                style={{
                  height: "10%",
                  width: "50%",
                  backgroundColor: "white",
                  color: "black",
                }}
                onChange={handleCategory}
              >
                <option value="Category">All</option>
                <option value="laptops">Laptops</option>
                <option value="smartphones">Smart Phones</option>
              </Form.Select>

              <Nav.Link>
                <Button
                  onClick={handleShow}
                  variant="outline-primary"
                  style={{ marginLeft: "20px" }}
                >
                  Add Item
                </Button>
              </Nav.Link>
            </Form>
          </Navbar.Collapse>
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
