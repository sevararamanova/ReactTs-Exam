import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { getProducts, selectProductById } from '../../redux/slices/productSlice';
import { toggleLike } from '../../redux/slices/likedSlice';
import { incrementCart } from '../../redux/slices/counterSlice';
import { useParams } from 'react-router-dom';
import placeholder from '../../images/placeholder.webp';
import { setCurrency } from '../../redux/slices/currencySlice';
import { convertCurrency } from '../../redux/slices/currencyUtils'; 
import { Product, Variant } from '../../types/product-data'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; 
import AOS from 'aos'; 
import parse from 'html-react-parser';  
import './DynamicPage.css';

const DynamicPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

    const products = useSelector((state: RootState) => state.products.products);
    const likedItems = useSelector((state: RootState) => Array.from(state.liked.likedItems));
    const currency = useSelector((state: RootState) => state.currency.currentCurrency);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await dispatch(getProducts()).unwrap();
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            const foundProduct = selectProductById({ products: { products } }, parseInt(id, 10));
            if (foundProduct) {
                setProduct(foundProduct);
                if (foundProduct.variants && foundProduct.variants.length > 0) {
                    setSelectedVariant(foundProduct.variants[0]);
                } else {
                    setSelectedVariant(null);
                }
            } else {
                setProduct(null);
                setSelectedVariant(null);
            }
        }
    }, [products, id]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const handleLike = useCallback(() => {
        if (product) {
            dispatch(toggleLike(product.id));
        }
    }, [dispatch, product]);

    const handleAddToCart = useCallback(() => {
        dispatch(incrementCart());
    }, [dispatch]);

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCurrency(event.target.value));
    };

    if (!product) {
        return <div className="flex items-center justify-center min-h-screen text-lg">Loading...</div>;
    }

    const isLiked = likedItems.includes(product.id);
    const convertedPrice = convertCurrency(product.price, currency);

    return (
        <div className="container mx-auto my-8 p-4">
            <h1 className="text-3xl font-bold text-center mb-6" data-aos="fade-up">{product.name}</h1>
            <p className="text-lg mb-6">{parse(product.description)}</p>
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0" data-aos="fade-right">
                    <img
                        src={product.image_link || placeholder}
                        alt={product.name}
                        className="w-full h-auto max-h-96 object-contain rounded-lg"
                        onError={(e) => (e.currentTarget.src = placeholder)}
                    />
                </div>
                <div className="w-full md:w-1/2 px-4" data-aos="fade-left">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">{product.name}</h2>
                        <p className="text-xl text-gray-600">{product.brand}</p>
                        <p className="text-2xl font-bold mt-2">Price: {convertedPrice} {currency}</p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Select Variant:</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {product.variants && product.variants.length > 0 ? (
                                product.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`py-2 px-4 border rounded-lg text-center w-32 transition-colors ${selectedVariant?.id === variant.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-blue-600 hover:text-white`}
                                    >
                                        {variant.name}
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500">No variants available</p>
                            )}
                        </div>
                        <p className="text-lg font-semibold mb-4 text-gray-700">
                            Selected Variant: {selectedVariant?.name || 'None'}
                        </p>
                    </div>
                    <div className="mb-6 flex space-x-4">
                        <button
                            onClick={handleLike}
                            className={`py-2 px-4 border rounded-lg transition-colors ${isLiked ? 'bg-red-600 text-white border-red-600' : 'bg-gray-100 text-gray-700 border-gray-300'} hover:bg-red-700`}
                            data-aos="fade-up"
                        >
                            ❤️ {isLiked ? 'Unlike' : 'Like'}
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800"
                            data-aos="fade-up"
                        >
                            Add to Cart
                        </button>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Change Currency:</label>
                        <select
                            value={currency}
                            onChange={handleCurrencyChange}
                            className="form-select block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            data-aos="fade-up"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RUB">RUB</option>
                            <option value="UZS">UZS</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicPage;
