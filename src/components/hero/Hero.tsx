import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import local images
import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';
import image4 from '../../images/image4.jpg';
import image5 from '../../images/image5.jpg';

// Define images array
const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1
      );
    }, 2000); // Automatically change slide every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel
      activeIndex={currentSlide}
      onSelect={(selectedIndex) => setCurrentSlide(selectedIndex)}
      interval={null} 
      controls={true} 
      indicators={true} 
    >
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image}
            alt={`Slide ${index + 1}`}
            style={{ height: 'auto', objectFit: 'cover' }} 
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Hero;
