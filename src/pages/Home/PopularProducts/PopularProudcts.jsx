
import SectionTitle from '../../../components/SectionTilte/SectionTitle';
import ProductItems from '../../../components/ProductItems/ProductItems';
import useProducts from '../../../hooks/useProducts';

const PopularProudcts = () => {


    const [products, loading] = useProducts()
    const popular = products.filter(item => item.category === 'Popular')

    return (
        <>
            <SectionTitle heading='Popular Products' subheading='Check it out' />

            <div className="grid md:grid-cols-2 gap-10 px-3">
                {
                    popular.map(items => <ProductItems key={items._id} items={items} />)
                }
            </div>
            <div className="text-center mt-5">
                <button className="btn btn-outline mt-3 border-0 border-b-4 ">All Products</button>
            </div>
        </>
    );
};

export default PopularProudcts;