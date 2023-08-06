import React from 'react';
import SectionTitle from '../../../components/SectionTilte/SectionTitle';
import useProducts from '../../../hooks/useProducts';
import { Helmet } from 'react-helmet-async';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    const [products, , refetch] = useProducts()
    const [axiosSecure] = useAxiosSecure()



    const handleDelete = id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )
                        }
                    })


            }
        })
    }

    return (
        <div className='w-full  h-full py-10 px-0 md:px-10'>
            <Helmet>
                <title>Manage Products | Sarker Fashion</title>
            </Helmet>

            <SectionTitle heading='Manage All Items' subheading='Hurry Up' />

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-yellow-600 text-base text-white'>
                        <tr>
                            <th>SN</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product?.name} </td>
                                    <td>${product?.price} </td>

                                    <td>
                                        <Link to={`/dashboard/update-product/${product?._id}`} className="btn bg-yellow-500 hover:bg-yellow-600 text-white btn-md">
                                            <FaEdit className="text-xl" />
                                        </Link>
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(product._id)} className="btn bg-red-600 hover:bg-red-700 text-white btn-md"><FaTrashAlt className="text-lg" /></button>
                                    </th>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default ManageProducts;