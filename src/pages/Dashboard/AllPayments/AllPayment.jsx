import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTilte/SectionTitle';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllPayment = () => {


    const [axiosSecure] = useAxiosSecure()

    const { data: allPayment = [] } = useQuery({
        queryKey: ['all-payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-payment`)
            return res.data
        }
    })



    return (
        <div className='w-full  h-full py-10 px-5 md:px-10'>
            <Helmet>
                <title>All Payments | Sarker Fashion</title>
            </Helmet>
            <SectionTitle heading='All Payments' subheading="At a Glance" />


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
                            allPayment.map((payment, index) => (
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

export default AllPayment;