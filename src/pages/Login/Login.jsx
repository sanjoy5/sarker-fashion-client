import React, { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useAuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState('')
    const { signIn, googleSignIn } = useAuthContext()
    const navigate = useNavigate()
    const location = useLocation()


    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Login Successfuly',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true })

            })
            .catch(error => setError(error.message))

    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value) == true) {
            setDisabled(false)
        }

        else {
            setDisabled(true)
        }
    }

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
                <title>Login | Sarker Fashion</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center md:text-left w-full lg:w-1/2">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="card card-body w-full max-w-md shadow-2xl bg-base-100">
                            <form onSubmit={handleLogin} className="">
                                {
                                    error && <label className="label">
                                        <p className="my-2 text-red-500"><strong>Error</strong>: {error}</p>
                                    </label>
                                }
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder='Type the text above' className="input input-bordered" />

                                </div>
                                <div className="form-control mt-6">
                                    <input type='submit' className="btn text-white bg-yellow-600 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-700 rounded text-lg" disabled={disabled} value='Login' />
                                </div>
                                <p>New here? <Link className='text-blue-500' to='/signup'>Create an Account</Link></p>

                            </form>
                            <button onClick={handleGoogleSignIn} className="bg-white border py-2 w-full rounded-xl my-4 flex justify-center items-center hover:scale-105 duration-300 text-indigo-500">
                                <FcGoogle className='mr-3 text-3xl' />
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;