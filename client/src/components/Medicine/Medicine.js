import React, { useState, useEffect } from 'react';
import './Medicine.css';
import { FaStar, FaStarHalfAlt, FaShoppingCart } from 'react-icons/fa';

import medicineImg1 from '../asset/Med1.jpg';
import medicineImg2 from '../asset/Med2.jpg';
import medicineImg3 from '../asset/Med3.jpg';

export default function Medicine() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState([]);

  const medicineSlider = [
    {
      id: 1,
      image: medicineImg1,
      title: "Antibiotics",
      description: "Used to treat bacterial infections by preventing bacteria from reproducing or by destroying them. Common conditions treated include strep throat, urinary tract infections, and certain types of pneumonia."
    },
    {
      id: 2,
      image: medicineImg2,
      title: "Pain Relievers",
      description: "Medications that reduce or relieve headaches, muscle aches, arthritis, or other aches and pains. Common types include NSAIDs (like ibuprofen), acetaminophen, and prescription opioids for severe pain."
    },
    {
      id: 3,
      image: medicineImg3,
      title: "Antihistamines",
      description: "These medicines block the action of histamine, a substance in the body that can cause allergy symptoms such as sneezing, itching, runny nose, and watery eyes. They're used to treat seasonal allergies and allergic reactions."
    }
  ];
  const medicineProducts = [
    {
      id: 1,
      image: medicineImg1,
      title: "Amoxicillin",
      description: "Broad-spectrum antibiotic used to treat various bacterial infections.",
      price: 12.99,
      rating: 4.5
    },
    {
      id: 2,
      image: medicineImg2,
      title: "Ibuprofen",
      description: "Non-steroidal anti-inflammatory drug (NSAID) used to relieve pain and reduce inflammation.",
      price: 8.49,
      rating: 4.7
    },
    {
      id: 3,
      image: medicineImg3,
      title: "Cetirizine",
      description: "Antihistamine used to relieve allergy symptoms such as runny nose, sneezing, and itchy eyes.",
      price: 9.99,
      rating: 4.3
    },
    {
      id: 4,
      image: medicineImg1,
      title: "Azithromycin",
      description: "Antibiotic used to treat various bacterial infections including respiratory infections.",
      price: 15.99,
      rating: 4.6
    },
    {
      id: 5,
      image: medicineImg2,
      title: "Acetaminophen",
      description: "Pain reliever and fever reducer used to treat mild to moderate pain and fever.",
      price: 7.99,
      rating: 4.8
    },
    {
      id: 6,
      image: medicineImg3,
      title: "Loratadine",
      description: "Non-drowsy antihistamine used to relieve allergy symptoms such as sneezing and runny nose.",
      price: 10.49,
      rating: 4.4
    }
  ];
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star-icon" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="star-icon" />);
    }

    return stars;
  };
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.title} added to cart!`);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => 
        prevSlide === medicineSlider.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, []);
  const goToNextSlide = () => {
    setCurrentSlide(prevSlide => 
      prevSlide === medicineSlider.length - 1 ? 0 : prevSlide + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide(prevSlide => 
      prevSlide === 0 ? medicineSlider.length - 1 : prevSlide - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="medicine-container">
      <h1 className="medicine-title">Popular Medicines</h1>
      <div className="medicine-slider">
        <button className="prev-btn slider-btn" onClick={goToPrevSlide}>&#10094;</button>
        
        {medicineSlider.map((item, index) => (
          <div 
            key={item.id} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="slide-image-container">
              <img src={item.image} alt={item.title} className="slide-image" />
            </div>
            <div className="slide-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
        
        <button className="next-btn slider-btn" onClick={goToNextSlide}>&#10095;</button>
        
        <div className="slider-dots">
          {medicineSlider.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentSlide ? 'active' : ''}`} 
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="medicine-info">
        <h2>About Our Medications</h2>
        <p>We provide high-quality medications from trusted pharmaceutical companies. Our pharmacy offers a wide range of prescription drugs, over-the-counter medicines, and health supplements to meet your healthcare needs.</p>
      </div>

      <div className="medicine-products-section">
        <h2>Our Products</h2>
        <div className="medicine-products-grid">
          {medicineProducts.map(product => (
            <div className="medicine-card" key={product.id}>
              <div className="medicine-card-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="medicine-card-content">
                <h3>{product.title}</h3>
                <div className="medicine-card-rating">
                  {renderRatingStars(product.rating)}
                  <span className="rating-text">({product.rating})</span>
                </div>
                <p className="medicine-card-description">{product.description}</p>
                <div className="medicine-card-footer">
                  <span className="medicine-card-price">₹{Math.round(product.price * 83).toLocaleString('en-IN')}</span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="pharmacy-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Prescription Medicines</a></li>
              <li><a href="#">OTC Products</a></li>
              <li><a href="#">Health Supplements</a></li>
              <li><a href="#">Ayurvedic Medicines</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Help & Support</h3>
            <ul className="footer-links">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Information</h3>
            <ul className="contact-info">
              <li><strong>Customer Care:</strong> +91 98765 43210</li>
              <li><strong>Prescription Help:</strong> +91 87654 32109</li>
              <li><strong>Emergency Line:</strong> +91 76543 21098</li>
              <li><strong>WhatsApp Support:</strong> +91 88888 77777</li>
              <li><strong>Email:</strong> support@medpharmacy.in</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Medical Helplines</h3>
            <ul className="contact-info">
              <li><strong>COVID-19 Helpline:</strong> 1075</li>
              <li><strong>Blood Bank:</strong> 1910</li>
              <li><strong>Ambulance:</strong> 108</li>
              <li><strong>Women's Helpline:</strong> 1091</li>
              <li><strong>Child Helpline:</strong> 1098</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Hospital Management System. All Rights Reserved.</p>
          <p>GST No: 29AABCU9603R1ZX | Drug License: KA-AL7-102932</p>
        </div>
      </footer>
    </div>
  );
}
