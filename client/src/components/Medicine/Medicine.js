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
      description: "NSAID used to relieve pain and reduce inflammation.",
      price: 8.49,
      rating: 4.7
  },
  {
      id: 3,
      image: medicineImg3,
      title: "Cetirizine",
      description: "Antihistamine used to relieve allergy symptoms.",
      price: 9.99,
      rating: 4.3
  },
  {
      id: 4,
      image: medicineImg1,
      title: "Azithromycin",
      description: "Antibiotic used for bacterial infections, including respiratory infections.",
      price: 15.99,
      rating: 4.6
  },
  {
      id: 5,
      image: medicineImg2,
      title: "Acetaminophen",
      description: "Pain reliever and fever reducer.",
      price: 7.99,
      rating: 4.8
  },
  {
      id: 6,
      image: medicineImg3,
      title: "Loratadine",
      description: "Non-drowsy antihistamine for allergy relief.",
      price: 10.49,
      rating: 4.4
  },
  {
      id: 7,
      image: medicineImg1,
      title: "Metformin",
      description: "Used to control high blood sugar in type 2 diabetes.",
      price: 11.99,
      rating: 4.6
  },
  {
      id: 8,
      image: medicineImg2,
      title: "Atorvastatin",
      description: "Medication to lower cholesterol and triglyceride levels.",
      price: 14.99,
      rating: 4.5
  },
  {
      id: 9,
      image: medicineImg3,
      title: "Losartan",
      description: "Used to treat high blood pressure and protect the kidneys.",
      price: 13.49,
      rating: 4.7
  },
  {
      id: 10,
      image: medicineImg1,
      title: "Prednisone",
      description: "Corticosteroid used to reduce inflammation and suppress the immune system.",
      price: 16.99,
      rating: 4.3
  },
  {
      id: 11,
      image: medicineImg2,
      title: "Aspirin",
      description: "Pain reliever and blood thinner used to prevent heart attacks.",
      price: 5.99,
      rating: 4.9
  },
  {
      id: 12,
      image: medicineImg3,
      title: "Ciprofloxacin",
      description: "Antibiotic used to treat bacterial infections.",
      price: 18.99,
      rating: 4.5
  },
  {
      id: 13,
      image: medicineImg1,
      title: "Fexofenadine",
      description: "Non-drowsy antihistamine for seasonal allergies.",
      price: 10.99,
      rating: 4.6
  },
  {
      id: 14,
      image: medicineImg2,
      title: "Omeprazole",
      description: "Reduces stomach acid to treat acid reflux and ulcers.",
      price: 9.49,
      rating: 4.8
  },
  {
      id: 15,
      image: medicineImg3,
      title: "Clindamycin",
      description: "Antibiotic used to treat serious bacterial infections.",
      price: 17.99,
      rating: 4.4
  },
  {
      id: 16,
      image: medicineImg1,
      title: "Ranitidine",
      description: "Used to reduce stomach acid and treat GERD.",
      price: 8.99,
      rating: 4.2
  },
  {
      id: 17,
      image: medicineImg2,
      title: "Doxycycline",
      description: "Antibiotic used to treat infections and acne.",
      price: 14.99,
      rating: 4.7
  },
  {
      id: 18,
      image: medicineImg3,
      title: "Warfarin",
      description: "Blood thinner used to prevent blood clots.",
      price: 19.99,
      rating: 4.6
  },
  {
      id: 19,
      image: medicineImg1,
      title: "Hydrochlorothiazide",
      description: "Diuretic used to treat high blood pressure and fluid retention.",
      price: 12.49,
      rating: 4.5
  },
  {
      id: 20,
      image: medicineImg2,
      title: "Levothyroxine",
      description: "Thyroid hormone used to treat hypothyroidism.",
      price: 13.99,
      rating: 4.8
  },
  {
      id: 21,
      image: medicineImg3,
      title: "Fluconazole",
      description: "Antifungal medication used to treat yeast infections.",
      price: 11.99,
      rating: 4.7
  },
  {
      id: 22,
      image: medicineImg1,
      title: "Melatonin",
      description: "Supplement used to improve sleep quality.",
      price: 6.99,
      rating: 4.9
  },
  {
      id: 23,
      image: medicineImg2,
      title: "Albuterol",
      description: "Inhaler medication used to relieve asthma symptoms.",
      price: 20.99,
      rating: 4.6
  },
  {
      id: 24,
      image: medicineImg3,
      title: "Insulin",
      description: "Hormone used to control blood sugar levels in diabetes.",
      price: 25.99,
      rating: 4.9
  },
  {
      id: 25,
      image: medicineImg1,
      title: "Sertraline",
      description: "Antidepressant used to treat depression and anxiety disorders.",
      price: 15.49,
      rating: 4.5
  },
  {
      id: 26,
      image: medicineImg2,
      title: "Gabapentin",
      description: "Used to treat nerve pain and seizures.",
      price: 18.99,
      rating: 4.3
  },
  {
      id: 27,
      image: medicineImg3,
      title: "Simvastatin",
      description: "Medication to lower cholesterol levels.",
      price: 13.49,
      rating: 4.6
  },
  {
      id: 28,
      image: medicineImg1,
      title: "Bupropion",
      description: "Antidepressant and smoking cessation aid.",
      price: 17.49,
      rating: 4.5
  },
  {
      id: 29,
      image: medicineImg2,
      title: "Clonazepam",
      description: "Used to treat anxiety and panic disorders.",
      price: 14.99,
      rating: 4.4
  },
  {
      id: 30,
      image: medicineImg3,
      title: "Montelukast",
      description: "Used to manage asthma and allergy symptoms.",
      price: 12.99,
      rating: 4.7
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
