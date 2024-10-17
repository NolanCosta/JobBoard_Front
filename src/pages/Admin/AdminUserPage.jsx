import React from 'react';
import Header from '../../components/admin/headerAdmin.jsx';
import Footer from '../../components/layout/footer.jsx';
import TableUser from '../../components/admin/AdminUser.jsx';



function AdminUserPage() {
   

    return (
        <div>

            <Header/> 
            <TableUser/> 
            <Footer/>
          

           
        </div>
    );
}

export default AdminUserPage;