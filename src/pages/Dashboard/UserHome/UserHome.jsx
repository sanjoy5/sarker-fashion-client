import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTilte/SectionTitle';
import { useAuthContext } from '../../../Providers/AuthProvider';


const UserHome = () => {

    const { user } = useAuthContext()

    return (
        <div className='w-full  h-full py-10 px-5 md:px-10'>
            <Helmet>
                <title>Dashboard | Sarker Fashion</title>
            </Helmet>

            <SectionTitle heading='Profile' subheading='Here is Your' />

            <div className="flex flex-col items-center justify-center border py-14 px-5 shadow">
                <img src={user?.photoURL} className='w-24 md:w-32 h-24 md:h-32 rounded-full  border-4 border-yellow-600' alt="" />
                <h2 className="text-yellow-600 text-3xl font-semibold my-5">{user?.displayName}</h2>
                <p className="text-lg">{user?.email}</p>
            </div>

        </div>
    );
};

export default UserHome;