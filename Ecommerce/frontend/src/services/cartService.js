import productService from "./productServices";
import axios from "axios";

const addToCart = async (userID, productID) => {
  const product = await productService.getProductByID(productID);
  console.log(product);
  try {
    const name= product.name;
    const price = Number.parseInt(product.sprice);
    const data = { userID, productID, quantity: 1, name, price };
    console.log(data);
    const cart = await axios.post("http://localhost:5000/api/cart/add", data);
    if (cart) {
      console.log(cart.data);
      return cart.data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
const cartlength = async(userID) =>{
    try{
        const result = await axios.get("http://localhost:5000/api/cart/length/"+userID);
        return result.data
    }catch(err)
    {
        return err;
    }
    
};

const getCart = async(userID) =>{
    try{
        const result = await axios.get("http://localhost:5000/api/cart/"+userID).then();
        return result.data;
    }catch(err){
        return err;
    }
    
    
};

const cartService = {
  addToCart,
  cartlength,
  getCart
};

export default cartService;
