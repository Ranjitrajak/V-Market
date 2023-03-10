import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import jwt_decode from "jwt-decode";
import {

    Box,
    Card,
    CardActionArea,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,

  } from "@mui/material";
  import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
  import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
  
import ProductType from '../types/product';




const MyProduct = () => {
    const [ response, setResponse ] = useState<ProductType[]>([])
    const [ userId, setUserId ] = useState('')
    const navigate = useNavigate();

    const handleEdit = (id:any) => {
        navigate(`/update/${id}`);
      };
      const handleDelete = async (id:any) => {
        try{
            const res = await axios.delete(`http://localhost:5000/product/${id}`)
         
            if (res) {
              const data = await res.data;
              console.log(data);
              return data;
            }

        }
        catch(err){
            console.log(err);
        };
        
      };
    
	useEffect(() => {
		async function getProductItems() {

			const token:any= localStorage.getItem("accessToken")
     
      const decodedToken: any = jwt_decode(token);
      const userId: string = decodedToken.id;
			setUserId(userId)


			
			const getProduct = await axios.get(`http://localhost:5000/product/${ userId }`)
			setResponse(getProduct.data)
			
		}
		
		getProductItems()
		
	}, [])
  
  return (
    <div>
    <ul>
      {response.map((item) => (
        <li key={item.id}>
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
        <Box display="flex">
            <IconButton onClick={()=>handleEdit(item.id)} sx={{ marginLeft: "auto" }}>
              <EditOutlinedIcon color="action" />
            </IconButton>
            <IconButton onClick={() => handleDelete(item.id)}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        <CardHeader title={item.name} />
        <CardMedia component="img" height="280" image={item.img} alt="productimg" />
        <CardActionArea>
        <Typography sx={{mb:2}} style={{ fontWeight: 'bold' }} variant="body2">
          Price:Rs {item.price}
        </Typography>
        <Typography  style={{ fontWeight: 'bold',fontSize:12 }} variant="body2">
          Description: {item.description}
        </Typography>
        <Typography sx={{mb:2}} style={{ fontWeight: 'bold',fontSize:12 }} variant="body2">
          Quantity: {item.quantity}
        </Typography>
          
        </CardActionArea>
      </Card>
          
        </li>
      ))}
    </ul>
  </div>
  )
}

export default MyProduct