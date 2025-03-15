# Hospital Management System (Full Stack)

## Overview

The **Hospital Management System (HMS)** is a full-stack web application designed to streamline hospital operations, ensuring efficient management of **patient records, appointments, billing, staff, inventory, and reports**. Built using **React.js, Next.js, MongoDB, Express.js, and Node.js**, this system provides a **responsive and user-friendly dashboard** for seamless hospital administration.

---

## Features

- ✅ **User Authentication** – Secure login with **role-based access control**.
- ✅ **Patient Records Management** – Store and retrieve **patient details** and medical history.
- ✅ **Appointment Scheduling** – Manage **doctor appointments** and availability.
- ✅ **Billing System** – Generate **invoices** and manage **payments**.
- ✅ **Staff Management** – Organize **doctors, nurses, and administrative staff**.
- ✅ **Inventory Tracking** – Monitor and update **medical supplies**.
- ✅ **Reports & Analytics** – Generate **performance insights** and financial reports.
- ✅ **Real-time Notifications** – Alerts for **appointments, payments, and inventory updates**.
- ✅ **Dark/Light Mode** – User-friendly **theme toggle feature**.

---

## Tech Stack

### Frontend
- ⚡ **React.js**
- ⚡ **Next.js**
- ⚡ **Tailwind CSS**

### Backend
- 🔥 **Node.js**
- 🔥 **Express.js**

### Database
- 📦 **MongoDB**
- 📦 **Mongoose**

### Authentication & Security
- 🔐 **JWT (JSON Web Token)**
- 🔐 **Bcrypt.js**

### State Management
- 🎛️ **Redux Toolkit**

### API Integration
- 🌐 **RESTful APIs**

### Deployment
- 🚀 **Frontend**: Vercel
- 🚀 **Backend**: Render/Heroku

---

## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- ✅ **Node.js** (latest LTS version)
- ✅ **MongoDB** (local or cloud-based, e.g., MongoDB Atlas)

### Steps to Run the Project

#### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/hospital-management-system.git
cd hospital-management-system

#### 2️⃣ Install Dependencies
- Backend
cd backend
npm install


- Frontend
sh
Copy
Edit
cd ../frontend
npm install



3️⃣ Configure Environment Variables
Create a .env file in the backend root directory and add:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

