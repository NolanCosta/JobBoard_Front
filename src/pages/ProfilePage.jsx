import React, { useContext } from "react";
import Header from "../components/layout/header.jsx";
import { AuthContext } from "../components/context/AuthContext.jsx";
import Logout from "./Auth/Logout.jsx";

function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div>
      <Header />
      <Logout />
    </div>
  );
}

export default ProfilePage;
