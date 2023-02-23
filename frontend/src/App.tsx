import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shops from './components/Shops';

// import './App.css';

function App() {
  return (
   <>
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Shops/>} />
   </Routes>

   </BrowserRouter>
    </>
  );
}

export default App;
