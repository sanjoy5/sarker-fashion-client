import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTilte/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft } from 'react-icons/fa';

const Reviews = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('https://sarker-fashion-server.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <section className='mt-16 md:mt-24'>
            <SectionTitle heading='Client Reviews' subheading='What our clients say' />


            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => (
                        <SwiperSlide key={review._id}>
                            <div className="my-16 mx-5 md:mx-24 flex flex-col items-center">

                                <Rating
                                    style={{ maxWidth: 160 }}
                                    value={review.rating}
                                    readOnly
                                />

                                <FaQuoteLeft className='mt-6 text-4xl md:text-6xl' />

                                <p className='py-6 text-center'>{review.details}</p>
                                <h3 className="text-2xl text-orange-400">{review.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))
                }


            </Swiper>

        </section>
    );
};

export default Reviews;