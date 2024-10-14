import React, { useContext } from "react";
import Header from "../components/layout/header.jsx";
import { AuthContext } from "../components/context/AuthContext.jsx";
import Logout from "./Auth/Logout.jsx";
import Footer from "../components/layout/footer.jsx";
import profileLogo from "../assets/image/profile.png";
import pingLogo from "../assets/image/ping.png";
import phoneLogo from "../assets/image/phone.png";
import emailLogo from "../assets/image/email.png";
import rightArrowLogo from "../assets/image/rightArrow.png";
import showLogo from "../assets/image/show.png";
import createLogo from "../assets/image/create.png";
import "../assets/css/profile.css";

function ProfilePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <div className="profileContainer">
        <div className="infosProfile">
          <div className="part1Profile">
            <img className="profileIcon" src={profileLogo} alt="profile icon" />
            <div className="nameProfile">
              <p className="firstnameProfile">{currentUser?.firstname}</p>
              <p className="lastnameProfile">{currentUser?.lastname}</p>
            </div>
          </div>
          <div className="separateDivProfile"></div>
          <div className="part2Profile">
            <div className="contactProfile">
              <div className="contactElementProfile">
                <img src={emailLogo} alt="email logo" />
                <a
                  className="emailProfile"
                  href={`mailto:${currentUser?.email}`}
                >
                  {currentUser?.email}
                </a>
              </div>
              <div className="contactElementProfile">
                <img src={phoneLogo} alt="phone logo" />
                <p className="phoneProfile">{currentUser?.phone}</p>
              </div>
              <div className="contactElementProfile">
                <img src={pingLogo} alt="ping logo" />
                <p className="addressProfile">
                  {currentUser?.zip_code},&nbsp;
                  {currentUser?.address}
                </p>
              </div>
            </div>
            <button className="buttonProfile">
              <img src={rightArrowLogo} alt="rightArrow logo" />
            </button>
          </div>
          <div className="separateDivProfile"></div>
          <div className="part3Profile">
            {!currentUser?.company_id ? (
              <a className="companyLinkProfile" href="/create-company">
                <img
                  className="companyLinkImg1Profile"
                  src={createLogo}
                  alt="create logo"
                />
                Créer ou rejoindre une entreprise
              </a>
            ) : (
              <a className="companyLinkProfile">
                <img
                  className="companyLinkImg2Profile"
                  src={showLogo}
                  alt="show logo"
                />
                Voir mon entreprise
              </a>
            )}
          </div>
        </div>
        <Logout />
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
