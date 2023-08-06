import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import { useAuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
    const { createUser, updateUser, googleSignIn } = useAuthContext()
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user

                updateUser(loggedUser, data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, photo: data.photoURL }

                        fetch('https://sarker-fashion-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then((data) => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User Register Successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/success')
                                }
                                // navigate(from, { replace: true })
                            })


                    })
                    .catch(error => setError(error.message))
            })
            .catch(error => setError(error.message))
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user

                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, photo: loggedInUser.photoURL }

                fetch('https://sarker-fashion-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })
                    })
            })
            .catch(error => setError(error.message))
    }


    return (
        <>
            <Helmet>
                <title>Sign Up | Sarker Fashion</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center md:text-left w-full lg:w-1/2">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="card card-body w-full max-w-md shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="">
                                {
                                    error && <label className="label">
                                        <p className="my-2 text-red-500"><strong>Error</strong>: {error}</p>
                                    </label>
                                }
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} name='name' placeholder="name" className="input input-bordered" />
                                    {errors.name && <span className='text-red-500 '>Name field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" {...register("photoURL", { required: true })} name='photoURL' placeholder="Photo URL" className="input input-bordered" />
                                    {errors.photoURL && <span className='text-red-500 '>Photo URL field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className='text-red-500 '>Email field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/
                                    })} name='password' placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === 'required' && <p className='text-red-500 '>Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className='text-red-500 '>Password must be 6 character</p>}
                                    {errors.password?.type === 'maxLength' && <p className='text-red-500 '>Password must be less than 20 character</p>}
                                    {errors.password?.type === 'pattern' && <p className='text-red-500 '>Password must be at least a symbol, upper and lower case letters and a number
                                    </p>}
                                </div>

                                <div className="form-control mt-6">
                                    <button type='submit' className="text-white bg-yellow-600 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-700 rounded text-lg" >Register</button>
                                </div>
                                <p>Already have an account? <Link className='text-blue-500' to='/login'>Login</Link></p>
                            </form>
                            <button onClick={handleGoogleSignIn} className="bg-white border py-2 w-full rounded-xl my-4 flex justify-center items-center hover:scale-105 duration-300 text-indigo-500">
                                <FcGoogle className='mr-3 text-3xl' />
                                Signup with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Signup;