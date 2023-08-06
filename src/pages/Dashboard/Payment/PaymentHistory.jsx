import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTilte/SectionTitle';

const PaymentHistory = () => {
    const { user } = useAuthContext()
    const [axiosSecure] = useAxiosSecure()

    const { data: paymentHistory = [] } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?email=${user?.email}`)
            return res.data
        }
    })

    // console.log('Payment history: ', paymentHistory);

    return (
        <div className='w-full  h-full py-10 px-5 md:px-10'>
            <Helmet>
                <title>Payment History | Sarker Fashion</title>
            </Helmet>
            <SectionTitle heading='Payment History' subheading="At a Glance" />

            <div className="h-16 flex items-center">
                <h3 className="text-3xl font-semibold uppercase">Total Payemnts : {paymentHistory?.length}</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-yellow-600 text-base text-white'>
                        <tr>
                            <th>SN</th>
                            <th>Transaction ID</th>
                            <th>Email</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentHistory.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment?.email} </td>
                                    <td>x{payment?.quantity} </td>
                                    <td>${payment?.price} </td>
                                    <td>{payment?.orderStatus} </td>
                                    <td>{payment?.date} </td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;