import {
    createBrowserRouter,
} from "react-router-dom"
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Products from "../pages/Products/Products/Products";
import Order from "../pages/Order/Order/Order";
import Contact from "../pages/Contact/Contact/Contact";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Success from "../pages/Success/Success";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddProducts from "../pages/Dashboard/AddProducts/AddProducts";
import AdminRoute from "./AdminRoute";
import ManageProducts from "../pages/Dashboard/ManageProducts/ManageProducts";
import UpdateProducts from "../pages/Dashboard/UpdateProducts/UpdateProducts";
import Payment from "../pages/Dashboard/Payment/Payment";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import AllPayment from "../pages/Dashboard/AllPayments/AllPayment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/order/:category',
                element: <Order />
            },
            {
                path: '/contact',
                element: <Contact />
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute> <Dashboard /></PrivateRoute>,
        children: [
            {
                path: 'user-home',
                element: <UserHome />
            },
            {
                path: 'my-cart',
                element: <MyCart />
            },
            {
                path: 'payment',
                element: <Payment />
            },
            {
                path: 'all-payment',
                element: <AllPayment />
            },
            {
                path: 'payment-history',
                element: <PaymentHistory />
            },
            {
                path: 'admin-home',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: 'add-product',
                element: <AdminRoute><AddProducts /></AdminRoute>
            },
            {
                path: 'manage-products',
                element: <AdminRoute><ManageProducts /></AdminRoute>
            },
            {
                path: 'update-product/:id',
                element: <AdminRoute><UpdateProducts /></AdminRoute>,
                loader: ({ params }) => fetch(`https://sarker-fashion-server.vercel.app/updated-product/${params.id}`)
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    }, {
        path: '/success',
        element: <Success />
    }
]);

export default router;