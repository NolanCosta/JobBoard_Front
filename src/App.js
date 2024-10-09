import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, {useState,useEffect } from 'react';

import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import CompanyPage from "./pages/CompanyPage";
import ProfilePage from "./pages/ProfilePage";
 


function App() {
  return (
    
      <Router>
      
          <Routes>

            <Route path="/home" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/profile" element={<ProfilePage />} />

           
          </Routes>
    
      </Router>
  );
}


export default App;
 


