import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import "../assets/css/company.css";

function CompanyPage() {
  const { id } = useParams();
  const [company, setCompany] = useState([]);

  const getCompany = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/company/${id}`
    );
    const data = await response.json();
    setCompany(data);
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div>
      <Header />
      <div className="companyContainer">
        <div className="companyInformations">
          <div className="companyInformationsPart1">
            <div className="companyName">
              <img src="" alt="" />
              <h1>{company.name}</h1>
            </div>
            <div className="companyAddress">
              <h3>Adresse</h3>
              <p>{company.address}</p>
              <div>
                <p>{company.city}</p>
                <p>{company.zip_code}</p>
              </div>
            </div>
          </div>
          <div className="companyInformationsPart2">
            <h2>A propos de nous</h2>
            <p>{company.aboutUs}</p>
          </div>
        </div>
        <a className="companyAdvertisementButton" href="/home">
          Voir les annonces
        </a>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyPage;
