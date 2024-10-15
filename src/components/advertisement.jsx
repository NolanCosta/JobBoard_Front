import "../assets/css/advertisement.css";
import React, { useState, useEffect } from "react";

const Advertisement = () => {
  const [advertisements, setAdvertisement] = useState([]);

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

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
          <h2 className="job-card-title">{advertisement.title}</h2>
          <p className="job-card-address">
            <strong>Lieu:</strong> {advertisement.city}
          </p>
          <div className="block-tags">
            {advertisement.working_time && (
              <p className="tags">
                <strong>{advertisement.working_time}</strong>
              </p>
            )}

            {advertisement.wage && (
              <p className="tags">
                <strong>{advertisement.wage}</strong>
              </p>
            )}
          </div>
          <p>
            <strong>Date de publication:</strong>{" "}
            {new Date(advertisement.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {truncateText(advertisement.description, 150)}
          </p>
          <button>Voir l'annonce</button>
        </div>
      ))}
    </div>
  );
};

export default Advertisement;
