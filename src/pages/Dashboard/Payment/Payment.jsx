import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTilte/SectionTitle';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useCart from '../../../hooks/useCart';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
const Payment = () => {

    const [cart] = useCart()
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    const price = parseFloat(total.toFixed(2))
    return (
        <div className='w-full  h-full py-10 px-5 md:px-10'>
            <Helmet>
                <title>Payment | Sarker Fashion</title>
            </Helmet>

            <SectionTitle heading='Payment' subheading='Please Process' />
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price} cart={cart} />
            </Elements>

        </div>
    );
};

export default Payment;