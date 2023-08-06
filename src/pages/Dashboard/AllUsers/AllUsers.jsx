import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useAuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const { user } = useAuthContext()
    const [axiosSecure] = useAxiosSecure()

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data
    })

    const handleMakeAdmin = id => {
        fetch(`https://sarker-fashion-server.vercel.app/users/admin/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Made Admin Successfuly',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }


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
                fetch(`https://sarker-fashion-server.vercel.app/users/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
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
        <div className='w-full h-full py-10 px-5 md:px-10'>
            <Helmet>
                <title>All Users | Sarker Fashion</title>
            </Helmet>

            <div className="h-16 flex items-center">
                <h3 className="text-3xl font-semibold uppercase">Total Users : {users.length}</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-yellow-600 text-base text-white'>
                        <tr>
                            <th>SN</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((row, index) => (
                                <tr key={row._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={row?.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{row?.name} </td>
                                    <td>{row?.email} </td>

                                    <td>

                                        {row?.role === 'admin' ? <p className='text-green-500 text-lg'>Admin</p> :
                                            <button onClick={() => handleMakeAdmin(row._id)} className="btn bg-yellow-500 hover:bg-yellow-600 text-white btn-md">
                                                <FaUserShield className="text-2xl" />
                                            </button>
                                        }

                                    </td>
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

export default AllUsers;