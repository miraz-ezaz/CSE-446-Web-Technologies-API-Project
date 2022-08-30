import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";

import cartService from "../services/cartService";
import orderService from "../services/orderService";
import axios from "axios";
import {
  Table,
  Spinner,
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Button,
  Offcanvas,
} from "react-bootstrap";

function CheckoutScreen() {
  const [cart, setCart] = useState(null);
  const user = AuthService.getCurrentUser();
  const [loading, setLoading] = useState(true);
  const [message, setmessage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getCart = async (userID) => {
      try {
        const result = await axios.get(
          "http://localhost:5000/api/cart/" + userID
        );
        if (result.data.item) {
          setLoading(false);
          setCart(result.data.data);
          console.log(result.data);
        } else {
          setmessage(result.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCart(user._id);

    
  }, []);
  const makeOrder = async()=>{
    setLoading(true);
    const address = {"Area":"Dhaka"}
    const order = await orderService.createOrder(user._id,user.phone,address);
    if(order.success)
    {
      setLoading(false);
      navigate(`/payment/${order.orderID}`)
    }

  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (cart) {
    return (
      <Container fluid>
        <Row calssName="mt-3">
          <Col>
            <h2>Items in Your Cart</h2>
          </Col>
          
          <Col>
            <h2>Order Details</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product, index) => (
                  <tr>
                    <td>{(index += 1)}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>{product.total}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3}></td>
                  <td align="right">Total:</td>
                  <td>{cart.subtotal}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        
          <Col>
          <Button variant="success" onClick={makeOrder}>Proceed To Payment </Button>
          </Col>
        </Row>
        <Row>
        
        </Row>
      </Container>
    );
  }
  if (message) {
    return (
      <div>
        <h1>{message.message}</h1>
      </div>
    );
  }
  return null;
}
export default CheckoutScreen;
