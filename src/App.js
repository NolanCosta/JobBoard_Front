import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import CompanyPage from "./pages/CompanyPage";
import ProfilePage from "./pages/ProfilePage";
import CreateCompanyPage from "./pages/CreateCompanyPage";
import { AuthContext } from "./components/context/AuthContext";

function App() {
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("currentToken"))
  );
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentlyLoggedInUser = async () => {
      try {
        const option = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user`,
          option
        );

        const data = await response.json();

        setCurrentUser(data.user);
      } catch (error) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("currentToken");
          setCurrentUser(null);
          setAccessToken("");
        }
        console.log(error);
      }
    };
    if (accessToken) fetchCurrentlyLoggedInUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, currentUser, setCurrentUser }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/company/:id" element={<CompanyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-company" element={<CreateCompanyPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
