import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import "../assets/css/company.css";
import { toast } from "react-toastify";

function CompanyPage() {
  const { id } = useParams();
  const { accessToken, currentUser } = useContext(AuthContext);
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();

  const getCompany = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/company/${id}`
      );
      const data = await response.json();
      console.log(response.status);

      if (response.status === 404) {
        toast.error(data.message);
        navigate("/home");
      } else {
        setCompany(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la compagnie", error);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  const handleDelete = async () => {
    try {
      const option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/company/delete/${id}`,
        option
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="companyAdvertisementButtons">
          <a className="companyAdvertisementButtonShow" href="/home">
            Voir les annonces
          </a>
          {currentUser?.id === company.user_id && (
            <button
              className="companyAdvertisementButtonDelete"
              onClick={handleDelete}
            >
              Supprimer mon entreprise
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyPage;
