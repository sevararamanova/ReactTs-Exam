import React, { useEffect, useState } from 'react';
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
import 'aos/dist/aos.css'; // AOS CSS
import AOS from 'aos'; // AOS JS

const DynamicPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

    const products = useSelector((state: RootState) => state.products.products);
    const likedItems = useSelector((state: RootState) => Array.from(state.liked.likedItems));
    const currency = useSelector((state: RootState) => state.currency.currentCurrency);

    
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        console.log('Products:', products);
        if (id) {
            const foundProduct = selectProductById({ products: { products } }, parseInt(id, 10));
            console.log('Found Product:', foundProduct);
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

    const handleLike = () => {
        if (product) {
            dispatch(toggleLike(product.id));
        }
    };

    const handleAddToCart = () => {
        dispatch(incrementCart());
    };

    const handleCurrencyChange = (newCurrency: string) => {
        dispatch(setCurrency(newCurrency));
    };

    if (!product) {
        return <div className="d-flex align-items-center justify-content-center min-vh-100">Loading...</div>;
    }

    const isLiked = likedItems.includes(product.id);
    const convertedPrice = convertCurrency(product.price, currency);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" data-aos="fade-up">{product.name}</h1>
            <div className="row">
                <div className="col-md-6" data-aos="fade-right">
                    <img
                        src={product.image_link || placeholder}
                        alt={product.name}
                        className="img-fluid"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                        onError={(e) => (e.currentTarget.src = placeholder)}
                    />
                </div>
                <div className="col-md-6" data-aos="fade-left">
                    <div className="mb-3">
                        <h2>{product.name}</h2>
                        <p>{product.brand}</p>
                        <p className="h4">Price: {convertedPrice} {currency}</p>
                    </div>
                    <div className="mb-6">
    <label className="block text-gray-700 font-semibold mb-2">Select Variant:</label>
    <div className="flex flex-wrap gap-4 mb-4">
        {product && product.variants && product.variants.length > 0 ? (
            product.variants.map((variant) => (
                <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-2 border rounded-md shadow-sm text-center w-32 ${selectedVariant?.id === variant.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
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
                    <div className="mb-3">
                        <button
                            onClick={handleLike}
                            className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-secondary'}`}
                            data-aos="fade-up"
                        >
                            ❤️ {isLiked ? 'Unlike' : 'Like'}
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-dark ms-2"
                            data-aos="fade-up"
                        >
                            Add to Cart
                        </button>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Change Currency:</label>
                        <select
                            value={currency}
                            onChange={(e) => handleCurrencyChange(e.target.value)}
                            className="form-select"
                            data-aos="fade-up"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RUB">RUB</option>
                            <option value="UZB">UZS</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicPage;
