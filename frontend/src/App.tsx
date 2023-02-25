import React,{useState} from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shops from './components/Shops';
import AddProduct from './components/AddProduct';

// import './App.css';
import UserContext from './UserContext'
import Auth from './components/Auth';
import MyProduct from './components/MyProduct';
import ProductEdit from './components/Edit';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
   <>
     <UserContext.Provider value={{ loggedIn, setLoggedIn } as any}>
   <BrowserRouter>
   <header>
   <Header/>

   </header>
   <main>
   <Routes>
   {!loggedIn ? (
            <Route path="/auth" element={<Auth/>} />
          ):(<>
          <Route path="/" element={<Shops/>} />
         <Route path="/add" element={<AddProduct />} />
         <Route path="/products" element={<MyProduct />} />
         <Route path="/update/:id" element={<ProductEdit/>} />
         
          </>)}
    
   </Routes>

   </main>
   
   
   

   </BrowserRouter>
   </UserContext.Provider>
    </>
  );
}

export default App;
