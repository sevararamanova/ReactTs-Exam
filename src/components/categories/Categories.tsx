import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../../styles/featuredstyles.css';
import FeaturedItem from './FeaturedItem'; 

interface Product {
  imageURL: string;
  brand: string;
  name: string;
}

const featuredproducts: Product[] = [
  {imageURL: "https://d3t32hsnjxo7q6.cloudfront.net/i/8bfba92993344fec7c4179ddd74ddde4_ra,w158,h184_pa,w158,h184.jpg", brand: "L'oreal", name: "L'oreal Infallible Nail Polish"}, 
  {imageURL: "https://cdn.shopify.com/s/files/1/1338/0845/products/brain-freeze_a_800x1200.jpg?v=1502255076", brand: "Colourpop", name: "Blotted Lip Lipstick"},
  {imageURL: "https://d3t32hsnjxo7q6.cloudfront.net/i/c2fcd605bbf3941b521fb74bfa942ac6_ra,w158,h184_pa,w158,h184.png", brand: "Maybelline", name: "Maybelline Kohl Eyeliner"},
  {imageURL: "https://d3t32hsnjxo7q6.cloudfront.net/i/be5757ecba60adb5369518ee5eb5d16e_ra,w158,h184_pa,w158,h184.jpg", brand: "Milani", name: "Milani Liquid Eyeliner"},
  {imageURL: "https://www.clinique.com/media/export/cms/products/181x209/clq_7C5H01_181x209.png", brand: "Clinique", name: "Repairwear Smooth Makeup Foundation"},
];

const Categories: React.FC = () => {
  return (
    <div className='container'>
      <div className='sub'>
      <h1 className="featured-heading">FEATURED</h1>
    <div className="parent-container">
      <Row xs="auto" className="g-4">
        {featuredproducts.map((product, idx) => (
          <Col key={idx}>
            <div className='card-container'>
            <FeaturedItem imageURL={product.imageURL}/>
            <div className='brand'>
           {product.brand}  
           </div>
           </div>
          </Col>
        ))}
      </Row>
    </div>
    </div>
    </div>
  );
}

export default Categories;
