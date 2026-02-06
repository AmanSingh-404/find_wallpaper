import React from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl px-4 text-center space-y-8">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
                    Discover <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">Extraordinary</span> Visuals
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
                    The internet's source for visuals. Powered by creators everywhere.
                </p>

                <div className="pt-8">
                    <SearchBar />
                </div>

                <div className="pt-4 flex justify-center gap-4 text-sm text-gray-400">
                    <span>Trending:</span>
                    <a href="#" className="hover:text-white transition">Nature</a>
                    <a href="#" className="hover:text-white transition">Wallpapers</a>
                    <a href="#" className="hover:text-white transition">Architecture</a>
                    <a href="#" className="hover:text-white transition">Texture</a>
                </div>
            </div>

            {/* Floating Particles/Effects (Optional) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>
        </div>
    );
};

export default Hero;
