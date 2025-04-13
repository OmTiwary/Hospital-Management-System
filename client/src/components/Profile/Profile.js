import React, { useState, useEffect } from 'react';
import './Profile.css';
import { FaUserEdit, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s');
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [memberSince, setMemberSince] = useState('');
  const [lastLogin, setLastLogin] = useState('');
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userProfile'));
    if (storedData) {
      setName(storedData.name);
      setEmail(storedData.email);
      setPhone(storedData.phone);
      setProfilePic(storedData.profilePic || profilePic);
      setMemberSince(storedData.memberSince);
    } else {
      const now = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      setMemberSince(now);
      localStorage.setItem('userProfile', JSON.stringify({
        name, email, phone, profilePic, memberSince: now
      }));
    }

    const nowLogin = new Date().toLocaleDateString('en-US', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    setLastLogin(nowLogin);
    localStorage.setItem('lastLogin', nowLogin);
  }, []);
  const handleUpdate = (e) => {
    e.preventDefault();
    setEditMode(false);
    const updatedData = {
      name,
      email,
      phone,
      profilePic,
      memberSince
    };
    localStorage.setItem('userProfile', JSON.stringify(updatedData));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src={profilePic} alt="Profile" className="profile-image" />
          <div className="profile-info">
            <h2>{name}</h2>
            <p><FaEnvelope /> {email}</p>
            <p><FaPhone /> {phone}</p>
            <p><FaMapMarkerAlt /> Mumbai, India</p>
          </div>
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            <FaUserEdit /> Edit Profile
          </button>
        </div>

        <div className="profile-details">
          <h3>About</h3>
          <p>
            Passionate healthcare user who loves tech and innovation. Managing appointments and accessing medical history has never been easier!
          </p>

          <h3>Account Information</h3>
          <ul>
            <li><strong>Member Since:</strong> {memberSince}</li>
            <li><strong>Last Login:</strong> {lastLogin}</li>
            <li><strong>Status:</strong> Active</li>
          </ul>
        </div>
      </div>

      {editMode && (
        <div className="modal-overlay">
          <div className="modal-form">
            <h3>Edit Profile</h3>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
            />
            <div className="form-buttons">
              <button className="save-btn" onClick={handleUpdate}>Save</button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
