import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home'
import Footer from './footer';
import './App.css'

function App() {
  return (
    <BrowserRouter>
    
    
    
      <Routes>
      
        <Route path="/" element={<Home />} />
       
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App
