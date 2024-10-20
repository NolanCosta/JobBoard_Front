import React from 'react';
import "../../assets/css/footer.css";
import logo from "../../assets/image/logoEpitech.png";
import logoLinkedin from "../../assets/image/linkedin.png";
import logoInstagram from "../../assets/image/insta.png";

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
              Mail : <a href="mailto:nolan.costa@epitech.eu">nolan.costa@epitech.eu</a>
            </li>
            <li>
            <li>
              Mail : <a href="mailto:melia.reriouedj@epitech.eu">melia.reriouedj@epitech.eu</a>
            </li>
              Téléphone : <a href="tel:+33782330436"> 090909090</a>
            </li>
            <li>06600 Nice, France</li>
          </ul>
        </div>

        {/* Section Réseaux Sociaux */}
        <div className="footer-social">
          <h3>Suivez-nous</h3>
          <ul className="social-links">
   
          <li>
      <a
        href="https://linkedin.com/in/melia-reriouedj-31b772294"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="logo"
          src={logoLinkedin}
          alt="LinkedIn Logo"
        />
      </a>
    </li>
    <li>
    <a
        href="https://https://www.linkedin.com/in/nolan-costa"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="logo"
          src={logoInstagram}
          alt="LinkedIn Logo"
        />
      </a>
    </li>
          
          </ul>
        </div>
      </div>

      {/* Footer bottom section */}
      <div className="footer-bottom">
        <p>&copy; 2024 NM JOBS - site web</p>
      </div>
    </footer>
  );
};

export default Footer;
