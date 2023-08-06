import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
    return (
        <>
            <div className="divider"></div>
            <div className="w-full text-center">
                <button className="btn btn-circle btn-outline">
                    <FaGoogle />
                </button>
            </div>
        </>
    );
};

export default SocialLogin;