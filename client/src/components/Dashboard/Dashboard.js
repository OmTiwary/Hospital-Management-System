import React, { useState, useEffect } from 'react'
import './Dashboard.css'

import { Bar, Line } from 'react-chartjs-2';

import pat1 from '../asset/pat1.avif';
import pat2 from '../asset/pat2.avif';
import pat3 from '../asset/pat3.jpg';
import pat4 from '../asset/pat4.avif';
import pat5 from '../asset/pat5.avif';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement
);

export default function Dashboard() {
  const [appointmentData, setAppointmentData] = useState({
    labels: ['', '', '', '', '', '', '', '', '', ''],
    datasets: [{
      label: "Appointments",
      data: [800, 1200, 520, 900, 750, 1800, 1100, 1450, 300, 2100],
      backgroundColor: 'orange',
    }]
  });

  useEffect(() => {
    // Get appointments from localStorage
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      const parsedAppointments = JSON.parse(savedAppointments);
      
      // Generate random data for the bar chart
      const randomData = Array(10).fill().map(() => 
        Math.floor(Math.random() * 2000) + 500
      );
      
      // Update appointment data
      setAppointmentData({
        labels: ['', '', '', '', '', '', '', '', '', ''],
        datasets: [{
          label: "Appointments",
          data: randomData,
          backgroundColor: 'orange',
        }]
      });
    }
  }, []);

  const patientData = {
    labels: ['', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: "Patients",
        data: [1200, 1500, 420, 800, 650, 2000, 1000, 1350, 200, 2300],
        backgroundColor: 'blue',
      },
    ],
  };

  const prescriptions = {
    labels: ['', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: "Prescriptions",
        data: [200, 500, 4220, 1000, 1050, 200, 2380, 1350, 2000, 300],
        backgroundColor: '#63E6BE',
      },
    ],
  };

  const growth = {
    labels: ['', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: "Growth",
        data: [1200, 1500, 1220, 4000, 6050, 7000, 7235, 7350, 8000, 10300],
        backgroundColor: 'red',
      },
    ],
  };

  const curedPatients = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: "ICU Patients",
        data: [500, 3000, 900, 4500, 1600, 6000, 2500, 7000, 2890, 1000, 8000, 1200],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "General Ward",
        data: [800, 1200, 1300, 5500, 1900, 6800, 2700, 8500, 3700, 2000, 9000, 5000],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Home Treatment",
        data: [600, 4000, 1100, 3800, 1800, 5000, 2600, 9500, 3500, 800, 7200, 3500],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Surgery",
        data: [400, 5000, 800, 3000, 1300, 9000, 2000, 7500, 2900, 4200, 10000, 3400],
        borderColor: 'purple',
        backgroundColor: 'rgba(128, 0, 128, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Others",
        data: [300, 2500, 700, 6000, 1100, 7300, 1800, 5000, 2600, 2000, 8000, 2200],
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 10000,
      easing: 'linear',
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const doctors = [
    { id: 1, name: "Ayush Mishra", role: "Cardiologist", image: pat1, time: "2:20PM" },
    { id: 2, name: "Abhishek", role: "General Physician", image: pat2, time: "3:15PM" },
    { id: 3, name: "Om", role: "Pediatrician", image: pat3, time: "4:10PM" },
    { id: 4, name: "Manjit", role: "Neurologist", image: pat4, time: "5:05PM" },
    { id: 5, name: "Keshav", role: "Gastroenterologist", image: pat5, time: "6:30PM" },
  ];
  return (
    <>
      <div className="nav">
        <input type="search" name="search" id="search" placeholder='Search "Doctor" ' required autoComplete='off' />
        <h4>Ayush Mishra</h4>
      </div>

      <div className="box">
        <div className="box1">
          <div className="layout">
            <span>
              <i className="fa-regular fa-user" style={{ color: "#63E6BE" }}></i>
            </span>
            <h3>Total Patient</h3>
          </div>
          <div className="data">
            <Bar data={patientData} options={options} />
          </div>
        </div>
        <div className="box2">
          <div className="layout">
            <span>
              <i className="fa-solid fa-calendar-check" style={{ color: "#63E6BE" }}></i>
            </span>
            <h3>Total Appointments</h3>
          </div>
          <div className="data">
            <Bar data={appointmentData} options={options} />
          </div>
        </div>
        <div className="box3">
          <div className="layout">
            <span>
              <i className="fa-solid fa-file-prescription" style={{ color: "#63E6BE" }}></i>
            </span>
            <h3>Total Prescriptions</h3>
          </div>
          <div className="data">
            <Bar data={prescriptions} options={options} />
          </div>
        </div>
        <div className="box4">
          <div className="layout">
            <span>
              <i className="fa-solid fa-arrow-up-right-dots" style={{ color: "#63E6BE" }}></i>
            </span>
            <h3>Total Growth</h3>
          </div>
          <div className="data">
            <Bar data={growth} options={options} />
          </div>
        </div>

        <div className="cure">
          <div className="layout">
            <span>
              <i className="fa-solid fa-notes-medical" style={{ color: "#63E6BE" }}></i>
            </span>
            <h3>Total Person Cured</h3>
          </div>
          <div className="data">
            <Line data={curedPatients} options={options} />
          </div>
        </div>

        <div className="patient">
          <h3>Top Doctors</h3>
          {
            doctors.map((doctor) => (
              <div key={doctor.id} className="pat">
                <img src={doctor.image} alt="" />
                <div className="id">
                  <h4>{doctor.name}</h4>
                  <h4>{doctor.role}</h4>
                </div>
                <div className="time">
                  <h5>{doctor.time}</h5>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </>
  )
}
