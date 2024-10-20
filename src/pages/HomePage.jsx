import React from "react";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import Advertisement from "../components/advertisement.jsx";
import "../assets/css/home.css";

function HomePage() {
  return (
    <div>
      <Header />
      <div className="homeContainer">
        <Advertisement />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
