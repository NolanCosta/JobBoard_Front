import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckLogo from "../assets/image/check.png";
import "../assets/css/editCompany.css";

export default function EditCompanyPage() {
  const { accessToken } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    zip_code: "",
    city: "",
    aboutUs: "",
  });

  const getCompany = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/company/${id}`
      );
      const data = await response.json();

      if (response.status === 404) {
        toast.error(data.message);
        navigate("/profile");
      } else {
        setFormValues({
          name: data.name,
          address: data.address,
          zip_code: data.zip_code,
          city: data.city,
          aboutUs: data.aboutUs,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la compagnie", error);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "name" || e.target.name === "city") {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value.toUpperCase(),
      });
    } else {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formValues),
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/company/update/${id}`,
        options
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        navigate(`/company/${id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        console.log(error.response.data.errors);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="editCompanyContainer">
        <form className="editCompanyForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="editCompanyInputsForm">
            {/* <input className="editCompanyInputLogo" type="file" name="logo" /> */}
            <input
              className="editCompanyInputName"
              type="text"
              name="name"
              placeholder="Nom..."
              defaultValue={formValues.name}
              onChange={handleChange}
              required
            />
            <input
              className="editCompanyInputAddress"
              type="text"
              name="address"
              placeholder="Adresse..."
              defaultValue={formValues.address}
              onChange={handleChange}
              required
            />
            <div className="editCompanyDivCity">
              <input
                className="editCompanyInputZipCode"
                type="number"
                name="zipCode"
                minLength="5"
                placeholder="Code postal..."
                defaultValue={formValues.zip_code}
                onChange={handleChange}
                required
              />
              <input
                className="editCompanyInputCity"
                type="text"
                name="city"
                placeholder="Ville..."
                defaultValue={formValues.city}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              className="editCompanyTextareaDescription"
              name="aboutUs"
              id="aboutUs"
              placeholder="A propos de l'entreprise..."
              defaultValue={formValues.aboutUs}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button className="editCompanyButton" type="submit">
            Enregistrer
            <img
              className="editCompanyImgButton"
              src={CheckLogo}
              alt="check logo"
            />
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
