import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ActiveLink from '../ActiveLink';
import { useAuthContext } from '../../Providers/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';

const Navbar = () => {
    const { user, logOut } = useAuthContext()
    const [cart] = useCart()
    const [isAdmin] = useAdmin()

    const navOptions = <>
        <ActiveLink to='/'>Home</ActiveLink>
        <ActiveLink to='/products'>Products</ActiveLink>
        <ActiveLink to="/order/Men's Wear">Order</ActiveLink>
        <ActiveLink to="/contact">Contact</ActiveLink>
        {
            isAdmin ? <>
                <ActiveLink to="/dashboard/admin-home">Dashboard</ActiveLink>
            </> : <>
                <Link to='/dashboard/my-cart' className='flex items-center gap-1 mr-3'>
                    <FaShoppingCart className='text-2xl' />
                    <div className="badge badge-warning">+{cart?.length || 0}</div>
                </Link>
            </>
        }

    </>

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error.message))
    }

    return (
        <>
            <div className="navbar fixed bg-black text-white max-w-screen-xl mx-auto z-10 bg-opacity-30">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2 text-base text-gray-900 px-6 py-5">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to='/' className="">
                        <img src="/logo1.png" className='w-[180px]' alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-6 text-lg">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end h-full ">


                    {
                        user ? <>
                            <label className="btn btn-ghost btn-circle avatar mr-2 tooltip tooltip-bottom flex items-center" data-tip={user.displayName}>
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL} className='object-cover object-top' />
                                </div>
                            </label>
                            <button onClick={handleLogout} className="py-2 px-6 rounded bg-yellow-600 text-white hover:bg-yellow-700">Logout</button>
                        </>
                            : <> <Link to='/login' className="py-2 px-6 rounded bg-yellow-600 text-white hover:bg-yellow-700">Login</Link> </>
                    }

                </div>
            </div>
        </>
    );
};

export default Navbar;