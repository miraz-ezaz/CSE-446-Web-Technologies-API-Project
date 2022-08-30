import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useNavigate,
    useParams
  } from "react-router-dom";
  
  import Navbar from "react-bootstrap/Navbar";
  import { LinkContainer } from "react-router-bootstrap";
  
  import Nav from "react-bootstrap/Nav";
  import { useEffect, useState } from "react";
  import AuthService from "../services/AuthService";
  
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
    Offcanvas,
  } from "react-bootstrap";
  function PaymentScreen() {
    const params = useParams();
    const { orderID } = params;

    return(
        <h1>{orderID}</h1>
    );


  };
  export default PaymentScreen;