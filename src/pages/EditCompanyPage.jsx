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
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

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
        setName(data.name);
        setAddress(data.address);
        setZipCode(data.zip_code);
        setCity(data.city);
        setDescription(data.aboutUs);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la compagnie", error);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value.toUpperCase());
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "zipCode") {
      setZipCode(value);
    } else if (name === "city") {
      setCity(value.toUpperCase());
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("zipCode", zipCode);
    formData.append("city", city);
    formData.append("description", description);
    try {
      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      const url = `${process.env.REACT_APP_API_URL}/company/update/${id}`;
      const response = await fetch(url, options);

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
              defaultValue={name}
              onChange={handleChange}
              required
            />
            <input
              className="editCompanyInputAddress"
              type="text"
              name="address"
              placeholder="Adresse..."
              defaultValue={address}
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
                defaultValue={zipCode}
                onChange={handleChange}
                required
              />
              <input
                className="editCompanyInputCity"
                type="text"
                name="city"
                placeholder="Ville..."
                defaultValue={city}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              className="editCompanyTextareaDescription"
              name="description"
              id="description"
              placeholder="A propos de l'entreprise..."
              defaultValue={description}
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
