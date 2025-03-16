import React from 'react'
import './Sidebar.css'
import {Link} from "react-router-dom";

import profile from '../asset/profile.png'
import logo from '../asset/logo.avif'

export default function Sidebar() {
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
                        <Link to='/patients'>
                        <span>
                            <i class="fa-regular fa-user" style={{ color: "#63E6BE" }}>
                            </i>
                        </span>
                        Patients
                        </Link>
                    </li>
                    <li>
                        <Link to='/remainder'>
                        <span>
                            <i class="fa-solid fa-bell-concierge" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Reminder
                        </Link>
                    </li>
                    <li>
                        <Link to='/revenue'>
                        <span>
                            <i class="fa-solid fa-dollar-sign" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Revenue
                        </Link>
                    </li>
                    <li>
                        <Link to='/inventory'>
                        <span>
                            <i class="fa-solid fa-warehouse" style={{ color: "#63E6BE" }}></i>
                        </span>
                        Inventory
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
