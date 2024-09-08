import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Footer from '../../components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css'; 

const Contact: React.FC = () => {
  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          {/* Contact Form Section */}
          <Col md={6} lg={5} className="contact-form-col">
            <h1 className="text-center mb-4">Contact Us</h1>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Your message" />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100">
                Send Message
              </Button>
            </Form>
          </Col>

          {/* Contact Details Section */}
          <Col md={6} lg={5} className="contact-details-col">
            <h2 className="text-center mb-4">Contact Details</h2>
            <div className="contact-detail">
              <h4>Email:</h4>
              <p>info@srstore.com</p>
            </div>
            <div className="contact-detail">
              <h4>Phone:</h4>
              <p>+ (94) 177 77 77</p>
            </div>
            <div className="contact-detail">
              <h4>Address:</h4>
              <p>Tashkent,UZB</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
