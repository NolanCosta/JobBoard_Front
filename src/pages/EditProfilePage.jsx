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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    const formData = new FormData();
    formData.append("lastname", lastname);
    formData.append("firstname", firstname);
    formData.append("email", email);
    formData.append("phone", phone);
    try {
      console.log(firstname, lastname, email, phone);

      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
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
