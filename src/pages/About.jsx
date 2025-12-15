import React from 'react';
import '../App.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Import social media icons
import favicon from '../assets/favicon.png'; // Import the favicon

const About = () => {
    return (
        <div className="container about-us-container">
            <img src={favicon} alt="Company Logo" className="about-us-logo" />
            <h1>About ShineX</h1>
            <p className="about-us-intro">
                Welcome to ShineX, your ultimate destination for high-quality products and an unparalleled shopping experience.
                We are passionate about bringing you the best, carefully curated items that meet your needs and exceed your expectations.
            </p>

            <section className="about-us-section">
                <h2>Our Mission</h2>
                <p>
                    Our mission at ShineX is to provide our customers with a seamless and enjoyable online shopping journey.
                    We strive to offer a diverse range of products, exceptional customer service, and competitive prices,
                    all while fostering a community built on trust and satisfaction.
                </p>
            </section>

            <section className="about-us-section">
                <h2>Our Vision</h2>
                <p>
                    We envision ShineX as a leading e-commerce platform, recognized for its commitment to quality,
                    innovation, and customer-centric approach. We aim to continuously expand our product offerings
                    and enhance our services to cater to the evolving demands of our valued customers worldwide.
                </p>
            </section>

            <section className="about-us-section">
                <h2>What We Offer</h2>
                <ul>
                    <li><strong>Quality Products:</strong> We meticulously select each product to ensure it meets our high standards of quality and durability.</li>
                    <li><strong>Exceptional Service:</strong> Our dedicated customer support team is always ready to assist you with any queries or concerns.</li>
                    <li><strong>Secure Shopping:</strong> Your privacy and security are our top priorities. We use advanced encryption to protect your personal and payment information.</li>
                    <li><strong>Fast & Reliable Shipping:</strong> We partner with trusted shipping providers to ensure your orders arrive safely and on time.</li>
                </ul>
            </section>

            <section className="about-us-section">
                <h2>Our Story</h2>
                <p>
                    ShineX was founded in 2025 by a team of e-commerce enthusiasts who believed in creating a platform
                    where customers could easily find and purchase high-quality products. From humble beginnings, we have grown into a thriving online store, serving thousands of happy customers. Our journey has been driven by a passion for excellence and a commitment to our customers.
                </p>
            </section>

            <section className="about-us-section">
                <h2>Connect With Us</h2>
                <p>
                    We love to hear from our customers! Follow us on social media, subscribe to our newsletter,
                    or reach out to our customer support team. Your feedback helps us grow and improve.
                </p>
                <div className="social-media-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} /></a>
                </div>
            </section>
        </div>
    );
};

export default About;