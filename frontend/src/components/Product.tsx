import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField
} from "@mui/material";


import ProductType from '../types/product';
import axios from 'axios';
type ProductProps = {
	item: ProductType
	
}

const ProductCard: React.FC<ProductProps> = ({item}:ProductProps) => {


  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
 
  


  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
  };

  const handlePlaceOrder =async (shopkeeperId:number,productId:number) => {
   try{ const token = localStorage.getItem("accessToken")
    const email = localStorage.getItem('userEmail')

    const headerConfig = { headers: { Authorization: `Bearer ${ token }` } }
    const { data } = await axios.get(`http://localhost:5000/shop/email/${ email }`, headerConfig)
    const userId = await data.id
    const res = await axios.post(`http://localhost:5000/trade/create`,{
      importedBy:userId,
      exportedBy:shopkeeperId,
      quantity:quantity,
      productId:productId
      });
      if(res){
        navigate("/trade")
      }
}catch(err){
  console.log(err);
};
 
    
  };

  return (
    <div>
     <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
      <CardMedia
       component="img"
       height="180"
       
       image={item.img}
       alt="product"
      />
      <CardContent >
        
        <Typography sx={{mb:2}} style={{ fontWeight: 'bold' }} variant="body2">
          Price:Rs {item.price}
        </Typography>
        <Typography  style={{ fontWeight: 'bold',fontSize:12 }} variant="body2">
          Description: {item.description}
        </Typography>
        <Typography sx={{mb:2}} style={{ fontWeight: 'bold',fontSize:12 }} variant="body2">
          Quantity: {item.quantity}
        </Typography>
        <TextField
       
         
       
          id="quantity"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <Button sx={{ mt: 2 }} variant="contained"  onClick={()=>{handlePlaceOrder(item.shopkeeperId,item.id)}}>
          Export
        </Button>
      </CardContent>
    </Card>
    </div>
  );
};

export default ProductCard;


