import { Link, NavLink } from "react-router-dom";
import "../../assets/css/header.css";
import logo from '../../assets/image/logoNM.png';


function Header() {

    return (
        <div>

            <div className="navbar">

                <img className="logo1" src={logo} alt="Logo" />

                <div className="menu">
                    <NavLink className={({ isActive }) => isActive ? 'menu-button' : ''} to="/home">Accueil</NavLink >

                    <NavLink className={({ isActive }) => isActive ? 'menu-button' : ''} to="/dashboard">Backoffice</NavLink>

                    <NavLink className={({ isActive }) => isActive ? 'menu-button' : ''} to="/profile">Profil</NavLink >
                </div>

            </div>
           

        </div>


    );
}

export default Header;

