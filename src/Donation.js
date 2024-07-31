import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { FaDonate } from 'react-icons/fa';
import styled from 'styled-components';
import Navbar from './components/Nav/Navbar';
import Footer from './Footer';
import image from './assets/logo2.jpg';

const DisasterGiftBoxPage = () => {
  return (
    <div className="App">
      <Navbar />
      <div style={{ width: "100%", height: "84vh" }}>
        {/* Display the URL content in an iframe */}
        <iframe
          src="http://localhost:5000/"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Embedded Content"
        />
      </div>
      <Footer />
    </div>
  );
};

export default DisasterGiftBoxPage;
