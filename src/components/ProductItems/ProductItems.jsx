import React from 'react';

const ProductItems = ({ items }) => {

    const { name, image, price, description } = items;

    return (
        <div className='flex flex-col sm:flex-row space-y-3 space-x-4'>
            <img style={{ borderRadius: "0 200px 200px 200px" }} src={image} className='w-[100px] h-[100px] border' alt="" />
            <div className="">
                <h3 className="uppercase mb-1">{name} -----------</h3>
                <p className="">{description.slice(0, 100)}...</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default ProductItems;