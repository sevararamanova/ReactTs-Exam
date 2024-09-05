

import  { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer/Footer';
import OtherNavbar from '../../components/otherNavbar/OtherNavbar'
import useSWR from 'swr';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import placeholder from '../../images/placeholder.webp';
import '../../styles/featuredstyles.css'; 

interface Product {
  image_link: string;
  brand: string;
  name: string;
  price_sign: string;
  price: number;
  currency: string;
  product_type: string;
}

const baseURL = import.meta.env.VITE_BASE_URL;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Lips() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Product[]>([]);

  const productsPerPage = 12; 


  const { error, isLoading } = useSWR<Product[]>(baseURL, fetcher, {
    onSuccess: (data) => {
      const filteredData = data.filter(
        (product) =>
        product.product_type === "lipstick" ||
        product.product_type === "lip_liner" 
      );
      setData(filteredData);
    },
  });

  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  if (error) {
    return <h2>An error has occurred: {error.message}</h2>;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const totalPages = Math.ceil((data.length || 0) / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page changes
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <OtherNavbar />
      <div className="container  py-4">
        <div className='cont'>
        <h1 className="text-2xl font-bold text-center mb-4">Products for skin</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product: Product, index: number) => (
            <Card
              key={index}
              className="relative border p-4 rounded shadow flex flex-col cursor-pointer"
              data-aos="fade-up"
            >
              {product.image_link ? (
                <Card.Img
                  variant="top"
                  className="w-full h-48 object-cover"
                  src={product.image_link}
                  onError={(e) => (e.currentTarget.src = placeholder)} // Fallback image
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span>No Image Provided</span>
                </div>
              )}
              <Card.Body>
                <Card.Title className="text-lg font-bold mb-2">{product.brand}</Card.Title>
                <Card.Text className="text-gray-700">{product.name}</Card.Text>
                <Card.Text className="text-gray-700">
                  {product.price_sign}
                  {product.price} {product.currency}
                </Card.Text>
                <div className="mt-auto">
                  <Button variant="dark" className="w-full bg-black text-white py-2 px-4">
                    Add to cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        {/* Pagination */}
        <div className="pagination-container mt-4">
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
         </div>
       </div>
    </div>
      <Footer />
 </div>
  );
}

export default Lips;
