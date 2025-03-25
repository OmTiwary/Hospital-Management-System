import React, { useState } from "react";
import "./Reception.css";

import p1 from "../asset/p1.png";
import p2 from "../asset/p2.png";
import p3 from "../asset/p3.png";
import p4 from "../asset/p4.png";
import p5 from "../asset/p5.jpg";
import p6 from "../asset/p6.webp";
import p7 from "../asset/p7.png";
import p8 from "../asset/p8.png";
import p9 from "../asset/p9.jpg";
import p10 from "../asset/p10.jpg";

const receptions = [
  { id: 1, name: "Amit Sharma", date: "12 May, 2021", phone: "+91 98765 43210", title: "Dr.", email: "amitsharma@gmail.com", image: p1 },
  { id: 2, name: "Priya Patel", date: "15 May, 2021", phone: "+91 87654 32109", title: "Dr.", email: "priyapatel@gmail.com", image: p6 },
  { id: 3, name: "Rajesh Kumar", date: "18 May, 2021", phone: "+91 76543 21098", title: "Dr.", email: "rajeshkumar@gmail.com", image: p2 },
  { id: 4, name: "Sneha Verma", date: "20 May, 2021", phone: "+91 65432 10987", title: "Dr.", email: "snehaverma@gmail.com", image: p7 },
  { id: 5, name: "Vikram Singh", date: "22 May, 2021", phone: "+91 54321 09876", title: "Dr.", email: "vikramsingh@gmail.com", image: p3 },
  { id: 6, name: "Deepika Joshi", date: "25 May, 2021", phone: "+91 43210 98765", title: "Dr.", email: "deepikajoshi@gmail.com", image: p8 },
  { id: 7, name: "Suresh Nair", date: "28 May, 2021", phone: "+91 32109 87654", title: "Dr.", email: "sureshnair@gmail.com", image: p4 },
  { id: 8, name: "Anjali Mehta", date: "30 May, 2021", phone: "+91 21098 76543", title: "Dr.", email: "anjalimehta@gmail.com", image: p9 },
  { id: 9, name: "Manoj Tiwari", date: "01 June, 2021", phone: "+91 10987 65432", title: "Dr.", email: "manojtiwari@gmail.com", image: p5 },
  { id: 10, name: "Neha Reddy", date: "03 June, 2021", phone: "+91 09876 54321", title: "Dr.", email: "nehareddy@gmail.com", image: p10 },
];

export default function Reception() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReceptions = receptions.filter((receptionist) =>
    receptionist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="title">Receptions</h2>
      <input
        type="text"
        placeholder="Search Receptionist..."
        className="search-box"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="table-container">
        <table className="reception-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Receptionist</th>
              <th>Created At</th>
              <th>Phone</th>
              <th>Title</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceptions.length > 0 ? (
              filteredReceptions.map((receptionist) => (
                <tr key={receptionist.id}>
                  <td>{receptionist.id}</td>
                  <td className="receptionist-info">
                    <img src={receptionist.image} alt={receptionist.name} className="profile-pic" />
                    <span>{receptionist.name}</span>
                  </td>
                  <td>{receptionist.date}</td>
                  <td>{receptionist.phone}</td>
                  <td>{receptionist.title}</td>
                  <td>{receptionist.email}</td>
                  <td>
                    <button className="action-button">⋮</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
