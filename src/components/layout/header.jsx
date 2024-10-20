import { Link, NavLink } from "react-router-dom";
import "../../assets/css/header.css";
import logo from "../../assets/image/logoNM.png";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext, useState } from "react";
import Logout from "../../pages/Auth/Logout.jsx";

function Header() {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  const [isSignUp, setIsSignUp] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="navbar">
        {/* Logo */}
        <div className="logo1">
          <img className="logo1" src={logo} alt="Logo" />
        </div>

        {/* Menu classique */}
        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <NavLink
            className={({ isActive }) => (isActive ? "menu-button" : "")}
            to="/home"
          >
            Accueil
          </NavLink>

          {currentUser?.role === "ADMIN" && (
            <NavLink
              className={({ isActive }) => (isActive ? "menu-button" : "")}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          )}

          {currentUser ? (
            <div className="ecart">
              <NavLink
                className={({ isActive }) => (isActive ? "menu-button" : "")}
                to="/profile"
              >
                Profil
              </NavLink>
              <Logout />
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
        </div>

        {/* Bouton burger visible sur mobile */}
        <div
          className={`burger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Menu mobile */}
        <nav className={`menu-mobile ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/home">Accueil</NavLink>
          {currentUser?.role === "ADMIN" && (
            <NavLink to="/dashboard">Dashboard</NavLink>
          )}
          {currentUser ? (
            <>
              <NavLink to="/profile">Profil</NavLink>
              <Logout />
            </>
          ) : (
            <>
              <NavLink to="/register">Inscription</NavLink>
              <NavLink to="/login">Connexion</NavLink>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;
