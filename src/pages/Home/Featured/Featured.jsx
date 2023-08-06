import React from 'react';
import SectionTitle from '../../../components/SectionTilte/SectionTitle';
import featuredImg from '../../../assets/banner/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item text-white pt-16 pb-24 mt-16 md:mt-24' >
            <SectionTitle heading='Todays Best Offer' subheading='Only for you' />
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10  px-5 md:px-20">
                <div className="">
                    <img src={featuredImg} className='max-w-[600px] w-full' alt="" />
                </div>
                <div className="max-w-[600px] w-full ">
                    <p>Aug 15, 2024</p>
                    <p className="uppercase text-lg my-1">Hot Deal Alert! Today Only</p>
                    <p>
                        Discover today's unbeatable offer! Enjoy a whopping 50% off on all products. Limited time only. Shop now and save big! Don't miss out!
                    </p>
                    <button className="btn btn-outline mt-3 border-0 border-b-4 border-white text-white hover:bg-white hover:text-gray-900 hover:border-white">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;