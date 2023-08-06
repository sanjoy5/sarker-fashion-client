import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../../components/Cover';
import coverBg from '../../../assets/banner/contact.jpg'
import SectionTitle from '../../../components/SectionTilte/SectionTitle';
import LocationPage from '../LocationPage/LocationPage';
import ContactForm from '../ContactForm/ContactForm';

const Contact = () => {
    return (
        <>
            <Helmet>
                <title>Contact | Sarker Fashion</title>
            </Helmet>
            <Cover img={coverBg} title='Contact us' subtitle='Reach out for assistance today!' />
            <SectionTitle heading="Our Location" subheading="visit us" />

            <LocationPage />

            <SectionTitle heading="Contact Form" subheading="Send Us a Message" />
            <ContactForm />

        </>
    );
};

export default Contact;