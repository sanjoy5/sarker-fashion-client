import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';


const Footer = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-end w-full mt-24">
                <div className="px-5 py-14 md:p-24 bg-[#1F2937] w-full md:w-1/2 flex justify-center md:justify-end text-center">
                    <div className="text-white  ">
                        <h3 className="text-3xl  font-semibold uppercase mb-6">
                            Contact us
                        </h3>
                        <p className="">123 ABS Street, Uni 21, Bangladesh</p>
                        <p className="">+88 123456789</p>
                        <p className="">Mon - Fri: 08:00 - 22:00</p>
                        <p className="">Sat - Sun: 10:00 - 23:00</p>
                    </div>
                </div>
                <div className="px-5 py-14 md:p-24 bg-[#111827] w-full md:w-1/2 flex justify-center md:justify-start">
                    <div className="text-white text-center">
                        <h3 className="text-3xl  font-semibold uppercase mb-6">
                            Follow us
                        </h3>
                        <p className="">Join us on social media</p>
                        <span className="flex items-center space-x-5 mt-6 justify-center cursor-pointer">
                            <FaFacebookF className='text-2xl' />
                            <FaInstagram className='text-2xl' />
                            <FaTwitter className='text-2xl' />
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-center p-4 text-white bg-[#1E1E1E]">
                Copyright &copy; Sanjoy Sarker. All rights reservered.
            </div>

        </>
    );
};

export default Footer;