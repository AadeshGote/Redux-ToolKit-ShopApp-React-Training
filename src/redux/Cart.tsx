import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrement,
  removeFromCart,
  emptyCart,
  empty,
} from "./CreateSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialCartState } from "./CreateSlice";

const Cart = () => {
  const dispatch = useDispatch<any>();
  const cartItems = useSelector((state: any) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total: number, item: { price: number; quantity: number }) =>
      total + item.price * item.quantity,
    0
  );

  const handleDelete = (id: number) => {
    dispatch(removeFromCart(id));
    dispatch(decrement());
  };
  let count = 0;

  const handleBuy = () => {
    dispatch(emptyCart());
    dispatch(empty());
    if (cartItems.length > 0) {
      toast.success(" ORDER PLACED SUCCESSFULLY!", {
        position: "top-right",
        theme: "colored",
      });
    } else {
      toast.info("Please Select the products first!!!", {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Container>
        <Table striped bordered hover variant="light" className="shadow my-2">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove Item</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item: any) => {
              return (
                <>
                  <tr>
                    <td>{++count}</td>
                    <td>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        width={"20%"}
                        height={"10%"}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}$</td>
                    <td>
                      <Button onClick={() => handleDelete(item.id)}>
                        DELETE
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
            <tr>
              <th colSpan={4}>
                <h4>TOTAL PRICE</h4>
              </th>
              <th>
                <h4>{totalPrice}$</h4>
              </th>
              <th></th>
            </tr>
          </tbody>
        </Table>
        <div>
          <Button
            size="lg"
            variant="warning"
            className="border shadow "
            onClick={handleBuy}
          >
            Buy Now
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Cart;
