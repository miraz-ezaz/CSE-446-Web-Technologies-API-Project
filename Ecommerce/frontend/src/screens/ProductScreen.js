import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import CartScreen from "../screens/CartScreen";
function ProductScreen() {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const { productID } = params;
  useEffect(() => {
    
    const fetchData = async () => {
      const result = await axios.get("/api/product/"+productID);
      setProduct(result.data);
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <h1>{product.cat}</h1>
      <h1>{product.sprice}</h1>
      <h1>{product.description}</h1>
    </div>
  );
}
export default ProductScreen;