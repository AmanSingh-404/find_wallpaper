import React from 'react';
import Hero from '../components/Hero';
import Tabs from '../components/Tabs';
import ResultGrid from '../components/ResultGrid';
import MainLayout from '../layouts/MainLayout';

const HomePage = () => {
    return (
        <MainLayout>
            <Hero />
            <div className="max-w-[1600px] mx-auto flex flex-col items-center min-h-[500px]">
                <div className="w-full sticky top-16 z-40 bg-black/90 backdrop-blur-md pt-4 pb-2">
                    <Tabs />
                </div>
                <div className="w-full mt-6">
                    <ResultGrid />
                </div>
            </div>
        </MainLayout>
    );
};

export default HomePage;
