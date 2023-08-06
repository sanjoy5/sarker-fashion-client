import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
    return (
        <div className='bg-base-200 py-5 px-5 md:py-14 md:px-16'>
            <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                    <div className="relative">
                        <label htmlFor="name" className="leading-7 text-base mb-1 font-semibold text-gray-600">Name*</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border-none text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter your name' required />
                    </div>
                </div>
                <div className="p-2 w-1/2">
                    <div className="relative">
                        <label htmlFor="email" className="leading-7 text-base mb-1 font-semibold text-gray-600">Email*</label>
                        <input type="email" id="email" name="email" className="w-full bg-whtie  rounded border-none text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter your email' required />
                    </div>
                </div>
                <div className="p-2 w-full">
                    <div className="relative">
                        <label htmlFor="text" className="leading-7 text-base mb-1 font-semibold text-gray-600">Phone*</label>
                        <input type="email" id="email" name="email" className="w-full bg-whtie  rounded border-none text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter your number' required />
                    </div>
                </div>
                <div className="p-2 w-full">
                    <div className="relative">
                        <label htmlFor="message" className="leading-7 text-base mb-1 font-semibold text-gray-600">Message*</label>
                        <textarea id="message" name="message" className="w-full bg-white  rounded border-none h-48 text-base outline-none text-gray-700 py-3 px-4 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder='Enter your message here' required></textarea>
                    </div>
                </div>
                <div className="p-2 w-full mt-2">
                    <button className="flex items-center justify-center gap-2 mx-auto text-white bg-yellow-600 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-700 rounded text-lg">Send Message <FaPaperPlane /> </button>
                </div>

            </div>
        </div>
    );
};

export default ContactForm;