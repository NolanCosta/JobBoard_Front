import React, { useContext, useEffect, useState } from "react";
import Header from "../components/layout/header.jsx";
import { AuthContext } from "../components/context/AuthContext.jsx";
import { toast } from "react-toastify";
import Footer from "../components/layout/footer.jsx";
import "../assets/css/editProfile.css";

function EditProfilePage() {
  const { accessToken, currentUser } = useContext(AuthContext);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    zip_code: "",
    city: "",
    password: "",
  });

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setLastname(currentUser.lastname);
    setFirstname(currentUser.firstname);
    setEmail(currentUser.email);
    setPhone(currentUser.phone);
  }, [currentUser]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lastname", lastname);
    formData.append("firstname", firstname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("zip_code", zipCode);
    formData.append("city", city);
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
        `${process.env.REACT_APP_API_URL}/user/update/${currentUser?.id}`,
        options
      );
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="editProfileContainer">
        <form className="editProfileForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="editProfileInputsForm">
            <input
              className="editProfileInputLastname"
              type="text"
              name="lastname"
              placeholder="Nom..."
              defaultValue={currentUser?.lastname}
              onChange={handleChange}
              required
            />
            <input
              className="editProfileInputFirstname"
              type="text"
              name="firstname"
              placeholder="Prénom..."
              defaultValue={currentUser?.firstname}
              onChange={handleChange}
              required
            />
            <input
              className="editProfileInputEmail"
              type="email"
              name="email"
              placeholder="Email..."
              defaultValue={currentUser?.email}
              onChange={handleChange}
              required
            />
            <input
              className="editProfileInputPhone"
              type="tel"
              name="phone"
              placeholder="Téléphone..."
              defaultValue={currentUser?.phone}
              onChange={handleChange}
              required
            />
            <input
              className="editProfileInputAddress"
              type="text"
              name="address"
              placeholder="Adresse..."
              defaultValue={currentUser?.address}
              onChange={handleChange}
            />
            <input
              className="editProfileInputZipCode"
              type="number"
              name="zip_code"
              placeholder="Code postal..."
              defaultValue={currentUser?.zip_code}
              onChange={handleChange}
            />
            <input
              className="editProfileInputCity"
              type="text"
              name="city"
              placeholder="Ville..."
              defaultValue={currentUser?.city}
              onChange={handleChange}
            />
            <input
              className="editProfileInputPassword"
              type="password"
              name="password"
              placeholder="Mot de passe..."
              onChange={handleChange}
            />
            <input
              className="editProfileInputConfirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirmer mot de passe..."
              onChange={handleChange}
            />
          </div>
          <button className="editProfileButton" type="submit">
            Enregistrer
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EditProfilePage;
