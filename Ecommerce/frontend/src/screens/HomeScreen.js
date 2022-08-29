import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import data from '../data';
import axios from "axios";
import AuthService from '../services/AuthService';
import cartService from '../services/cartService';
import { Container,Row,Col,Carousel,Card,Button, Offcanvas,Alert } from 'react-bootstrap';
function HomeScreen() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [products, setProducts] = useState([]);
  const user = AuthService.getCurrentUser();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  //console.log(user);

  useEffect(() => {
    
    const fetchData = async () => {
      const result = await axios.get("/api/product");
      setProducts(result.data);
    };
    
    //console.log(user);
    if (user) {
      setCurrentUser(user);
      // console.log(currentUser);
      if(user.bankacc === "notset")
      {
        navigate("/addbank");
      }
      else
      {
        navigate('/');
      }
      
    } else {
      navigate("/register");
    }
    fetchData();
  }, []);
  return (
    <>
    <Container fluid>
      <Row md>
        <Col>
        <Carousel variant="dark">
        {products.map((product) => (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={product.image}
          alt={product.name}
        />
        <Carousel.Caption>
          <h3>{product.name}</h3>
          <p>{product.cat}</p>
        </Carousel.Caption>
      </Carousel.Item>))}
      </Carousel>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        
        {products.map((product)=>(
          <Col sm>
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Link to={`/product/${product.productID}`}><Card.Title>{product.name}</Card.Title></Link>
            <Card.Text>
            <strong>&#2547;{product.sprice}</strong>
            </Card.Text>
            <Button variant="primary" onClick={()=>{cartService.addToCart(user._id,product.productID);alert("Item Added To Cart!");}}>Add to Cart</Button>
            &nbsp;
            <Button variant="primary" onClick={handleShow}>View</Button>
          </Card.Body>
        </Card>
        </Col>
        ))}
      </Row>
    </Container>
  
    <Offcanvas show={show} onHide={handleClose} placement="bottom">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Offcanvas</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      Some text as placeholder. In real life you can have the elements you
      have chosen. Like, text, images, lists, etc.
    </Offcanvas.Body>
  </Offcanvas>
  </>

  );
}
export default HomeScreen;


