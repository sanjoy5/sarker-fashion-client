import React from 'react';
import ProductItems from '../components/ProductItems/ProductItems';
import Cover from '../components/Cover';
import { Link } from 'react-router-dom';

const ProductCategory = ({ productItems, coverImg, title, subtitle }) => {
    return (
        <section className='mt-16'>
            {title && subtitle && <Cover img={coverImg} title={title} subtitle={subtitle} />}
            <div className="grid md:grid-cols-2 gap-10 px-3 pb-4">
                {
                    productItems.map(items => <ProductItems key={items._id} items={items} />)
                }
            </div>
            {
                title === 'Offered' ? '' :
                    <Link to={`/order/${title}`}>
                        <div className="card-actions justify-center mt-3">
                            <button className="btn btn-outline border-yellow-600 text-yellow-600 hover:text-yellow-600 border-0 border-b-4 ">Order Now</button>
                        </div>
                    </Link>
            }
        </section>
    );
};

export default ProductCategory;