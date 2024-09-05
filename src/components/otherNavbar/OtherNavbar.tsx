import React from 'react';
import { Link } from 'react-router-dom';

const OtherNavbar: React.FC = () => {
  
    return (
        <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 shadow-lg z-50">
            <div className="container mx-auto flex justify-center items-center p-4 relative">
                <div className="absolute left-16 flex items-center space-x-10">
                    <Link to="/" className='text-gray-300 hover:text-pink-500 custom-navlink'>HOME</Link>
                    <Link to="/allPage" className="text-gray-300 hover:text-pink-500 custom-navlink">ALL</Link>
                    <Link to="/skin" className="text-gray-300 hover:text-pink-500 custom-navlink">SKIN</Link>
                 </div>
                <div className="flex-grow text-center flex items-center justify-center">
                    <span
                        className="font-bold text-pink-500 text-5xl"
                        style={{
                            fontFamily: "fantasy",
                           
                            borderRadius: "8px",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        SR Store
                    </span>
                </div>
                <div className="absolute right-5 flex items-center space-x-10 links">
                <Link to="/lips" className="text-gray-300 hover:text-pink-500 custom-navlink">LIPS</Link>
                <Link to="/eyes" className="text-gray-300 hover:text-pink-500 custom-navlink">EYES</Link>
                    <Link to="/nails" className="text-gray-300 hover:text-pink-500 custom-navlink">NAILS</Link>
                   
                    <div className='flex items-center space-x-4'>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default OtherNavbar;
