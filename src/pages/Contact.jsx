import React, { useState } from 'react';
import '../App.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Import contact icons
import favicon from '../assets/favicon.png'; // Import the favicon
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isMessageSent, setIsMessageSent] = useState(false);

    const { name, email, message } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://encome.onrender.com/api/contact', formData);

            if (res.status === 200) {
                setIsMessageSent(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setIsMessageSent(false), 5000);
            }
        } catch (err) {
            console.error('Failed to send message.', err);
        }
    };

    return (
        <div className="container contact-us-container">
            <img src={favicon} alt="Company Logo" className="contact-us-logo" />
            <h1>Contact Us</h1>
            <p className="contact-us-intro">
                We'd love to hear from you! Whether you have a question about our products,
                need assistance with an order, or just want to give us feedback, feel free to reach out.
            </p>

            <section className="contact-us-section">
                <h2>Get in Touch</h2>
                <div className="contact-info-item">
                    <FaPhone size={25} className="contact-icon" />
                    <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                </div>
                <div className="contact-info-item">
                    <FaEnvelope size={25} className="contact-icon" />
                    <p><strong>Email:</strong> <a href="mailto:support@shinex.com">support@shinex.com</a></p>
                </div>
                <div className="contact-info-item">
                    <FaMapMarkerAlt size={25} className="contact-icon" />
                    <p><strong>Address:</strong> 123 E-commerce Street, Suite 456, Tech City, TC 78901</p>
                </div>
            </section>

            <section className="contact-us-section">
                <h2>Send Us a Message</h2>
                {isMessageSent && <div className="alert alert-success">Message sent successfully!</div>}
                <form className="contact-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea id="message" name="message" value={message} onChange={onChange} rows="5" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary-custom">Send Message</button>
                </form>
            </section>
        </div>
    );
};

export default Contact;