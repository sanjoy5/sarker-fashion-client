import React from 'react';
import { FaPhoneAlt, FaLocationArrow } from 'react-icons/fa';
import { BiSolidTime } from 'react-icons/bi';

const LocationPage = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4 mb-16">
                <div className="">
                    <div className="bg-yellow-600 py-4 px-4 flex items-center justify-center h-[52px]">
                        <FaPhoneAlt className='text-white text-xl' />
                    </div>
                    <div className="border">
                        <div className="text-center ml-4 mb-4 mr-4 py-9 bg-base-200 h-[180px]">
                            <h2 className="text-2xl md:text-3xl font-semibold uppercase">
                                Phone
                            </h2>
                            <p className="text-lg mt-3 ">+880 17XX-XXXXXX</p>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="bg-yellow-600 py-4 px-4 flex items-center justify-center h-[52px]">
                        <FaLocationArrow className='text-white text-xl' />
                    </div>
                    <div className="border">
                        <div className="text-center ml-4 mb-4 mr-4 py-9 bg-base-200 h-[180px]">
                            <h2 className="text-2xl md:text-3xl font-semibold uppercase">
                                Address
                            </h2>
                            <p className="text-lg mt-3 ">123, ABC Road, Dhaka, Bangladesh</p>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="bg-yellow-600 py-4 px-4 flex items-center justify-center h-[52px]">
                        <BiSolidTime className='text-white text-2xl' />
                    </div>
                    <div className="border">
                        <div className="text-center ml-4 mb-4 mr-4 py-9 bg-base-200 h-[180px]">
                            <h2 className="text-2xl md:text-3xl font-semibold uppercase">
                                WORKING HOURS
                            </h2>
                            <p className="text-lg mt-3 ">Mon - Fri: 08:00 - 22:00</p>
                            <p className="text-lg mt- ">Sat - Sun: 10:00 - 23:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LocationPage;