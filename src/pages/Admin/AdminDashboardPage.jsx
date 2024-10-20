
import React, { useState } from 'react';
import Header from '../../components/layout/header.jsx';
import Footer from '../../components/layout/footer.jsx';
import Backoffice from '../../components/admin/Backoffice.jsx';
import AdminUser from '../../components/admin/AdminUser.jsx';
import AdminCompany from '../../components/admin/AdminCompany.jsx';
import AdminJobs from '../../components/admin/AdminJobs.jsx';
import AdminApply from '../../components/admin/AdminApply.jsx';
import '../../assets/css/dashboard.css';



function AdminDashboardPage() { 
    const [activeComponent, setActiveComponent] = useState('component1');

    // Fonction pour changer le composant actif
    const renderComponent = () => {
      switch (activeComponent) {
        case 'AdminUser':
          return <AdminUser />;
        case 'AdminCompany':
          return <AdminCompany />;
        case 'AdminJobs':
          return <AdminJobs />;
        case 'AdminApply':
          return <AdminApply />;
        default:
          return <AdminUser />;
      }
    };
  
    return (
      <div>
      <Header/> 
      <div className="App">
        <div className="dashboard-container">
          {/* Tableau de bord à gauche */}
          <Backoffice setActiveComponent={setActiveComponent} />
        </div>
        <div>
          {/* Zone pour afficher les composants à droite */}
          {renderComponent()}
        </div>
      </div>
       <Footer/>
       </div>
    );
  }
 


export default AdminDashboardPage;