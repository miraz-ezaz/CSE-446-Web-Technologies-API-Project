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

const getOrder = async(orderID) =>{
  try{
      const result = await axios.get("http://localhost:5000/api/order/"+orderID);
      return result.data;
  }catch(err){
      return err;
  }
  
  
};
const supplierOrder = async(order,name,transactionID)=>{
  try {
      
  
      const { userID,amount,products,address }= order;
 
      const data = { transactionID,userID,name,amount,products,payment:"Paid", address };
      console.log(data);
      const sorder = await axios.post("http://localhost:8000/api/order/new", data);
      if (sorder) {
        console.log(sorder.data);
        return sorder.data;
      }
      
    } catch (err) {
      console.log(err);
      return err;
    }

};

const orderService = {
    createOrder,
    getOrder,
    supplierOrder
  };
  
  export default orderService;