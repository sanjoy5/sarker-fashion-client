import ProductCart from "../../../components/ProductCard/ProductCart";


const OrderTab = ({ items }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-10">
                {
                    items.map(item => <ProductCart key={item._id} item={item} />)
                }
            </div>
        </>
    );
};

export default OrderTab;