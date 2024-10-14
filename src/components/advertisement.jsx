import { Link, NavLink } from "react-router-dom";
import "../assets/css/advertisement.css";
import React, { useState, useEffect } from "react";


const Advertisement = () => {
  const [advertisements, setAdvertisement] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/annonce");
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
         {/* Première carte */}
      {advertisements.map((advertisement) => (
        <div key={advertisement.id} className="job-card">
          <h2>{advertisement.title}</h2>
          <p><strong>Lieu:</strong> {advertisement.city}</p>
          <div className="block-tags">
          <div className="tags">
          <p><strong></strong> {advertisement.working_time}</p>
          </div>
          <div className="tags">
          <p><strong></strong> {advertisement.wage}</p>
          </div>
          </div>
          <p><strong>Date de publication:</strong> {new Date(advertisement.created_at).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {advertisement.description}</p>
          <button>voir</button>
        </div>
      ))}
    
        {/* Deuxième carte */}
        <div className="job-card">
          <h2>Développeur Full Stack</h2>
          <p>
            <strong>Lieu:</strong> Lyon, France
          </p>
          <div className="block-tags">
          <div className="tags">
            interim
          </div>
          <div className="tags">
           1500€/mois
          </div>
          </div>
          <p>
            <strong>Date de publication:</strong> 8 octobre 2024
          </p>
          <p>
            <strong>Description:</strong> Nous recherchons un développeur Full
            Stack passionné par le développement frontend et backend. Rejoignez
            notre équipe pour travailler sur des solutions cloud et web innovantes.
          </p>
          <button>voir</button>
        </div>
  
        {/* Troisième carte */}
        <div className="job-card">
          <h2>Développeur Mobile</h2>
          <p>
            <strong>Lieu:</strong> Marseille, France
          </p>
          <div className="block-tags">
          <div className="tags">
            CDI
          </div>
          <div className="tags">
           1300€/mois
          </div>
          </div>
          <p>
            <strong>Date de publication:</strong> 5 octobre 2024
          </p>
          <p>
            <strong>Description:</strong> Nous recherchons un développeur mobile
            ayant une solide expérience en React Native pour développer et
            maintenir nos applications mobiles. Vous travaillerez avec une équipe
            talentueuse sur des projets excitants.
          </p>
          <button>voir</button>
        </div>
  
        {/* Quatrième carte */}
        <div className="job-card">
          <h2>Ingénieur DevOps</h2>
          <p>
            <strong>Lieu:</strong> Toulouse, France
          </p>
          <div className="block-tags">
          <div className="tags">
            CDI
          </div>
          <div className="tags">
           1300€/mois
          </div>
          </div>
          <p>
            <strong>Date de publication:</strong> 1 octobre 2024
          </p>
          <p>
            <strong>Description:</strong> Nous recherchons un ingénieur DevOps
            expérimenté pour gérer nos pipelines CI/CD et améliorer notre
            infrastructure cloud. Vous participerez à la transformation digitale
            de notre entreprise.
          </p>
          <button>voir</button>
        </div>
      </div>
    );
  };

export default Advertisement;
