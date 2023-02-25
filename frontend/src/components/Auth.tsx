import { Box,  Typography,TextField,Button } from "@mui/material";
import React, { useState,useContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import UserContext from "../UserContext"

const Auth = () => {
  const naviagte = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    img:"",
    address :""
  });
  const [isSignup, setIsSignup] = useState(false);
  const { loggedIn, setLoggedIn }: any = useContext(UserContext)
  const handleChange = (e:any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(`http://localhost:5000/shop/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        img:inputs.img,
        address :inputs.address
      });
  
      if (res) {
        const data = await res.data;
        console.log(data);
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
  
    if (isSignup) {
      sendRequest("signup")
        
        
        .then(() => naviagte("/sign"));
        setInputs({
          name: "",
          email: "",
          password: "",
          img:"",
          address :""
         })
    } else {
      sendRequest()
        .then((data) => {localStorage.setItem("accessToken", data.access_token)
                          localStorage.setItem("userEmail", inputs.email)
                          setLoggedIn(true)
                         
      })
			           
        
       naviagte("/")
      
        
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="ShopName"
              margin="normal"
              
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
            
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
           
          />
           {isSignup && (
            <TextField
              name="img"
              onChange={handleChange}
              value={inputs.img}
              placeholder="ImageUrl"
              margin="normal"
             
            />
          )}
          {isSignup && (
            <TextField
              name="address"
              onChange={handleChange}
              value={inputs.address}
              placeholder="Address"
              margin="normal"
              
            />
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
           
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
           
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;