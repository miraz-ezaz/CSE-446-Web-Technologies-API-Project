import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import SigninScreen from "./screens/SigninScreen";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import AuthService from "./services/AuthService";
import AddBankScreen from "./screens/AddBankScreen";
import cartService from "./services/cartService";
import axios from "axios";
import { Container,Row,Col,Carousel,Card,Button, Offcanvas } from 'react-bootstrap';
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";


function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const user = AuthService.getCurrentUser();
  const [show, setShow] = useState(false);
  const [cart,setCart] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    
  }
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      
      setCurrentUser(user);
      console.log(currentUser);
      
    } 
    
  }, []);

  const logOut = () => {
    AuthService.logout();
    window.location("/")
  };
  const getCart = async(userID) =>{
    try{
        const result = await axios.get("http://localhost:5000/api/cart/"+userID);
        setCart(result.data)
        console.log(result.data);
    }catch(err){
        console.log(err);
    }
  }
  
  
  
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        {currentUser ?(<header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>eCommerce</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
              <Link className="nav-link" to="/">
                  {currentUser.name}
                </Link>
                <Link className="nav-link" to="/" onClick={logOut}>
                  Logout
                </Link>
                <Link className="nav-link" to="#" onClick={handleShow}>
                  Cart
                </Link>
                onClick={handleShow}
              </Nav>
            </Container>
          </Navbar>
        </header>):(
          <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>eCommerce</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        )}
        <main>
          <Container>
            <Routes>
              <Route path="/product/:productID" element={<ProductScreen />} />
              <Route path="/login" element={<SigninScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/addbank" element={<AddBankScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/checkout" element={<CheckoutScreen />} />
              <Route path="/" element={<HomeScreen />} />
              {/* <Route path="/" element={currentUser ? <HomeScreen />:<Navigate to="/register"/> } /> */}
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights Reserved</div>
        </footer>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="start" className="w-auto">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Cart</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body fluid>
    <Container fluid>
      <CartScreen/>
      </Container>
    </Offcanvas.Body>
  </Offcanvas>
    </BrowserRouter>
    
  );
}

export default App;
