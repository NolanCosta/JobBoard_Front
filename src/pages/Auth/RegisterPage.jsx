import React, { useState } from "react";
import Footer from "../../components/layout/footer.jsx";
import logo from "../../assets/image/logoNM.png";
import "../../assets/css/register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CompanyPage() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lastname") {
      setLastname(value);
    } else if (name === "firstname") {
      setFirstname(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    const formData = new FormData();
    formData.append("lastname", lastname);
    formData.append("firstname", firstname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/register`,
        options
      );

      setLoading(false);

      setLastname("");
      setFirstname("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors);
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <img className="logo" src={logo} alt="Logo" />
        <form className="formRegister" onSubmit={(e) => handleSubmit(e)}>
          <div className="formElement">
            <input
              type="text"
              id="lastname"
              className="inputForm"
              name="lastname"
              placeholder="Nom..."
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="firsname"
              className="inputForm"
              name="firstname"
              placeholder="Prénom..."
              onChange={handleChange}
              required
            />
          </div>
          <div className="formElement">
            <input
              type="email"
              id="email"
              className="inputForm"
              name="email"
              placeholder="Email..."
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              id="phone"
              className="inputForm"
              name="phone"
              placeholder="Téléphone..."
              onChange={handleChange}
              pattern="[0-9]{10}$"
              required
            />
          </div>
          <div className="formElement">
            <input
              type="password"
              id="password"
              className="inputForm"
              name="password"
              placeholder="Mot de passe..."
              onChange={handleChange}
              required
            />
            <input
              type="password"
              id="confirmPassword"
              className="inputForm"
              name="confirmPassword"
              placeholder="Confirmer votre mot de passe..."
              onChange={handleChange}
              require
            />
          </div>
          <button type="submit" className="buttonForm">
            S'inscrire
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyPage;
