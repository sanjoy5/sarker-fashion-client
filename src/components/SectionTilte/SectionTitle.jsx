import React from 'react';

const SectionTitle = ({ heading, subheading }) => {
    return (
        <>
            <div className='max-w-[350px] md:w-4/12 mx-auto text-center mb-16'>
                <p className='text-yellow-600 capitalize'>--- {subheading} ---</p>
                <h3 className="text-2xl md:text-3xl font-semibold uppercase border-y-4 py-3 mt-4">{heading}</h3>
            </div>
        </>
    );
};

export default SectionTitle;