import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import logo from '../components/asset/logo.png';
import doctorsImg from '../components/asset/doctors.jpg';
import doctors2Img from '../components/asset/doctors2.jpg';
import doctors4Img from '../components/asset/doctors4.jpg';
import doctors5Img from '../components/asset/doctors5.jpg';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo-container">
            <img src={logo} alt="Hospital Logo" className="logo" />
            <span className="logo-text">Xeno Health</span>
          </Link>
        </div>
        
        <div className="navbar-right">
          <ul className="nav-links">
            <li>
              <Link to="/medicine" className="nav-link">
                Medicine
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/appointment" className="nav-link">
                Appointment
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <h1>Get Better Care For
            Your <span className='health'>Health</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            <div className="hero-buttons">
              <Link to="/login" className="primary-btn">Login</Link>
              <Link to="/signup" className="secondary-btn">Sign Up</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src={doctorsImg} alt="Doctors Team" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-user-doctor"></i>
            </div>
            <h3>Expert Doctors</h3>
            <p>Access to qualified healthcare professionals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-pills"></i>
            </div>
            <h3>Quality Medicines</h3>
            <p>Certified medications and health supplies</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-calendar-check"></i>
            </div>
            <h3>Easy Appointments</h3>
            <p>Book and manage appointments effortlessly</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <h2>About Us</h2>
        <div className="about-us-grid">
          <div className="about-us-image">
            <img src={doctors2Img} alt="Medical Team" />
          </div>
          <div className="about-us-content">
            <h1>We Are Specialized in Medical Diagnostics</h1>
            <p>
              Our state-of-the-art diagnostic center is equipped with the latest technology and staffed by experienced healthcare professionals. We provide accurate, timely, and comprehensive diagnostic services to help physicians make informed decisions about patient care.
            </p>
            <p>
              From advanced imaging and laboratory tests to specialized screenings and preventive health assessments, our diagnostic services are designed to identify health concerns at their earliest, most treatable stages.
            </p>
            <p>
              We believe in a patient-centered approach, ensuring that each individual receives personalized care and attention throughout their diagnostic journey with us.
            </p>
          </div>
        </div>
      </section>

      {/* APPOINTMENT Section */}
      <section className="appointment-section">
        <div className="appointment-grid">
          <div className="appointment-image">
            <img src={doctors4Img} alt="Doctor with Patient" />
          </div>
          <div className="appointment-content">
            <span className="subtitle">APPOINTMENT</span>
            <h2><b>Make An Appointment<br />For Emergency</b></h2>
            <p>Our dedicated team of healthcare professionals is available for emergency consultations. Don't wait until it's too late - schedule your appointment now.</p>
            <Link to="/appointment" className="appointment-btn">
              Book Appointment Now
            </Link>
          </div>
        </div>
      </section>

      {/* NewsLetter Section */}
      <section className="newsletter-section">
        <div className="newsletter-grid">
          <div className="newsletter-content">
            <span className="subtitle">NEWSLETTER</span>
            <h2><b>Subscribe To Our<br />Newsletter</b></h2>
            <p>Stay updated with our latest medical services, health tips, and hospital news directly in your inbox.</p>
          </div>
          
          <div className="newsletter-form">
            <div className="form-group">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit" className="subscribe-btn">Subscribe</button>
            </div>
            <p className="privacy-note">We respect your privacy and will never share your email.</p>
          </div>
          
          <div className="newsletter-image">
            <img src={doctors5Img} alt="Medical Team" />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-top">
          <div className="footer-grid">
            <div className="footer-about">
              <div className="footer-logo">
                <img src={logo} alt="Xeno Health Logo" />
                <h2>Xeno Health</h2>
              </div>
              <p>Your trusted partner in healthcare, committed to providing exceptional medical services with compassion and expertise.</p>
              <div className="footer-quote">
                <FaQuoteLeft className="quote-icon" />
                <p>"The good physician treats the disease; the great physician treats the patient who has the disease."</p>
                <span className="quote-author">— William Osler</span>
              </div>
            </div>
            
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <FaArrowRight className="link-icon" />
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <FaArrowRight className="link-icon" />
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <FaArrowRight className="link-icon" />
                  <Link to="/services">Our Services</Link>
                </li>
                <li>
                  <FaArrowRight className="link-icon" />
                  <Link to="/doctors">Our Doctors</Link>
                </li>
                <li>
                  <FaArrowRight className="link-icon" />
                  <Link to="/appointment">Appointments</Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <p>123 Healthcare Avenue, Medical District, Bengaluru, India</p>
                </li>
                <li>
                  <FaPhoneAlt className="contact-icon" />
                  <p>+91 98765 43210</p>
                </li>
                <li>
                  <FaEnvelope className="contact-icon" />
                  <p>info@xenohealth.com</p>
                </li>
              </ul>
              
              <h3 className="social-heading">Follow Us</h3>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Xeno Health. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
