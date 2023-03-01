import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Inputs {
  name: string
  quantity: number
  price: number
  description: string
  shopkeeperId: number
  img: string
}

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddProduct = (): JSX.Element => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('')
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    quantity: 0,
    price: 0,
    description: '',
    shopkeeperId: 0,
    img: ''
  });

  useEffect(() => {
    async function getShop() {
      const token:any= localStorage.getItem("accessToken")
     
      const decodedToken: any = jwt_decode(token);
      const userId: string = decodedToken.id;
			setUserId(userId)

    }
    getShop()


  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (): Promise<any> => {
    try {
      const res = await axios.post("http://localhost:5000/product/create", {
        name: inputs.name,
        description: inputs.description,
        img: inputs.img,
        price: inputs.price,
        shopkeeperId: userId,
        quantity: inputs.quantity,


      })
      if (res) {
        const data = await res.data;

        return data

      }

    }
    catch (err) {
      console.log(err);
    }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            ADD Your Product
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            margin="none"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="none"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Price</InputLabel>
          <TextField
            name="price"
            onChange={handleChange}
            value={inputs.price}
            margin="none"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField
            name="img"
            onChange={handleChange}
            value={inputs.img}
            margin="none"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Quantity</InputLabel>
          <TextField
            name="quantity"
            onChange={handleChange}
            value={inputs.quantity}
            margin="none"
            variant="outlined"
          />

          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddProduct;
