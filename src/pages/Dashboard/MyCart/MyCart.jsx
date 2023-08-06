import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";


const MyCart = () => {
    const [cart, refetch] = useCart()
    const total = cart?.reduce((sum, item) => item.price + sum, 0)

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
                fetch(`https://sarker-fashion-server.vercel.app/carts/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })

    }

    return (
        <div className="w-full  h-full py-10 px-5 md:px-10">

            <Helmet>
                <title>Cart | Sarker Fashion</title>
            </Helmet>

            <div className="h-16 flex flex-col md:flex-row items-center justify-between font-semibold mb-12">
                <h3 className="text-2xl mdtext-3xl uppercase">Total Items: {cart.length}</h3>
                <h3 className="text-2xl mdtext-3xl uppercase">Total Price: ${total.toFixed(2)}</h3>
                <Link to='/dashboard/payment' className="btn btn-warning btn-sm">PAY</Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-yellow-600 text-base text-white'>
                        <tr>
                            <th>SN</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((row, index) => (
                                <tr key={row._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={row.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{row.name} </td>
                                    <td >${(row.price).toFixed(2)}</td>
                                    <th>
                                        <button onClick={() => handleDelete(row._id)} className="btn bg-red-600 hover:bg-red-700 text-white btn-md"><FaTrashAlt className="text-lg" /></button>
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

export default MyCart;