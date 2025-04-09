import React from 'react';
import './Revenue.css';

export default function Revenue() {
  const transactions = [
    { date: '2025-04-01', type: 'Income', description: 'Consultation Fee', amount: 3000 },
    { date: '2025-04-02', type: 'Expense', description: 'Medical Equipment', amount: -1500 },
    { date: '2025-04-03', type: 'Expense', description: 'Lunch', amount: -300 },
    { date: '2025-04-04', type: 'Income', description: 'Follow-up Fee', amount: 2000 },
    { date: '2025-04-05', type: 'Expense', description: 'Stationery', amount: -250 },
    { date: '2025-04-06', type: 'Income', description: 'Surgery Assistance', amount: 7000 },
    { date: '2025-04-07', type: 'Expense', description: 'Electricity Bill', amount: -1200 },
    { date: '2025-04-08', type: 'Income', description: 'Health Checkup Camp', amount: 5000 },
    { date: '2025-04-09', type: 'Expense', description: 'Snacks', amount: -200 },
    { date: '2025-04-10', type: 'Income', description: 'Emergency Visit', amount: 3500 },
    { date: '2025-04-11', type: 'Expense', description: 'Internet Bill', amount: -900 },
    { date: '2025-04-12', type: 'Expense', description: 'Cleaning Services', amount: -1100 },
    { date: '2025-04-13', type: 'Income', description: 'Prescription Charge', amount: 800 },
    { date: '2025-04-14', type: 'Expense', description: 'Transport', amount: -400 },
    { date: '2025-04-15', type: 'Income', description: 'Consultation Fee', amount: 3200 },
    { date: '2025-04-16', type: 'Expense', description: 'Clinic Rent', amount: -7000 },
    { date: '2025-04-17', type: 'Income', description: 'Routine Checkup', amount: 1500 },
    { date: '2025-04-18', type: 'Expense', description: 'Medical Books', amount: -600 },
    { date: '2025-04-19', type: 'Income', description: 'X-Ray Analysis', amount: 1800 },
    { date: '2025-04-20', type: 'Expense', description: 'Tea and Snacks', amount: -220 }
  ];

  return (
    <div className="revenue-container">
      <h2><i className="fas fa-chart-line"></i> Revenue Summary</h2>
      <div className="revenue-cards">
        <div className="revenue-card">
          <i className="fas fa-wallet icon"></i>
          <h3>This Month</h3>
          <p>₹75,000</p>
        </div>
        <div className="revenue-card">
          <i className="fas fa-calendar-alt icon"></i>
          <h3>Previous Month</h3>
          <p>₹68,500</p>
        </div>
        <div className="revenue-card">
          <i className="fas fa-calendar icon"></i>
          <h3>Last Year</h3>
          <p>₹8,75,000</p>
        </div>
        <div className="revenue-card">
          <i className="fas fa-coins icon"></i>
          <h3>Total Income</h3>
          <p>₹15,50,000</p>
        </div>
      </div>

      <h3 className="transaction-heading"><i className="fas fa-receipt"></i> Transactions</h3>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <tr key={index} className={t.type === 'Expense' ? 'expense-row' : 'income-row'}>
              <td>{t.date}</td>
              <td>{t.type}</td>
              <td>{t.description}</td>
              <td>{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="print-button" onClick={() => window.print()}>
        <i className="fas fa-print"></i> Print Transaction Slip
      </button>

    </div>
  );
}
