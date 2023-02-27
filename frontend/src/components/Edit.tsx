import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
interface Inputs {
  [key: string]: string | number;
  name: string
  quantity: number
  price: number
  description: string
  shopkeeperId: number
  img: string
}

const ProductEdit = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    quantity: 0,
    price: 0,
    description: '',
    shopkeeperId: 0,
    img: ''
  });
  const [updatedFields, setUpdatedFields] = useState<string[]>([]);
  const id = useParams().id;


  const handleChange = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setInputs((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
    if (!updatedFields.includes(fieldName)) {
      setUpdatedFields([...updatedFields, fieldName]);
    }
  };
  const sendRequest = async (): Promise<any> => {
    try {
      const requestBody: any = {};
      updatedFields.forEach((fieldName) => {
        requestBody[fieldName] = inputs[fieldName];
      });
      const res = await axios.put(`http://localhost:5000/product/${id}`, requestBody);
      if (res) {
        const data = await res.data;
        return data;
      }
    } catch (err) {
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

export default ProductEdit;