import React,{ useState } from 'react'
import {
    AppBar,
    Toolbar,
    Box,
    Tabs,
    Tab,
  } from "@mui/material";
  
  


  const Header: React.FC = () => {
    const [value, setValue] = useState();
  
    return (
      <AppBar
        position="sticky"
        sx={{
          background:
            
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,112,1) 35%, rgba(0,212,255,1) 100%)"
        }}
      >
        <Toolbar>
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                
                label="ADD Product"
              />
              <Tab
                
                label="My Products"
              />
              <Tab
      
                label="My Trade"
              />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Header;
  
  
  
  
  