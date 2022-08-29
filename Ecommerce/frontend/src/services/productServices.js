import axios from "axios";

const getProductByID = async (productID) => {
    try{
        const result = await axios.get("http://localhost:5000/api/product/"+productID);
        console.log(result.data);
        return result.data;
    }
    catch(err)
    {
        return err
    }
    
  };

  const productService = {
    getProductByID
  };
  
  export default productService;