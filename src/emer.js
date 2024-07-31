import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from './components/Nav/Navbar';
import Footer from './Footer';
import { FaPhoneAlt } from 'react-icons/fa';
import './emer.css';

const emergencyContacts = [
  { name: 'Kenya Red Cross Society', number: '+254 711 072 000' },
  { name: 'Kenya Police Service', number: '999' },
  { name: 'Ambulance Services', number: '+254 702 300 000' },
  { name: 'National Disaster Management Authority', number: '+254 202 041 252' },
  { name: 'Fire Brigade', number: '+254 711 071 000' },
  { name: 'Kenya Power and Lighting Company (for power outages)', number: '+254 711 111 000' },
  { name: 'Kenya Meteorological Department', number: '+254 20 233 7890' }
];


const EmergencyContacts = () => {
  return (
    <div className="App">
      <Navbar />
      <Container fluid className="emergency-contacts-container py-5">
        <h2 style={{ color: "#1a2a6c" }}>Emergency contacts</h2>
        <Row className="justify-content-center">
          {emergencyContacts.map((contact, index) => (
            <Col xs={12} sm={6} md={4} key={index} className="mb-4">
              <div className="contact-card">
                <div className="contact-icon-container">
                  <FaPhoneAlt className="contact-icon" />
                </div>
                <div className="contact-info-container">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-number">
                    <a href={`tel:${contact.number}`} className="contact-link">
                      {contact.number}
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default EmergencyContacts;
