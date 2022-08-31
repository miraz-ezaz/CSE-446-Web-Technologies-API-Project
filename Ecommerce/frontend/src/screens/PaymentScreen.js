import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import orderService from "../services/orderService";
import paymentService from "../services/paymentService";

import cartService from "../services/cartService";
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
  Modal,
  Form,
  ProgressBar,
} from "react-bootstrap";
function PaymentScreen() {
  const params = useParams();
  const { orderID } = params;
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [supplied, setsupplied] = useState(false);
  const [order, setorder] = useState(null);
  const [payment, setpayment] = useState(false);
  const [supplyOrder, setsupplyOrder] = useState(false);
  const [message, setmessage] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [pin, setpin] = useState({ pin: "" });
  const handleChange = ({ currentTarget: input }) => {
    setpin({ ...pin, [input.name]: input.value });
  };

  const handleModalOK = () => {
    setModalShow(false);
    navigate("/");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pin);
    try {
      setLoading(true);
      const userPay = await paymentService.makePayment(
        user.bankacc,
        "10001",
        pin.pin,
        order.amount
      );
      if (userPay) {
        if (userPay.success) {
          setorder(null);
          setLoading(false);
          setpayment(true);
          const supplierPay = await paymentService.makePayment(
            "10001",
            "10002",
            "1234",
            order.amount
          );
          if (supplierPay) {
            if (supplierPay.success) {
              const supplierOrder = await orderService.supplierOrder(
                order,
                user.name,
                supplierPay.transactionID
              );
              if (supplierOrder) {
                setsupplyOrder(true);
                setpayment(false);
                if (supplierOrder.supplied) {
                  setsupplyOrder(false);
                  setsupplied(true);
                  setModalShow(true);
                }
              }
            }
          }
        }
        else{
          alert(userPay.message);
          setLoading(false);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    document.title = "Payment";
    const getOrder = async () => {
      try {
        const corder = await orderService.getOrder(orderID);
        if (corder) {
          setLoading(false);
          setorder(corder);
          console.log(corder);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getOrder();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 mb-5 ">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </Container>
    );
  }
  if (order) {
    return (
      <Container className="mt-5" size="lg">
        <ProgressBar
        style={{height: 30, backgroundColor: "rgba(255, 0, 0, 0.1)"}}
          fluid
          variant="success"
          animated
          className="mt-5 mb-5"
          now={25}
          label={"Order Confirmed"}
        />
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Account No.
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={user.bankacc} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Amount
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={order.amount} />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              PIN
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="password"
                placeholder="PIN"
                name="pin"
                onChange={handleChange}
              />
              <Button className="mt-3" type="submit">
                Proceed
              </Button>
            </Col>
          </Form.Group>
          <Col sm="10"></Col>
        </Form>
      </Container>
    );
  }
  if (payment) {
    return (
      <Container className="mt-5" size="lg">
        <ProgressBar size="lg" style={{height: 30, backgroundColor: "rgba(255, 0, 0, 0.1)"}}>
          <ProgressBar
          style={{height: 30, backgroundColor: "rgba(255, 0, 0, 0.1)"}}
            animated
            variant="success"
            now={25}
            key={1}
            label={"Order Confirmed"}
          />
          <ProgressBar
          style={{height: 30, backgroundColor: "rgba(255, 0, 0, 0.1)"}}
            animated
            variant="success"
            now={25}
            key={2}
            label={"Payment Completed"}
          />
        </ProgressBar>
      </Container>
    );
  }
  if (supplyOrder) {
    return (
      <Container className="mt-5">
        <ProgressBar style={{height: 30, backgroundColor: "rgba(255, 0, 0, 0.1)"}}>
          <ProgressBar
            animated
            variant="success"
            now={25}
            key={1}
            label={"Order Confirmed"}
          />
          <ProgressBar
            animated
            variant="success"
            now={25}
            key={2}
            label={"Payment Completed"}
          />
          <ProgressBar
            animated
            variant="success"
            now={25}
            key={3}
            label={"Order Submitted to Supplier"}
          />
        </ProgressBar>
      </Container>
    );
  }
  if (supplied) {
    return (
      <>
      <Container className="mt-5" >
        <ProgressBar style={{height: 30, backgroundColor: "rgba(255, 0, 0, 0.1)"}}>
          <ProgressBar
            animated
            variant="success"
            now={25}
            key={1}
            label={"Order Confirmed"}
          />
          <ProgressBar
            animated
            variant="success"
            now={25}
            key={2}
            label={"Payment Completed"}
          />
          <ProgressBar animated variant="success" now={25} key={3} label={"Order Submitted to Supplier"} />
          <ProgressBar
            animated
            variant="success"
            now={25}
            key={4}
            label={"Order Supplier"}
          />
        </ProgressBar>
      </Container>
      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalShow}
      backdrop="static"
      keyboard={false}
      onHide={() => setModalShow(false)}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Supplied
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Dear Customer</h4>
        <p>
          Your Order is Successfully Supplid By The supplier.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleModalOK}>Ok</Button>
      </Modal.Footer>
    </Modal>
    </>
    );
  }

  return null;
}
export default PaymentScreen;
