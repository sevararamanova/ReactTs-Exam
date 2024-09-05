import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getProducts } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlices';
import { incrementCart, incrementHeart } from '../../redux/slices/counterSlice'; // Import incrementCart
import { toggleLike } from '../../redux/slices/likedSlice';
import SearchNavbar from '../../components/searchNavbar/SearchNavbar';
import Footer from '../../components/footer/Footer';
import placeholder from '../../images/placeholder.webp'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AllPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.products.products);
    const status = useSelector((state: RootState) => state.products.status);
    const error = useSelector((state: RootState) => state.products.error);
    const likedProducts = useSelector((state: RootState) => state.liked.likedItems);

    useEffect(() => {
        dispatch(getProducts());
        AOS.init({ duration: 1000 });
    }, [dispatch]);

    const handleAddToCart = (product: any) => {
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

    const handleCardClick = (productId: number) => {
        navigate(`/products/${productId}`);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const filteredProducts = Array.isArray(products) ? products.filter(product => product.image_link && product.image_link.trim() !== '') : [];

    return (
        <div>
            <SearchNavbar />
            <div className="container mx-auto py-4">
                <h1 className="text-2xl font-bold text-center mb-4">All Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
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
                                <div className="w-full h-48 mb-4 relative">
                                    <img
                                        src={product.image_link || placeholder}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.currentTarget.src = placeholder)}
                                    />
                                </div>
                                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                                <p className="text-gray-700">{product.brand}</p>
                                <p className="text-gray-700">${Number(product.price).toFixed(2)}</p> {/* Convert price to number */}
                                <div className="mt-auto">
                                    <button
                                        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300 w-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">No products available</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AllPage;
