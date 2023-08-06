import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from '../../../assets/category/01.jpg'
import slide2 from '../../../assets/category/02.jpg'
import slide3 from '../../../assets/category/07.jpg'
import slide4 from '../../../assets/category/04.jpg'
import slide5 from '../../../assets/category/05.jpg'
import SectionTitle from '../../../components/SectionTilte/SectionTitle';
import { useEffect, useState } from 'react';

const Category = () => {
    const [slidesPerView, setSlidesPerView] = useState(4);

    useEffect(() => {
        function updateSlidesPerView() {
            if (window.innerWidth >= 1024) {
                // Large devices (screens wider than 1024 pixels)
                setSlidesPerView(4);
            } else if (window.innerWidth >= 768) {
                // Medium devices (screens wider than 768 pixels)
                setSlidesPerView(3);
            } else {
                // Mobile devices (smaller screens)
                setSlidesPerView(2);
            }
        }

        // Initial setup
        updateSlidesPerView();

        // Event listener to update slidesPerView on window resize
        window.addEventListener('resize', updateSlidesPerView);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateSlidesPerView);
        };
    }, []);


    return (
        <section className='mt-16 mb-26 mx-2'>
            <SectionTitle heading='Order Online' subheading='From 11.00 am to 10.00 pm' />

            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={30}
                centeredSlides={false}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >


                {/* <SwiperSlide>
                    <img className='mx-auto' src={slide1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='mx-auto' src={slide2} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='mx-auto' src={slide3} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='mx-auto' src={slide4} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='mx-auto' src={slide5} alt="" />
                </SwiperSlide> */}


                <SwiperSlide>
                    <div className="relative">
                        <img className='mx-auto' src={slide1} alt="" />
                        <h3 className="text-sm md:text-xl px-2 md:px-4 py-2 uppercase absolute z-10 bottom-6 left-1/2 whitespace-nowrap -translate-x-[50%] bg-white cursor-pointer">
                            Men's Wear
                        </h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img className='mx-auto' src={slide2} alt="" />
                        <h3 className="text-sm md:text-xl px-2 md:px-4 py-2 uppercase absolute z-10 bottom-6 left-1/2 whitespace-nowrap -translate-x-[50%] bg-white cursor-pointer">
                            Women's Wear
                        </h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img className='mx-auto' src={slide3} alt="" />
                        <h3 className="text-sm md:text-xl px-2 md:px-4 py-2 uppercase absolute z-10 bottom-6 left-1/2 whitespace-nowrap -translate-x-[50%] bg-white cursor-pointer">
                            Accessories
                        </h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img className='mx-auto' src={slide4} alt="" />
                        <h3 className="text-sm md:text-xl px-2 md:px-4 py-2 uppercase absolute z-10 bottom-6 left-1/2 whitespace-nowrap -translate-x-[50%] bg-white cursor-pointer">
                            Kids' Corner
                        </h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img className='mx-auto' src={slide5} alt="" />
                        <h3 className="text-sm md:text-xl px-2 md:px-4 py-2 uppercase absolute z-10 bottom-6 left-1/2 whitespace-nowrap -translate-x-[50%] bg-white cursor-pointer">
                            Footwear
                        </h3>
                    </div>
                </SwiperSlide>


            </Swiper>
        </section>
    );
};

export default Category;