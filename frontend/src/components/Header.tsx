import React, { useState,useContext } from 'react';
import { AppBar, Toolbar, Box, Tabs, Tab,Button } from '@mui/material';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

const Header: React.FC = () => {
  const [value, setValue] = useState(0);
  const { loggedIn, setLoggedIn }: any = useContext(UserContext)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,112,1) 35%, rgba(0,212,255,1) 100%)' }}>
      <Toolbar>
        {loggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
          <Tabs textColor="inherit" value={value} onChange={handleChange}>
          <Tab label="Home" component={Link} to="/" />
            <Tab label="ADD Product" component={Link} to="/add" />
            <Tab label="My Products" component={Link} to="/products" />
            <Tab label="My Trade" component={Link} to="/trade" />
          </Tabs>
        </Box>
        )}
          <Box display="flex" marginLeft="auto">
         {!loggedIn && (
            <>
              {" "}
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Login
              </Button>
              
            </>
          )}
            {loggedIn && (
            <Button
              onClick={() =>setLoggedIn(false)}
              component={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
          </Box>
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
;
  
  
  
  
  