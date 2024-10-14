import React from "react";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import Advertisement from '../components/advertisement.jsx';

function HomePage() {
  return (
    <div>
      <Header />
      <Advertisement/>
      <Footer />
    </div>
  );
}

export default HomePage;
