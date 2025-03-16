import React from "react";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="row">
          <div className="col-4">
           
            <ul className="footer-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
            </ul>
          </div>
          <div className="col-4">
            
            <ul className="footer-links">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
            
            
          </div>
          <div className="col-4">
          <div className="social-icons">
              <a href="#">
                <i className="fa-brands fa-linkedin icon"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter icon"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-facebook icon"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
