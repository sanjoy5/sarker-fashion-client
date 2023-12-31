import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const Main = () => {
    return (
        <div>

            <div className="max-w-screen-xl mx-auto">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default Main;