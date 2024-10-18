import { Link, NavLink } from "react-router-dom";
import "../../assets/css/header.css";
import logo from "../../assets/image/logoNM.png";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext, useState } from "react";

function Header() {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  const [isSignUp, setIsSignUp] = useState(true);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo1">
        <img className="logo1" src={logo} alt="Logo" />
        </div>

        <div className="menu">
           
          <NavLink
            className={({ isActive }) => (isActive ? "menu-button" : "")}
            to="/home"
          >
            Accueil
          </NavLink>

          {currentUser ? (
            <div>
            <NavLink
              className={({ isActive }) => (isActive ? "menu-button " : "")}
              to="/profile"
            >
              Profil
            </NavLink>

            <NavLink
              className={({ isActive }) => (isActive ? "menu-button" : "")}
              to="/logout"
            >
              deconnexion
            </NavLink>

            </div>

            
          ) : (
            <div className="toggle-container">
              <NavLink
                className={`toggle-button ${isSignUp ? "active" : ""}`}
                onClick={handleToggle}
                to="/register"
              >
                Inscription
              </NavLink>
              <NavLink
                className={`toggle-button ${!isSignUp ? "active" : ""}`}
                onClick={handleToggle}
                to="/login"
              >
                Connexion
              </NavLink>
            </div>
          )}

            {currentUser?.role === "ADMIN" && (  
                <NavLink
                className={({ isActive }) => (isActive ? "menu-button" : "")}
                to="/dashboard"
              >
               Dashboard
              </NavLink>
            )}

        </div>
      </div>
    </div>
  );
}

export default Header;
