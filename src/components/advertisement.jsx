import { Link, NavLink } from "react-router-dom";
import "../assets/css/advertisement.css";
import React, { useState, useEffect } from "react";

const Advertisement = () => {
  const [advertisements, setAdvertisement] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/annonce`
        );
        const data = await response.json();
        setAdvertisement(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-cards-container">
      {advertisements.map((advertisement) => (
        <div key={advertisement.id} className="job-card">
          <h2>{advertisement.title}</h2>
          <p>
            <strong>Lieu:</strong> {advertisement.city}
          </p>
          <div className="block-tags">
            <div className="tags">
              <p>
                <strong></strong> {advertisement.working_time}
              </p>
            </div>
            <div className="tags">
              <p>
                <strong></strong> {advertisement.wage}
              </p>
            </div>
          </div>
          <p>
            <strong>Date de publication:</strong>{" "}
            {new Date(advertisement.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Description:</strong> {advertisement.description}
          </p>
          <button>voir</button>
        </div>
      ))}
    </div>
  );
};

export default Advertisement;
