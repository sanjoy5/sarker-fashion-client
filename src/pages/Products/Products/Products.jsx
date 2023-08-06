import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../../components/Cover';
import bannerImg from '../../../assets/banner/productbg.jpg'
import mensBg from '../../../assets/banner/manswear.jpg'
import womansBg from '../../../assets/banner/womanwear.jpg'
import accessoriesbg from '../../../assets/banner/accessories.jpg'
import footwearBg from '../../../assets/banner/footwear.jpg'
import kidsBg from '../../../assets/banner/kids.jpg'
import useProducts from '../../../hooks/useProducts';
import SectionTitle from '../../../components/SectionTilte/SectionTitle';
import ProductCategory from '../../../ProductCategory/ProductCategory';


const Products = () => {

    const [products, loading] = useProducts()
    const menswear = products.filter(item => item.category === "Men's Wear")
    const womanswear = products.filter(item => item.category === "Women's Wear")
    const accessories = products.filter(item => item.category === "Accessories")
    const footwear = products.filter(item => item.category === "Footwear")
    const kidscorner = products.filter(item => item.category === "Kids' Corner")
    const offered = products.filter(item => item.category === "Offered")

    return (
        <>
            <Helmet>
                <title>Products | SarkerFashion</title>
            </Helmet>

            {/* Main Cover  */}
            <Cover img={bannerImg} title='Our Products' subtitle='Quality products. Unbeatable prices.!' />

            <SectionTitle heading="Today's Offer" subheading="Don't Miss" />
            {/* Offered Product Items  */}
            <ProductCategory productItems={offered} title={'Offered'} />
            {/* Men's Wear Product items  */}
            <ProductCategory productItems={menswear} coverImg={mensBg} title="Men's Wear" subtitle="Stylish Men's Fashion. Shop Now!" />
            {/* Women's Wear Product items  */}
            <ProductCategory productItems={womanswear} coverImg={womansBg} title="Women's Wear" subtitle="Chic Women's Fashion. Shop Now!" />
            {/* Accessories Product items  */}
            <ProductCategory productItems={accessories} coverImg={accessoriesbg} title="Accessories" subtitle="Trendy Accessories. Shop Now!" />
            {/* Footwear Product items  */}
            <ProductCategory productItems={footwear} coverImg={footwearBg} title="Footwear" subtitle="Stylish Footwear. Shop Now!" />
            {/* Kids' Corner Product items  */}
            <ProductCategory productItems={kidscorner} coverImg={kidsBg} title="Kids' Corner" subtitle="Adorable Kids' Collection. Shop Now!" />


        </>
    );
};

export default Products;