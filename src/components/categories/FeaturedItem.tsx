import React from 'react';
import Card from 'react-bootstrap/Card';
import './Categories.css'; 

interface FeaturedItemProps {
  imageURL: string;
  brand: string;
  name: string;
}

const FeaturedItem: React.FC<FeaturedItemProps> = ({ imageURL, brand}) => (
    <div className='card-container'>
  <Card className="featured-item-card">
    <Card.Body>
    <Card.Img variant="top" src={imageURL} className="featured-item-img" />
    </Card.Body>
    <Card.Title className="featured-item-brand">{brand}</Card.Title>
  </Card>
  </div>
);

export default FeaturedItem;
