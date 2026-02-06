import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white">
            <Navbar />
            <main className="grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
