import React, { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile() {
  const defaultData = {
    name: 'Admin John',
    email: 'admin@example.com',
    phone: '+91 9876543210',
    joined: 'March 10, 2023',
    status: 'Active',
    role: 'Super Admin',
    location: 'Mumbai, India',
    gender: 'Male',
    dob: '1985-05-20',
    department: 'IT Administration',
    lastLogin: 'April 13, 2025, 10:45 PM',
    image: 'https://i.pravatar.cc/150?img=5',
  };

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('adminProfile');
    return saved ? JSON.parse(saved) : defaultData;
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    localStorage.setItem('adminProfile', JSON.stringify(profile));
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setProfile(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src={profile.image} alt="Profile" className="profile-img" />
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <p>{profile.phone}</p>
            <span className={`status ${profile.status.toLowerCase()}`}>● {profile.status}</span>
          </div>
          <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
        </div>

        <div className="profile-details">
          <div><strong>Joined:</strong> {profile.joined}</div>
          <div><strong>Role:</strong> {profile.role}</div>
          <div><strong>Location:</strong> {profile.location}</div>
          <div><strong>Status:</strong> {profile.status}</div>
          <div><strong>Gender:</strong> {profile.gender}</div>
          <div><strong>DOB:</strong> {profile.dob}</div>
          <div><strong>Department:</strong> {profile.department}</div>
          <div><strong>Last Login:</strong> {profile.lastLogin}</div>
          <div><strong>Employee ID:</strong> EMP230145</div>
          <div><strong>Blood Group:</strong> B+ve</div>
          <div><strong>Marital Status:</strong> Married</div>
          <div><strong>Nationality:</strong> Indian</div>
          <div><strong>PAN No:</strong> BZOPK1234F</div>
          <div><strong>Aadhaar No:</strong> 1234-5678-9012</div>
          <div><strong>Emergency Contact:</strong> Rahul Mishra - +91 9001234567</div>
          <div><strong>Reporting Manager:</strong> Mr. Rajeev Mehta</div>
          <div><strong>Official Email:</strong> admin.john@xenohealth.in</div>
          <div><strong>Work Shift:</strong> 9:00 AM - 6:00 PM</div>
          <div><strong>Languages Known:</strong> English, Hindi, Marathi</div>
          <div><strong>Projects Assigned:</strong> HealthSync, eMedTrack</div>
          <div><strong>System Access:</strong> Full Admin</div>
        </div>
      </div>

      {editMode && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Profile</h3>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
            <input type="file" onChange={handleImageChange} />
            <div className="modal-buttons">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
