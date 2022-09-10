import React, { useState } from 'react';
import {Route, Routes,Switch} from "react-router-dom";

import AddWork from './components/AddWork';
import AllWork from './components/AllWork';
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import Home from './components/Home';


const App = () =>{
   
  return (
      <>
        <Header></Header> 
        <Routes>
          <Route path="/add-work" element={<AddWork />} />
          <Route path="/work-board" element={<AllWork />} />
          <Route path="/" element={<Home />} />
        </Routes>
        

    </>


  )
}

export default App;
