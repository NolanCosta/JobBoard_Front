import react, { useEffect, useState } from "react";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SendLogo from "../assets/image/send.png";
import "../assets/css/advertisement.css";

function AdvertisementPage() {
  const { id } = useParams();
  const [advertisement, setAdvertisement] = useState([]);
  const navigate = useNavigate();

  const getAdvertisement = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/advertisement/${id}`
      );
      const data = await response.json();

      if (response.status === 404) {
        toast.error(data.message);
        navigate("/home");
      } else {
        setAdvertisement(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce", error);
    }
  };

  useEffect(() => {
    getAdvertisement();
  }, []);

  return (
    <div>
      <Header />
      <div className="advertisementContainer">
        <div className="advertisementElement1">
          <div className="advertisementElement1Part1">
            <h1 className="advertisementTitle">{advertisement.title}</h1>
            <a
              className="advertisementButtonApply"
              href={`/apply-advertisement/${advertisement.id}`}
            >
              Postuler
              <img src={SendLogo} alt="send logo" />
            </a>
          </div>
          <div className="advertisementElement1Part2">
            <div className="advertisementDescription">
              <h3>{advertisement["company"]?.name}</h3>
              <h4>
                {advertisement["company"]?.city} (
                {advertisement["company"]?.zip_code})
              </h4>
            </div>
          </div>
        </div>
        <div className="advertisementElement2">
          <h5>Information sur le poste : </h5>
          <div className="advertisementSector">
            <h6>Secteur :</h6>
            <p>{advertisement?.sector}</p>
          </div>
          <div className="advertisementTags">
            <h6>Tags :</h6>
            {/* {advertisement.tags !== "undifined"
              ? JSON.parse(advertisement.tags).map((tag) => <p>{tag}</p>)
              : null} */}
          </div>
          <div className="advertisementSkills">
            <h6>Compétences :</h6>
            {/* {advertisement.skills !== "undifined"
            ? JSON.parse(advertisement.skills).map((skill) => <p>{skill}</p>)
            : null} */}
          </div>
          <div className="advertisementWage">
            <h6>Salaire :</h6>
            <p>{advertisement.wage}€</p>
          </div>
          <div className="advertisementContract">
            <h6>Type de poste :</h6>
            <div className="advertisementContractElements">
              <p>{advertisement.type}</p>
              <p>{advertisement.working_time}</p>
            </div>
          </div>
          <div className="advertisementDescription">
            <h6>description :</h6>
            <p>{advertisement.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdvertisementPage;
