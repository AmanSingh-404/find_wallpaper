import React from 'react';
import { Github, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black/90 text-white py-12 border-t border-white/10 mt-auto w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">PixelVerse</h3>
                        <p className="text-gray-400 max-w-sm">
                            Discover the world's best free stock photos, videos, and collections. Powered by creators everywhere.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Community</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-blue-400 transition">Creators</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Events</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Forum</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Connect</h4>
                        <div className="flex space-x-4">
                            <SocialIcon icon={<Github size={20} />} />
                            <SocialIcon icon={<Twitter size={20} />} />
                            <SocialIcon icon={<Instagram size={20} />} />
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} PixelVerse. All rights reserved.</p>
                    <div className="flex items-center gap-1 mt-2 md:mt-0">
                        Made with <Heart size={16} className="text-red-500 fill-red-500" /> by Developers
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="https://github.com/Amansingh-404" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
        {icon}
    </a>
);

export default Footer;
