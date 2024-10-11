import React, { useContext } from "react";
import Header from "../components/layout/header.jsx";
import { AuthContext } from "../components/context/AuthContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { accessToken, setAccessToken, currentUser, setCurrentUser } =
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
    <div>
      <Header />
      <button onClick={() => logoutUser()}>Se déconnecter</button>
    </div>
  );
}

export default ProfilePage;
