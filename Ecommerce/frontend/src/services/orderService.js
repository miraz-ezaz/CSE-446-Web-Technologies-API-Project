import axios from "axios";
import cartService from "./cartService";

const createOrder = async(userID,phone,address)=>{
    try {
        const cart = await cartService.getCart(userID);
        console.log(cart.data);
        if(cart && cart.item)
        {
        const { products,subtotal }= cart.data;
   
        const data = { userID, phone, amount: subtotal, products, address };
        console.log(data);
        const order = await axios.post("http://localhost:5000/api/order/new", data);
        if (order) {
          console.log(order.data);
          return order.data;
        }
        }
        
    
        
      } catch (err) {
        console.log(err);
        return err;
      }

};

const orderService = {
    createOrder,
  };
  
  export default orderService;