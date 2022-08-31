import axios from "axios";

const makePayment = async(senderACC, receiverACC, pin,amount)=>{
  try{
    const data = {senderACC, receiverACC, pin,amount}
    const payment = await axios.put("http://localhost:5000/api/payment/pay", data);
        if (payment) {
          console.log(payment.data);
          return payment.data;
        }
  }catch(err)
  {
    console.log(err);
        return err;
  }

};

const paymentService = {
    makePayment,
  };
  
  export default paymentService;