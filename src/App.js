import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, {useState,useEffect } from 'react';

import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import CompanyPage from "./pages/CompanyPage";
import ProfilePage from "./pages/ProfilePage";
import AdminUserPage from "./pages/AdminUserPage";
 


function App() {
  return (
    
      <Router>
      
          <Routes>

            <Route path="/home" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/Admin" element={<AdminUserPage />} />

           
          </Routes>
    
      </Router>
  );
}


export default App;
 


