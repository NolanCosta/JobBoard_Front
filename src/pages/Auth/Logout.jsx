import React, { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../assets/css/logout.css";
import logout from "../../assets/image/logout.png";

export default function Logout() {
  const { accessToken, setAccessToken, setCurrentUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/logout`,
        option
      );

      const data = await response.json();

      localStorage.removeItem("currentToken");
      setCurrentUser(null);
      setAccessToken("");
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("currentToken");
        setCurrentUser(null);
        setAccessToken("");
      }
      console.log(error);
    }
  };
  return (
    <div className="logout">
      <button className="buttonLogout" onClick={() => logoutUser()}>
        Se déconnecter
        <img className="imgLogout" src={logout} alt="icon logout" />
      </button>
    </div>
  );
}
