import React from 'react';
import Header from '../../components/admin/headerAdmin.jsx';
import Footer from '../../components/layout/footer.jsx';
import AdminHome from '../../components/admin/AdminHome.jsx';



function AdminHomePage() {
   

    return (
        <div>

            <Header/> 
            <AdminHome/> 
            <Footer/>
          

           
        </div>
    );
}

export default AdminHomePage;