import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import CallToAction from '../../../components/CallToAction/CallToAction';
import PopularProudcts from '../PopularProducts/PopularProudcts';
import Featured from '../Featured/Featured';
import Reviews from '../Reviews/Reviews';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | SarkerFashion</title>
            </Helmet>
            <Banner />
            <Category />
            <CallToAction />
            <PopularProudcts />
            <Featured />
            <Reviews />
        </>
    );
};

export default Home;