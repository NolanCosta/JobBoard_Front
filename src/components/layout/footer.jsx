import React from 'react';
import "../../assets/css/footer.css";
import logo from "../../assets/image/epitech.png";

function Footer() {

return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Section Logo */}
        <div className="footer-logo">
          <img src={logo} alt="Logo de l'entreprise" />
        </div>

        {/* Section Contacts */}
        <div className="footer-contacts">
          <h3>Contactez-nous</h3>
          <ul>
            <li>
              Email : <a href="mailto:melia.reriouedj@epitech.eu">melia.reriouedj@epitech.eu</a>
            </li>
            <li>
              Email : <a href="mailto:nolan.costa@epitech.eu">nolan.costa@epitech.eu</a>
            </li>
            <li>
              Téléphone : <a href="tel:+33782330436"> 090909090</a>
            </li>
            <li>Adresse : 06600 Nice, France</li>
          </ul>
        </div>

        {/* Section Réseaux Sociaux */}
        <div className="footer-social">
          <h3>Suivez-nous</h3>
          <ul className="social-links">
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>

      {/* Footer bottom section */}
      <div className="footer-bottom">
        <p>&copy; 2024 NOLAN&MELIA - site web</p>
      </div>
    </footer>
  );
};

export default Footer;
