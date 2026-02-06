import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Home, Layers, Video } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg group-hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300">
                                {/* <Camera className="h-6 w-6 text-white" /> */}
                            </div>
                            <span className="text-white text-xl font-bold tracking-wider group-hover:text-blue-400 transition-colors">PixelVerse</span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <NavLink to="/" icon={<Home size={18} />} text="Home" />
                            <NavLink to="/photos" icon={<Camera size={18} />} text="Photos" />
                            <NavLink to="/videos" icon={<Video size={18} />} text="Videos" />
                            <NavLink to="/collections" icon={<Layers size={18} />} text="Collections" />
                        </div>
                    </div>

                    <div className="md:hidden">
                        {/* Mobile menu button could go here */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, icon, text }) => (
    <Link to={to} className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
        {icon}
        <span>{text}</span>
    </Link>
);

export default Navbar;
