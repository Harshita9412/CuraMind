import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about-container">
            <header className="header">
                <h1>About Us</h1>
                <p>Your mental health matters, and we're here to listen.</p>
            </header>

            <div className="content">
                <section className="mission">
                    <h2>Our Mission</h2>
                    <p>At AI Counseling, our mission is to provide accessible, confidential, and personalized support to individuals struggling with mental health. Whether you're a student facing academic pressure, or someone experiencing depression, we are here to support you on your journey to well-being.</p>
                </section>
                
                <section className="vision">
                    <h2>Our Vision</h2>
                    <p>We aim to create a world where mental health support is available to anyone, anytime, with the assistance of AI-powered counseling. Our goal is to reduce the stigma around mental health and make therapy accessible, affordable, and effective for everyone.</p>
                </section>
                
                <section className="team">
                    <h2>Our Team</h2>
                    <p>Our AI-powered system is designed and maintained by a team of expert psychologists, mental health professionals, and technologists. We work tirelessly to ensure the most accurate, reliable, and empathetic counseling experience for you.</p>
                </section>
            </div>
        </div>
    );
}

export default About;
