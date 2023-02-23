import React ,{ FC }from 'react'
import {
    
    Box,
    Button,
    Card,
    CardActionArea,
    CardHeader,
    CardMedia,
  } from "@mui/material";
import ShopType from '../types/shop';
import Product from './Product';


  type ShopProps = {
	item: ShopType
	
}
const products = () => {
  alert ("Welcome to my shop")
  
};

const Shop:FC<ShopProps> = ({item}:ShopProps): JSX.Element => {
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
        <CardHeader
      title =  {item.name}/>
        <CardMedia
          component="img"
          height="280"
          image={item.img}
          alt="shopkeeper"
        />
        <CardActionArea>
            <Button onClick={products}>Show Products</Button>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Shop