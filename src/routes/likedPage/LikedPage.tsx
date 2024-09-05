import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getProducts } from '../../redux/slices/productSlice';
import { toggleLike } from '../../redux/slices/likedSlice';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import placeholder from '../../images/placeholder.webp'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHeart } from 'react-icons/fa';

const LikedPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const likedProductIds = useSelector((state: RootState) => state.liked.likedItems); // Ensure it's always defined
    const products = useSelector((state: RootState) => state.products.products || []);
    const status = useSelector((state: RootState) => state.products.status);
    const error = useSelector((state: RootState) => state.products.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getProducts());
        }
        AOS.init({ duration: 1000 });
    }, [dispatch, status]);

    const handleToggleLike = (productId: number) => {
        dispatch(toggleLike(productId));
    };

    if (status === 'loading') {
        return <div className="text-center">Loading...</div>;
    }

    if (status === 'failed') {
        return <div className="text-center">Error: {error}</div>;
    }

    // Ensure likedProductIds is a Set and products is an array
    const likedProducts = products.filter(product => likedProductIds.has(product.id));

    return (
        <div>
            <div className="container mx-auto py-4">
                <h1 className="text-2xl font-bold text-center mb-4">Liked Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {likedProducts.length > 0 ? (
                        likedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="relative border p-4 rounded shadow flex flex-col"
                                data-aos="fade-up"
                            >
                                <div className="absolute top-2 right-2 z-10">
                                    <button
                                        className={`p-2 rounded-full ${likedProductIds.has(product.id) ? 'text-red-500' : 'text-gray-500'} hover:bg-gray-200`}
                                        onClick={() => handleToggleLike(product.id)}
                                    >
                                        <FaHeart size={24} />
                                    </button>
                                </div>
                                <Link to={`/products/${product.id}`} className="w-full h-48 mb-4 relative block">
                                    <img
                                        src={product.image_link || placeholder}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.currentTarget.src = placeholder)}
                                    />
                                </Link>
                                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                                <p className="text-gray-700">{product.brand}</p>
                                <p className="text-gray-700">${product.price}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">No liked products available</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LikedPage;
