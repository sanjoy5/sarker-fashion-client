import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2'

const CheckoutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuthContext()
    const [cardError, setCardError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])




    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
            setCardError(error.message)
        } else {
            setCardError('')
            // console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError);
        }
        console.log(paymentIntent);

        setProcessing(false)
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id)
            // Save payment info to the server 
            const payment = {
                transactionId: paymentIntent.id,
                email: user?.email,
                price,
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                productItems: cart.map(item => item.productItemId),
                productNames: cart.map(item => item.name),
                orderStatus: 'Pending',
                date: new Date()
            }
            axiosSecure.post('/payments', payment)
                .then(res => {

                    console.log('Payment : ', res.data.insertResult);
                    if (res.data.insertResult.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Payment Successfully Complete',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='w-full md:w-2/3 mx-auto px-4 paymentForm'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-warning mt-5' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
                {
                    cardError && <p className='text-red-500 mt-5'>{cardError}</p>
                }

                {
                    transactionId && <p className="text-green-500 mt-5">Transaction Complete with Transaction Id : {transactionId}</p>
                }
            </form>

        </>
    );
};

export default CheckoutForm;