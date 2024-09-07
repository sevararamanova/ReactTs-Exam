import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer/Footer';
import { toggleLike } from '../../redux/slices/likedSlice';
import { incrementCart, incrementHeart } from '../../redux/slices/counterSlice'; 
import { FaHeart } from 'react-icons/fa';
import useSWR from 'swr';
import AOS from 'aos';
import 'aos/dist/aos.css';
import placeholder from '../../images/placeholder.webp';
import '../../styles/featuredstyles.css';
import { useNavigate } from 'react-router-dom';
import SearchNavbar from '../../components/searchNavbar/SearchNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlices';
import { Product } from '../../types/product-data';
import { RootState } from '../../redux/store';

const baseURL = import.meta.env.VITE_BASE_URL;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Lips() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Product[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsPerPage = 12;
  const likedProducts = useSelector((state: RootState) => state.liked.likedItems);

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
    return <h2 className="text-center text-red-500">Something went wrong: {error.message}</h2>;
  }

  if (isLoading) {
    return <h2 className="text-center">Loading...</h2>;
  }

  const totalPages = Math.ceil((data.length || 0) / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price), 
      quantity: 1, 
      image_link: product.image_link || placeholder,
    }));
    dispatch(incrementCart()); 
  };

  const handleLike = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation(); 
    dispatch(toggleLike(productId));
    dispatch(incrementHeart()); 
  };

  return (
    <div>
      <SearchNavbar />
      <div className="container py-4">
        <div className='cont'>
          <h1 className="text-2xl font-bold text-center mb-4">Products for skin</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product: Product) => (
              <Card
                key={product.id}
                className="relative border p-4 rounded shadow flex flex-col cursor-pointer"
                data-aos="fade-up"
                onClick={() => handleCardClick(product.id)}
              >
                <div className="absolute top-2 right-2 z-10">
                  <button
                    className={`p-2 rounded-full ${likedProducts.has(product.id) ? 'text-red-500' : 'text-gray-500'} hover:bg-gray-200`}
                    onClick={(e) => handleLike(product.id, e)}
                  >
                    <FaHeart size={24} />
                  </button>
                </div>
                {product.image_link ? (
                  <Card.Img
                    variant="top"
                    className="w-full h-48 mb-4 relative object-cover"
                    src={product.image_link}
                    onError={(e) => (e.currentTarget.src = placeholder)}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span>No Image Provided</span>
                  </div>
                )}
                <Card.Body className="flex flex-col">
                  <Card.Title className="text-lg font-bold mb-2">{product.brand}</Card.Title>
                  <Card.Text className="text-gray-700 mb-2">{product.name}</Card.Text>
                  <Card.Text className="text-gray-700 mb-4">
                    {product.price_sign}
                    {product.price} {product.currency}
                  </Card.Text>
                  <Button
                    variant="dark"
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300 mt-auto"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleAddToCart(product);
                    }}
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Lips;
