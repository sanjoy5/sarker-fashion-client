import { FaShoppingCart, FaWallet, FaShoppingBag, FaHome, FaBars, FaEdit, FaUsers, FaClipboardList } from "react-icons/fa";
import { MdAssignmentAdd, MdSystemUpdateAlt } from 'react-icons/md';
import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";



const Dashboard = () => {
    const [cart] = useCart()


    // const isAdmin = true
    const [isAdmin] = useAdmin()

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn text-white bg-yellow-600 hover:bg-yellow-700 drawer-button lg:hidden m-5"><FaBars className='text-xl' /></label>
                <Outlet />

            </div>
            <div className="drawer-side z-30">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-72 md:w-80 h-full text-base-content bg-[#D1A054]">
                    {/* Sidebar content here */}

                    <Link to='/'> <img src="/logo1.png" className="w-[200px] mx-auto mt-5 mb-6" alt="" /></Link>

                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/admin-home'><FaHome /> Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/add-product'><MdAssignmentAdd /> Add Products</NavLink></li>
                            <li><NavLink to='/dashboard/manage-products'><FaEdit /> Manage Products</NavLink></li>
                            <li><NavLink to='/dashboard/all-payment'><FaClipboardList /> All Payments</NavLink></li>
                            <li><NavLink to='/dashboard/all-users'><FaUsers /> All Users</NavLink></li>
                        </>
                            : <>
                                <li><NavLink to='/dashboard/user-home'><FaHome /> User Home</NavLink></li>
                                <li><NavLink to='/dashboard/payment-history'><FaWallet /> Payment History</NavLink></li>
                                <li><NavLink className='flex items-center' to='/dashboard/my-cart'><FaShoppingCart /> My Cart  <div className="badge badge-warning ml-2">+{cart?.length || 0}</div></NavLink></li>

                            </>
                    }


                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome />Home</NavLink></li>
                    <li><NavLink to='/products'><FaBars />Products</NavLink></li>
                    <li><NavLink to="/order/Men's Wear"><FaShoppingBag />Order Products</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;