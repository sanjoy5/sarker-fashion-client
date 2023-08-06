import React from 'react';
import { useAuthContext } from '../../../Providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, ResponsiveContainer, Legend } from 'recharts';
import { FaChartLine, FaRocket, FaTasks, FaUsers } from 'react-icons/fa';


const AdminHome = () => {
    const { user } = useAuthContext()
    const [axiosSecure] = useAxiosSecure()
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats')
            return res.data
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['chart-data'],
        queryFn: async () => {
            const res = await axiosSecure('/order-stats')
            return res.data
        }
    })


    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='w-full  h-full py-10 px-5 md:px-10'>
            <Helmet>
                <title>Dashboard | Sarker Fashion</title>
            </Helmet>

            <h2 className="text-2xl md:text-3xl font-semibold uppercase">Hi {user?.displayName}, Welcome Back</h2>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-4">
                <div className="flex items-center justify-between border rounded p-4">
                    <div className="">
                        <p className="text-lg">Revenue</p>
                        <h2 className="text-2xl md:text-4xl font-bold mt-2">${stats.revenue}</h2>
                    </div>
                    <div className="">
                        <FaChartLine className='text-2xl text-yellow-600' />
                    </div>
                </div>
                <div className="flex items-center justify-between border rounded p-4">
                    <div className="">
                        <p className="text-lg">New Users</p>
                        <h2 className="text-2xl md:text-4xl font-bold mt-2">{stats.users}</h2>
                    </div>
                    <div className="">
                        <FaUsers className='text-3xl text-yellow-600' />
                    </div>
                </div>
                <div className="flex items-center justify-between border rounded p-4">
                    <div className="">
                        <p className="text-lg">Products</p>
                        <h2 className="text-2xl md:text-4xl font-bold mt-2">{stats.products}</h2>
                    </div>
                    <div className="">
                        <FaRocket className='text-2xl text-yellow-600' />
                    </div>
                </div>
                <div className="flex items-center justify-between border rounded p-4">
                    <div className="">
                        <p className="text-lg">Orders</p>
                        <h2 className="text-2xl md:text-4xl font-bold mt-2">{stats.orders}</h2>
                    </div>
                    <div className="">
                        <FaTasks className='text-2xl text-yellow-600' />
                    </div>
                </div>

            </div>

            <div className="flex flex-col md:flex-row mt-10 items-center gap-5">
                <div className="w-11/12 md:w-1/2 h-[300px] border shadow py-5 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Bar dataKey="total" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-11/12 md:w-1/2 h-[300px] border shadow py-5  flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Legend></Legend>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="count"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell name={entry?.category} key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>


        </div>
    );
};

export default AdminHome;