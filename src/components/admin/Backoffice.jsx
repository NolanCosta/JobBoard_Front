import React from 'react';
import '../../assets/css/dashboard.css';

function Dashboard({ setActiveComponent }) {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <button className="button" onClick={() => setActiveComponent('AdminUser')}>
          Gérer les utilisateurs
          </button>
        </li>
        <li>
          <button className="button"  onClick={() => setActiveComponent('AdminCompany')}>
            Gérer les entreprises
          </button>
        </li>
        <li>
          <button className="button" onClick={() => setActiveComponent('AdminJobs')}>
            Gérer les annonces
          </button>
        </li>
        <li>
          <button className="button" onClick={() => setActiveComponent('AdminApply')}>
            Gérer les candidatures 
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;
