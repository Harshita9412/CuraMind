import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './landing_page/home/HomePage';  
import Navbar from './landing_page/Navbar';
import Services from './landing_page/services/Services';
import Features from './landing_page/services/Features';
import About from './landing_page/about/About';
import './App.css';
import Contact from './landing_page/contact/Contact';
import Review from "./landing_page/reviews/Reviews";
import Footer from './landing_page/Footer';

function App() {
  return (
    <Router basename="/CuraMind">
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/services" element={<Services />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Review />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
