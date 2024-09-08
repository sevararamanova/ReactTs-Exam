import React from 'react';
import { Container, Row, Col, Card, Button, Carousel, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import nature1 from '../../images/nature1.jpeg';
import nature2 from '../../images/nature2.jpeg';
import nature3 from '../../images/nature3.jpeg';

// Sample blog posts
const blogPosts = [
  {
    title: 'Serene Beauty of Lush Green Landscapes',
    description: 'Discover the serene beauty of lush green landscapes in this post.',
    img: nature1,
    link: '#'
  },
  {
    title: 'Tranquility of a Peaceful Sunset',
    description: 'Experience the tranquility of a peaceful sunset in this article.',
    img: nature2,
    link: '#'
  },
  {
    title: 'Grand Mountain Ranges',
    description: 'Marvel at the grandeur of towering mountain ranges.',
    img: nature3,
    link: '#'
  }
];

const BlogPage: React.FC = () => {
  return (
    <Container className="my-5">
      {/* Carousel */}
      <Carousel interval={2000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={nature1}
            alt="Nature 1"
            style={{ height: '450px', objectFit: 'cover', borderRadius: '10px' }}
          />
          <Carousel.Caption>
            <h3 className="carousel-title">Serene Landscapes</h3>
            <p className="carousel-text">Explore the serenity of nature through our stunning images.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={nature2}
            alt="Nature 2"
            style={{ height: '450px', objectFit: 'cover', borderRadius: '10px' }}
          />
          <Carousel.Caption>
            <h3 className="carousel-title">Peaceful Sunset</h3>
            <p className="carousel-text">Experience tranquility with our breathtaking sunset views.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={nature3}
            alt="Nature 3"
            style={{ height: '450px', objectFit: 'cover', borderRadius: '10px' }}
          />
          <Carousel.Caption>
            <h3 className="carousel-title">Majestic Mountains</h3>
            <p className="carousel-text">Marvel at the grandeur of towering mountain ranges.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Blog Posts */}
      <Row className="my-5">
        {blogPosts.map((post, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="shadow-lg border-light rounded">
              <Card.Img variant="top" src={post.img} style={{ borderRadius: '10px' }} />
              <Card.Body>
                <Card.Title className="card-title">{post.title}</Card.Title>
                <Card.Text className="card-text">{post.description}</Card.Text>
                <Button variant="dark" href={post.link} className="shadow-sm">Read More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Newsletter Signup */}
      <Row className="my-5">
        <Col md={12} className="text-center">
          <h3 className="newsletter-title">Subscribe to Our Newsletter</h3>
          <Form className="d-inline-block">
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter your email" className="newsletter-input" />
            </Form.Group>
            <Button variant="dark" type="submit" className="shadow-sm">
              Subscribe
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPage;
