import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li> 
          <li><Link to="/about">About</Link></li> 
          <li><Link to="/services">Services</Link></li> 
          <li><Link to="/contact">Contact</Link></li> 
          <li><Link to="/reviews">Reviews</Link></li> 
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
