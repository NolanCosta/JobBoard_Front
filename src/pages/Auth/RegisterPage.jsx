import React, { useState } from "react";
import Footer from "../../components/layout/footer.jsx";
import logo from "../../assets/image/logoNM.png";
import "../../assets/css/register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useValidator from "../../components/custom/useValidator.jsx";
import Spinner from "../../components/loader/Spinner.jsx";

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
        <img className="authLogo" src={logo} alt="Logo" />
        <form className="formRegister" onSubmit={(e) => handleSubmit(e)}>
          <div className="formRegisterElement">
            <input
              type="text"
              id="lastname"
              className="inputFormRegister"
              name="lastname"
              placeholder="Nom..."
              onChange={handleChange}
              {...useValidator(errors, "lastname")}
              required
            />
            <input
              type="text"
              id="firsname"
              className="inputFormRegister"
              name="firstname"
              placeholder="Prénom..."
              onChange={handleChange}
              {...useValidator(errors, "firsname")}
              required
            />
          </div>
          <div className="formRegisterElement">
            <input
              type="email"
              id="email"
              className="inputFormRegister"
              name="email"
              placeholder="Email..."
              onChange={handleChange}
              {...useValidator(errors, "email")}
              required
            />
            <input
              type="tel"
              id="phone"
              className="inputFormRegister"
              name="phone"
              placeholder="Téléphone..."
              onChange={handleChange}
              {...useValidator(errors, "phone")}
              pattern="[0-9]{10}$"
              required
            />
          </div>
          <div className="formRegisterElement">
            <input
              type="password"
              id="password"
              className="inputFormRegister"
              name="password"
              placeholder="Mot de passe..."
              onChange={handleChange}
              {...useValidator(errors, "password")}
              required
            />
            <input
              type="password"
              id="confirmPassword"
              className="inputFormRegister"
              name="confirmPassword"
              placeholder="Confirmer votre mot de passe..."
              onChange={handleChange}
              {...useValidator(errors, "confirmPassword")}
              require
            />
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <button type="submit" className="buttonFormRegister">
              S'inscrire
            </button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyPage;
