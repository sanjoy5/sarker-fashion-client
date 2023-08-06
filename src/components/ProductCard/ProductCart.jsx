import React from 'react';
import { useAuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';


const ProductCart = ({ item }) => {
    const { name, image, price, description, _id } = item;
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const [, refetch] = useCart()

    const location = useLocation()
    const [isAdmin] = useAdmin()



    const handleAddToCart = item => {
        // console.log(item);
        if (isAdmin) {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: "Admin Can't add product",
                showConfirmButton: false,
                timer: 1500
            })
        } else {

            if (user && user.email) {
                const cartItem = { productItemId: _id, name, image, price, email: user.email, }
                fetch('https://sarker-fashion-server.vercel.app/carts', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(cartItem)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            refetch()
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Product added on the Cart',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
            } else {
                Swal.fire({
                    title: 'Please Login',
                    text: "You have Login to order Products!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Login'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login', { state: { from: location } })
                    }
                })
            }
        }
    }

    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} className='h-full max-h-[250px] w-auto object-cover object-center' alt="Shoes" /></figure>
                <p className="absolute top-5 right-5 px-2 py-1 bg-slate-900 text-white">${price}</p>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p className='text-start'>{description}</p>
                    <div className="card-actions justify-center mt-3">
                        <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-yellow-600 text-yellow-600 hover:text-yellow-600 border-0 border-b-4 ">Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCart;