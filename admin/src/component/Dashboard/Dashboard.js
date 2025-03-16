import React from 'react';
import './Dashboard.css';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

import pat1 from '../asset/pat1.avif';
import pat2 from '../asset/pat2.avif';
import pat3 from '../asset/pat3.jpg';
import pat4 from '../asset/pat4.avif';
import pat5 from '../asset/pat5.avif';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement);

export default function Dashboard() {
    const patientsChecked = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Patients Checked',
                data: [1200, 1500, 1800, 2000, 2500, 3000, 3500, 2800, 3200, 4000, 4500, 5000],
                backgroundColor: '#3498db',
            },
        ],
    };

    const appointmentsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Appointments',
                data: [800, 900, 1000, 1100, 1300, 1500, 1700, 1600, 1800, 2000, 2200, 2500],
                backgroundColor: '#f39c12',
            },
        ],
    };

    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue Generated ($)',
                data: [234000, 254000, 100000, 135000, 420000, 765000, 200000, 600000, 750000, 755000, 120000, 900000],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const inventoryData = {
        labels: ['Medicines', 'Syringes', 'Gloves', 'Masks', 'IV Fluids'],
        datasets: [
            {
                label: 'Stock Level',
                data: [500, 700, 300, 400, 800],
                backgroundColor: ['#e74c3c', '#8e44ad', '#2ecc71', '#f39c12', '#3498db'],
            },
        ],
    };

    const growthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Hospital Growth',
                data: [1000, 1500, 2000, 2500, 3000, 4000, 5000, 5500, 6000, 7000, 8000, 10000],
                borderColor: '#9b59b6',
                backgroundColor: 'rgba(155, 89, 182, 0.2)',
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
                grid: { display: false },
            },
            y: {
                grid: { display: false },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: { display: false },
        },
    };


    const patients = [
        { id: 1, name: "Ayush Mishra", condition: "Cardiac Issue", image: pat1, time: "2:20PM" },
        { id: 2, name: "Abhishek", condition: "Fever & Cough", image: pat2, time: "3:15PM" },
        { id: 3, name: "Om", condition: "Pediatric Checkup", image: pat3, time: "4:10PM" },
        { id: 4, name: "Manjit", condition: "Migraine", image: pat4, time: "5:05PM" },
        { id: 5, name: "Keshav", condition: "Stomach Pain", image: pat5, time: "6:30PM" },
    ];
    
    return (
        <>
            <div className="nav">
                <input type="search" name="search" id="search" placeholder='Search "Doctor" ' required autoComplete="off" />
                <h4>Admin Panel</h4>
            </div>

            <div className="box">
                <div className="box1">
                    <div className="layout">
                        <span>
                            <i className="fa-regular fa-user" style={{ color: "#63E6BE" }}></i>
                        </span>
                        <h3>Total Patients Checked</h3>
                    </div>
                    <div className="data">
                        <Bar data={patientsChecked} options={options} />
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
                        <Bar data={appointmentsData} options={options} />
                    </div>
                </div>

                <div className="box3">
                    <div className="layout">
                        <span>
                            <i className="fa-solid fa-dollar-sign" style={{ color: "#63E6BE" }}></i>
                        </span>
                        <h3>Revenue Generated</h3>
                    </div>
                    <div className="data">
                        <Line data={revenueData} options={options} />
                    </div>
                </div>

                <div className="box4">
                    <div className="layout">
                        <span>
                            <i className="fa-solid fa-box" style={{ color: "#63E6BE" }}></i>
                        </span>
                        <h3>Inventory Status</h3>
                    </div>
                    <div className="data">
                        <Bar data={inventoryData} options={options} />
                    </div>
                </div>

                <div className="box5">
                    <div className="layout">
                        <span>
                            <i className="fa-solid fa-chart-line" style={{ color: "#63E6BE" }}></i>
                        </span>
                        <h3>Hospital Growth</h3>
                    </div>
                    <div className="data">
                        <Line data={growthData} options={options} />
                    </div>
                </div>
                <div className="patient">
                    <h3>Recent Patients</h3>
                    {
                        patients.map((patient) => (
                            <div key={patient.id} className="pat">
                                <img src={patient.image} alt="" />
                                <div className="id">
                                    <h4>{patient.name}</h4>
                                    <h4>{patient.condition}</h4>
                                </div>
                                <div className="time">
                                    <h5>{patient.time}</h5>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}
