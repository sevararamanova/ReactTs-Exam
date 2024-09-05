import React from 'react';
import { useSelector } from 'react-redux';
import { BsCart4, BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';

const Nav: React.FC = () => {
    const cartQuantity = useSelector((state: RootState) => state.counter.cart);
    const heartCount = useSelector((state: RootState) => state.counter.hearts);

    return (
        <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 shadow-lg z-50">
            <div className="container mx-auto flex justify-center items-center p-4 relative">
                <div className="absolute left-16 flex items-center space-x-10">
                    <Link to="/allPage" className="text-gray-300 hover:text-pink-500 custom-navlink">ALL</Link>
                    <Link to="/skin" className="text-gray-300 hover:text-pink-500 custom-navlink">SKIN</Link>
                    <Link to="/lips" className="text-gray-300 hover:text-pink-500 custom-navlink">LIPS</Link>
                    <Link to="/eyes" className="text-gray-300 hover:text-pink-500 custom-navlink">EYES</Link>
                </div>

                <div className="flex-grow text-center flex items-center justify-center">
                    <span
                        className="font-bold text-pink-500 text-3xl"
                        style={{
                            fontFamily: "fantasy",
                            padding: "5px 10px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        SR Store
                    </span>
                </div>

                <div className="absolute right-5 flex items-center space-x-10 links">
                    <Link to="/nails" className="text-gray-300 hover:text-pink-500 custom-navlink">NAILS</Link>
                    <Link to="/blog" className="text-gray-300 hover:text-pink-500 custom-navlink">BLOG</Link>
                    <Link to="/contact" className="text-gray-300 hover:text-pink-500 custom-navlink">CONTACT</Link>
                    <div className='flex items-center space-x-4'>
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

export default Nav;
