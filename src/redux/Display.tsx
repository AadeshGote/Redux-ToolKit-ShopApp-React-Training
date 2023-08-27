import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addToCart, products } from "./CreateSlice";
import { fetchProducts } from "./CreateSlice";
import { Card, Button } from "react-bootstrap";

const Display = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { loading, error, products } = useSelector(
    (state: any) => state.products
  );

  useEffect(() => {
    console.log(products);
    console.log(loading);
  }, [loading]);

  const handleAddCart = (products:products) => {
    console.log(products);
    
    dispatch(addToCart(products));
    dispatch(increment())
  };

  return (
    <div className="d-flex flex-wrap">
      {products.map((val: any) => {
        return (
          <>
            {!loading ? (
              <Card
                key={val.id}
                style={{ width: "18rem" }}
                className="border rounded shadow m-2 p-1"
              >
                <Card.Img
                  variant="top"
                  src={val.thumbnail}
                  style={{ maxHeight: "10rem" }}
                />
                <Card.Body>
                  <Card.Title>Name:-{val.title}</Card.Title>
                  <Card.Title>Price:-{val.price}</Card.Title>
                  <Card.Text>
                    Description:-
                    {val.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="primary"
                    onClick={() => handleAddCart(val)}
                  >
                    Add to cart
                  </Button>
                </Card.Footer>
              </Card>
            ) : (
              <span>Loading...</span>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Display;
