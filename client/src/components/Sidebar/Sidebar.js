import React from 'react'
import './Sidebar.css'
import {Link} from "react-router-dom";

import profile from '../asset/profile.png'
import logo from '../asset/logo.avif'

export default function Sidebar() {
    // Function to handle reception link click
    const handleReceptionClick = (e) => {
        // Dispatch a custom event that Reception component can listen for
        const event = new CustomEvent('receptionSidebarClick');
        window.dispatchEvent(event);
    };

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src={logo} alt="logo" />
                    <h2>Xeno Health</h2>
                </div>
                <ul className="sidebar-links">
                    <h4>
                        <span>Operations</span>
                        <div className="divider"></div>
                    </h4>
                    <li>
                        <Link to= '/'>
                        <span><i class="fa-solid fa-house-user" style={{ color: "#63E6BE" }}></i></span>
                        Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to='/reception' onClick={handleReceptionClick}>
                        <span>
                            <i class="fa-solid fa-bell-concierge" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Receptions
                        </Link>
                    </li>
                    <li>
                        <Link to='/doctors'>
                        <span>
                            <i class="fa-solid fa-user-doctor" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Doctors
                        </Link>
                    </li>
                    <li>
                        <Link to='/appointment'>
                        <span>
                            <i class="fa-solid fa-calendar-check" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Appointment
                        </Link>
                    </li>
                    <li>
                        <Link to='/payments'>
                        <span>
                            <i class="fa-brands fa-paypal" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Payments
                        </Link>
                    </li>
                    <li>
                        <Link to='/invoices'>
                        <span>
                            <i class="fa-solid fa-file-invoice" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Invoices
                        </Link>
                    </li>
                    <li>
                        <Link to='/services'>
                        <span>
                            <i class="fa-solid fa-truck-medical" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Services
                        </Link>
                    </li>
                    <li>
                        <Link to='/medicine'>
                        <span>
                            <i class="fa-solid fa-syringe" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Medicine
                        </Link>
                    </li>
                    <li>
                        <Link to='/cart'>
                        <span>
                            <i class="fa-solid fa-cart-shopping" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Cart
                        </Link>
                    </li>
                    <li>
                        <Link to='/campaign'>
                        <span>
                            <i class="fa-solid fa-campground" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Campaign
                        </Link>
                    </li>
                    <li>
                        <Link to='/settings'>
                        <span>
                            <i class="fa-solid fa-gear" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Settings
                        </Link>
                    </li>
                    <h4>
                        <span>Account</span>
                        <div className="divider"></div>
                    </h4>
                    <li>
                        <Link to='/profile'>
                        <span>
                            <i class="fa-solid fa-address-card" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Profile
                        </Link>
                    </li>
                    <li>
                        <Link to='/settings'>
                        <span>
                            <i class="fa-solid fa-gear" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Settings
                        </Link>
                    </li>
                </ul>
                <div className="user-account">
                    <div className="user-profile">
                    <img src={profile} alt="" />
                        <div className="user-detail">
                            <h3>Ayush Mishra</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
