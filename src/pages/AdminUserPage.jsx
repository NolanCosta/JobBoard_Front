import React from 'react';
import Header from '../components/layout/header.jsx';
import Footer from '../components/layout/footer.jsx';
import TableUser from '../components/AdminUser.jsx';



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