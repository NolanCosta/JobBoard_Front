import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext.jsx";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckLogo from "../assets/image/check.png";
import "../assets/css/createCompany.css";

export default function CreateCompanyPage() {
  const { accessToken, currentUser } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [type, setType] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [company_id, setCompany_id] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.company_id) {
      navigate("/profile");
    }
  }, [currentUser]);

  const getCompanies = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/company/`);

    const data = await response.json();

    setCompanies(data);
  };

  useEffect(() => {
    getCompanies();
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
    } else if (name === "company_id") {
      setCompany_id(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", type);
    if (type) {
      formData.append("name", name);
      formData.append("address", address);
      formData.append("zip_code", zipCode);
      formData.append("city", city);
      formData.append("aboutUs", description);
    } else {
      formData.append("company_id", company_id);
    }
    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/company/store`,
        options
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setName("");
        setAddress("");
        setZipCode("");
        setCity("");
        setDescription("");
        navigate("/profile");
        window.location.reload();
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
      <div className="createCompanyContainer">
        <div className="createCompanyButtons">
          <button
            className={`${type ? "activeButton" : "classicButton"}`}
            onClick={() => setType(true)}
          >
            Créer
          </button>
          <button
            className={`${!type ? "activeButton" : "classicButton"}`}
            onClick={() => setType(false)}
          >
            Rejoindre
          </button>
        </div>
        <div className="separateDivCreateCompany"></div>
        <form className="createCompanyForm" onSubmit={(e) => handleSubmit(e)}>
          {type ? (
            <>
              <div className="createCompanyInputsForm">
                {/* <input
                  className="createCompanyInputLogo"
                  type="file"
                  name="logo"
                /> */}
                <input
                  className="createCompanyInputName"
                  type="text"
                  name="name"
                  placeholder="Nom..."
                  onChange={handleChange}
                  required
                />
                <input
                  className="createCompanyInputAddress"
                  type="text"
                  name="address"
                  placeholder="Adresse..."
                  onChange={handleChange}
                  required
                />
                <div className="createCompanyDivCity">
                  <input
                    className="createCompanyInputZipCode"
                    type="number"
                    name="zipCode"
                    minLength="5"
                    placeholder="Code postal..."
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="createCompanyInputCity"
                    type="text"
                    name="city"
                    placeholder="Ville..."
                    onChange={handleChange}
                    required
                  />
                </div>
                <textarea
                  className="createCompanyTextareaDescription"
                  name="description"
                  id="description"
                  placeholder="A propos de l'entreprise..."
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button className="createCompanyButton" type="submit">
                Créer
                <img
                  className="createCompanyImgButton"
                  src={CheckLogo}
                  alt="check logo"
                />
              </button>
            </>
          ) : (
            <>
              <div className="joinCompanySelectForm">
                <select
                  className="joinCompanySelect"
                  name="company_id"
                  id="company_id"
                  onChange={handleChange}
                  required
                >
                  <option value="">Choisir une entreprise...</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="createCompanyButton" type="submit">
                Rejoindre
              </button>
            </>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
