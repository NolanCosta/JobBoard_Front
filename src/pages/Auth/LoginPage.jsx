import React, { useState } from "react";
import Footer from "../../components/layout/footer.jsx";
import logo from "../../assets/image/logoNM.png";
import "../../assets/css/login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useValidator from "../../components/custom/useValidator.jsx";
import Spinner from "../../components/loader/Spinner.jsx";

function CompanyPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/login`,
        options
      );

      const data = await response.json();

      setLoading(false);

      if (response.ok) {
        setEmail("");
        setPassword("");
        toast.success(data.message);
        navigate("/home");
      } else {
        if (response.status === 422) {
          setErrors(data.errors);
          toast.error("Validation error: " + data.errors);
        } else {
          toast.error(data.message || "An error occurred");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error(error.response.data.errors);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <img className="authLogo" src={logo} alt="Logo" />
        <form className="formLogin" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            id="email"
            className="inputFormLogin"
            name="email"
            placeholder="Email..."
            onChange={handleChange}
            {...useValidator(errors, "email")}
            required
          />
          <input
            type="password"
            id="password"
            className="inputFormLogin"
            name="password"
            placeholder="Mot de passe..."
            onChange={handleChange}
            required
          />
          {loading ? (
            <Spinner />
          ) : (
            <button type="submit" className="buttonFormLogin">
              Se connecter
            </button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyPage;
