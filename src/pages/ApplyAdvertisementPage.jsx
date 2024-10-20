import react, { useContext, useEffect, useState } from "react";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { AuthContext } from "../components/context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SendLogo from "../assets/image/send.png";
import "../assets/css/applyAdvertisement.css";

function ApplyAdvertisementPage() {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lastname", lastname);
    formData.append("firstname", firstname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    formData.append("advertisement_id", id);
    if (currentUser) {
      formData.append("user_id", currentUser.id);
    }
    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/followAdvertisement`,
        options
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        navigate("/home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        console.log(error.response.data.errors);
      }
    }
  };

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
    } else if (name === "message") {
      setMessage(value);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setLastname(currentUser.lastname);
      setFirstname(currentUser.firstname);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
    }
  }, [currentUser]);

  return (
    <div>
      <Header />
      <div className="applyAdvertisementContainer">
        
        <h2>Remplir les informations pour postuler :</h2>
       
        <form
          className="applyAdvertisementForm"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="applyAdvertisementInputs">
            <div className="applyAdvertisementElement1">
              <input
                type="text"
                name="lastname"
                placeholder="Nom..."
                defaultValue={currentUser && currentUser.lastname}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                name="firstname"
                placeholder="Prénom..."
                defaultValue={currentUser && currentUser.firstname}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="applyAdvertisementElement2">
              <input
                type="email"
                name="email"
                placeholder="Email..."
                defaultValue={currentUser && currentUser.email}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone..."
                defaultValue={currentUser && currentUser.phone}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <textarea
              className="applyAdvertisementTextarea"
              name="message"
              id="mesage"
              placeholder="Message..."
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <button className="applyAdvertisementButton" type="submit">
            Envoyer <img src={SendLogo} alt="send logo" />
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ApplyAdvertisementPage;
