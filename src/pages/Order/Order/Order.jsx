import orderBg from '../../../assets/banner/order.jpg'
import Cover from '../../../components/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useProducts from '../../../hooks/useProducts';
import { useState } from 'react';
import './Order.css'
import ProductCart from '../../../components/ProductCard/ProductCart';
import OrderTab from '../OrderTab/OrderTab';

const Order = () => {
    const categories = ["Men's Wear", "Women's Wear", "Accessories", "Footwear", "Kids' Corner"]
    const { category } = useParams()
    const [products] = useProducts()

    const menswear = products.filter(item => item.category === "Men's Wear")
    const womanswear = products.filter(item => item.category === "Women's Wear")
    const accessories = products.filter(item => item.category === "Accessories")
    const footwear = products.filter(item => item.category === "Footwear")
    const kidscorner = products.filter(item => item.category === "Kids' Corner")
    const offered = products.filter(item => item.category === "Offered")

    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);

    return (
        <>
            <Helmet>
                <title>Order | Sarker Fashion</title>
            </Helmet>
            <Cover img={orderBg} title='Order Now' subtitle='Your One-Stop Shopping Destination!' />

            <div className="pb-16 text-center">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Men's Wear</Tab>
                        <Tab>Women's Wear</Tab>
                        <Tab>Accessories</Tab>
                        <Tab>Footwear</Tab>
                        <Tab>Kids' Corner</Tab>
                        <Tab>Offered</Tab>
                    </TabList>
                    <TabPanel>
                        <OrderTab items={menswear}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={womanswear}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={accessories}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={footwear}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={kidscorner}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={offered}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
};

export default Order;