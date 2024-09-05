import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCart4, BsHeart } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { setQuery } from '../../redux/slices/searchSlices'; // To‘g‘ri import qilinganligini tekshiring
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholder from '../../images/placeholder.webp'; // Placeholder tasvirni import qilish

const SearchNavbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartQuantity = useSelector((state: RootState) => state.counter.cart);
    const heartCount = useSelector((state: RootState) => state.counter.hearts);

    useEffect(() => {
        if (searchQuery.length > 2) { // Faqat 3 yoki undan ortiq belgilar kiritilganida qidiruv tavsiyalarini yuklash
            axios.get(`/api/suggestions?query=${searchQuery}`)
                .then(response => {
                    const data = Array.isArray(response.data) ? response.data : [];
                    setSuggestions(data);
                    setShowSuggestions(true);
                })
                .catch(() => {
                    setSuggestions([]);
                    setShowSuggestions(false);
                });
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setQuery(searchQuery));
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        dispatch(setQuery(suggestion));
        navigate(`/search?query=${encodeURIComponent(suggestion)}`);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 shadow-lg z-50">
            <div className="container mx-auto flex justify-between items-center p-4 relative">
                <Link to="/" className="text-gray-300 hover:text-pink-500">
                    <span
                        className="font-bold text-pink-500 text-3xl"
                        style={{
                            fontFamily: "fantasy",
                            marginRight: "10px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        SR Store
                    </span>
                </Link>
                <div className="flex items-center space-x-8">
                    <Link to="/" className='text-gray-300 hover:text-pink-500'>HOME</Link>
                    <Link to="/allPage" className="text-gray-300 hover:text-pink-500">ALL</Link>
                    <Link to="/skin" className="text-gray-300 hover:text-pink-500">SKIN</Link>
                    <Link to="/lips" className="text-gray-300 hover:text-pink-500">LIPS</Link>
                    <Link to="/eyes" className="text-gray-300 hover:text-pink-500">EYES</Link>
                    <Link to="/nails" className="text-gray-300 hover:text-pink-500">NAILS</Link>
                </div>

                <form className="mx-4 relative" style={{ width: '300px' }} onSubmit={handleSearchSubmit}>
                    <div className="input-group">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search..."
                            aria-label="Search"
                            aria-describedby="search-addon"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay to allow suggestion click
                        />
                        <button className="btn btn-outline-light" type="submit">
                            Search
                        </button>
                    </div>
                    {showSuggestions && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 z-50 shadow-lg rounded">
                            {suggestions.length > 0 ? (
                                <ul className="list-none p-0 m-0">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            <img src={placeholder} alt="Placeholder" className="w-8 h-8 object-cover rounded mr-2" />
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-2">No suggestions</div>
                            )}
                        </div>
                    )}
                </form>

                <div className="flex items-center space-x-10">
                    <div className="relative flex items-center space-x-4">
                        <div className="relative">
                            <Link to="/likedPage" className="text-gray-200 hover:text-red-300">
                                <BsHeart size={26} />
                            </Link>
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                {heartCount}
                            </span>
                        </div>

                        <div className="relative">
                            <Link to="/cartPage" className="text-gray-200 hover:text-blue-300">
                                <BsCart4 size={26} />
                            </Link>
                            <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                {cartQuantity}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SearchNavbar;
