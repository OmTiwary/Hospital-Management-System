import React, { useState } from 'react';
import { FaSearch, FaAmbulance } from 'react-icons/fa';
import './Doctors.css';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const doctorsList = [
    { id: 1, name: "Dr. M.J. Mical", specialization: "Health Checkup", availability: "Mon-Fri, 9AM-5PM" },
    { id: 2, name: "Dr. Sanath Deo", specialization: "Health Checkup", availability: "Mon-Wed, 10AM-4PM" },
    { id: 3, name: "Dr. Lokara Phanj", specialization: "Pediatrics", availability: "Tue-Sat, 8AM-2PM" },
    { id: 4, name: "Dr. Komola Haris", specialization: "Common Cold", availability: "Mon-Fri, 11AM-7PM" },
    { id: 5, name: "Dr. Maria Sarafat", specialization: "Cardiology", availability: "Wed-Sun, 9AM-6PM" },
    { id: 6, name: "Dr. Jhon Deo", specialization: "Orthopedics", availability: "Mon-Fri, 8AM-4PM" }
  ];

  const emergencyDoctors = [
    { id: 1, name: "Dr. Adam Scott", specialization: "Emergency", availability: "24/7" },
    { id: 2, name: "Dr. Emma Watson", specialization: "Emergency", availability: "24/7" },
    { id: 3, name: "Dr. Robert Chase", specialization: "Emergency", availability: "24/7" },
    { id: 4, name: "Dr. Sarah Connor", specialization: "Emergency", availability: "24/7" },
    { id: 5, name: "Dr. Tom Shelby", specialization: "Emergency", availability: "24/7" },
    { id: 6, name: "Dr. Amy Pond", specialization: "Emergency", availability: "24/7" }
  ];

  const filteredDoctors = doctorsList.filter(
    doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      {/* 🔎 Search Bar */}
      <div className="search-container">
        <p className="search-note">
          You can choose your doctor as per your need.
        </p>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search doctor or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      {/* 🩺 Doctor Cards */}
      <div className="doctor-cards">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-header">
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialization">{doctor.specialization}</p>
              </div>
            </div>
            <div className="doctor-details">
              <p className="doctor-availability">
                Availability: {doctor.availability}
              </p>
              <div className="doctor-actions">
                <button className="profile-button">View Profile</button>
                <button className="schedule-button">Schedule</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🚑 Emergency Doctors */}
      <h2 className="emergency-title">Emergency Doctors</h2>
      <div className="doctor-cards">
        {emergencyDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card emergency-card">
            <FaAmbulance className="emergency-icon" />
            <div className="doctor-info">
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-specialization">{doctor.specialization}</p>
              <p className="doctor-availability">
                Availability: {doctor.availability}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} All Rights Reserved. Powered by Abhishek Kumar.
      </footer>
    </div>
  );
};

export default Doctors;
