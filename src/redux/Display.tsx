import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addToCart, products } from "./CreateSlice";
import { fetchProducts } from "./CreateSlice";
import { Card, Button, Container } from "react-bootstrap";
import { Box, Skeleton, Stack } from "@mui/material";

const Display = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { loading, error, products, cat } = useSelector(
    (state: any) => state.products
  );

  useEffect(() => {
    console.log(products);
    console.log(loading);
  }, [loading]);

  const handleAddCart = (products: products) => {
    console.log(products);

    dispatch(addToCart(products));
    dispatch(increment());
  };

  return (
    <Container fluid className="d-flex flex-wrap  ms-4 pt-5">
      {loading || products.length === 0
        ? Array.from({ length: 30 }).map((val, index) => (
            <Card
              key={index}
              style={{ width: "18rem", height: "25rem" }}
              className="border rounded shadow m-2 p-1"
            >
              <Card.Header>
                <Skeleton
                  sx={{ height: 160 }}
                  animation="wave"
                  variant="rectangular"
                />
              </Card.Header>
              <Card.Body>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Card.Body>
              <Card.Footer style={{ paddingLeft: "27%" }}>
                <Skeleton variant="rounded" width={120} height={40} />
              </Card.Footer>
            </Card>
          ))
        : cat.map((val: any) => (
            <Card
              key={val.id}
              style={{ width: "18rem" }}
              className="border rounded shadow m-2 p-1"
            >
              <Card.Header>
                <Card.Img
                  variant="top"
                  src={val.thumbnail}
                  style={{ height: "10rem" }}
                />
              </Card.Header>
              <Card.Body>
                <Card.Title>Name: {val.title}</Card.Title>
                <Card.Title>Price: {val.price}</Card.Title>
                <Card.Text>Description: {val.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" onClick={() => handleAddCart(val)}>
                  Add to cart
                </Button>
              </Card.Footer>
            </Card>
          ))}
    </Container>
  );
};

export default Display;
