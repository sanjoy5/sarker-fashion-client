import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTilte/SectionTitle';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateProducts = () => {
    const navigate = useNavigate()
    const updatedProduct = useLoaderData()
    // console.log(updatedProduct, '>>> updated Product');
    const [axiosSecure] = useAxiosSecure()
    const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {
        // console.log(data);
        if (data.image[0]) {
            const formData = new FormData()
            formData.append('image', data.image[0])

            fetch(img_hosting_url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imgResponse => {
                    if (imgResponse.success) {
                        const imgURL = imgResponse.data.display_url
                        const { name, category, price, description } = data
                        const newProduct = { name, category, description, price: parseFloat(price), image: imgURL }
                        console.log('new with image: ', newProduct);
                        axiosSecure.put(`/updated-product/${updatedProduct._id}`, newProduct)
                            .then(res => {
                                console.log(res);
                                if (res.data.modifiedCount > 0) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Product Updated Successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                                navigate('/dashboard/manage-products')
                            })
                    }
                })
        } else {
            const { name, category, price, description } = data
            const newProduct = { name, category, description, price: parseFloat(price), image: updatedProduct?.image }
            console.log('new: ', newProduct);
            axiosSecure.put(`/updated-product/${updatedProduct._id}`, newProduct)
                .then(res => {
                    console.log(res);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                    navigate('/dashboard/manage-products')
                })
        }

    }

    return (
        <div className='w-full  h-full py-10 px-5 md:px-10'>
            <Helmet>
                <title>Update Product | Sarker Fashion</title>
            </Helmet>
            <SectionTitle heading='Update a Product' subheading="Upgraded Product Selection" />

            <div className="px-5 pb-10 flex">
                <form onSubmit={handleSubmit(onSubmit)} className=" bg-base-200 rounded-lg p-6 md:p-12 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">

                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-base font-semibold text-gray-600">Product Name*</label>
                        <input type="text" id="name" defaultValue={updatedProduct?.name} {...register("name", { required: true, maxLength: 120 })} className="w-full bg-white rounded   text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-1" />
                        {errors.name && <span className='text-red-500 '>Product Name field is required</span>}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                        <div className="w-full md:w-1/2">
                            <label htmlFor="category" className="leading-7 text-base font-semibold text-gray-600">Category*</label>

                            <select defaultValue={updatedProduct?.category} {...register("category", { required: true })} id="category" className="w-full bg-white rounded   text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out mt-1">
                                <option >Men's Wear</option>
                                <option >Women's Wear</option>
                                <option >Accessories</option>
                                <option >Footwear</option>
                                <option >Kids' Corner</option>
                                <option >Offered</option>
                            </select>
                            {errors.category && <span className='text-red-500 '>Category is required</span>}
                        </div>
                        <div className="w-full md:w-1/2 ">
                            <label htmlFor="price" className="leading-7 text-base font-semibold text-gray-600">Price*</label>
                            <input type="number" id="price" defaultValue={updatedProduct?.price} {...register("price", { required: true })} className="w-full bg-white rounded   text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-1" />
                            {errors.price && <span className='text-red-500 '>Price field is required</span>}
                        </div>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="details" className="leading-7 text-base font-semibold text-gray-600">Product Details*</label>
                        <textarea id="details" defaultValue={updatedProduct?.description} {...register("description", { required: true })} className="w-full bg-white rounded  h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out mt-1"></textarea>
                        {errors.description && <span className='text-red-500 '>Details field is required</span>}
                    </div>

                    <div className="relative mb-5">

                        {updatedProduct?.image && <div className='flex items-center gap-2 mb-2'>
                            <img src={updatedProduct?.image} alt="Product Image" className='w-12 h-12' />
                            <span className='text-indigo-500 text-sm'>{updatedProduct?.image}</span>
                        </div>}

                        <input type="file" {...register("image")} className="inline text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out mt-1" />
                    </div>

                    <div>
                        <button type='submit' className=" py-2 px-6 rounded bg-yellow-600 text-white hover:bg-yellow-700">Update Product</button>
                    </div>

                </form>
            </div>

        </div>
    );
};

export default UpdateProducts;