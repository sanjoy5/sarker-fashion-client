import React from 'react';
import bannerImg from '../../assets/banner/calltoaction.jpg'

const CallToAction = () => {
    return (
        <>
            <div className="hero min-h-[500px] mb-24" style={{ backgroundImage: 'url(https://i.ibb.co/nf9FDRn/calltoaction.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-4xl md:text-5xl font-bold">Sarker Fashion</h1>
                        <p className="mb-5">Discover Sarker Fashion's trendy apparel and accessories for men, women, and kids. From chic dresses to suave suits, find your perfect style. Elevate your wardrobe with us today!!</p>
                        <button className="py-3 px-6 text-lg rounded bg-[#111827] text-white">Shop Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CallToAction;