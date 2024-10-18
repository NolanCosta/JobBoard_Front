import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import TrashLogo from "../../assets/image/trash.png";
import EditLogo from "../../assets/image/edit.png";
import logo from "../../assets/image/addusers.png";
// import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/css/AdminJobs.css";
import { useNavigate } from "react-router-dom";

function TableJobs() {
  const { accessToken } = useContext(AuthContext);
  const [addAdvertisement, setaddAdvertisement] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [sector, setSector] = useState("");
  const [wage, setWage] = useState("");
  const [workingtime, setWorkingtime] = useState("");
  const [skills, setSkills] = useState("");
  const navigate = useNavigate();

  const [rowData, setRowData] = useState();
  // const navigate = useNavigate();
  const [message, setMessage] = useState();

  const [editingAdvertisement, setEditingAdvertisement] = useState(null);
  const [users, setUsers] = useState([]);

  const [formValues, setFormValues] = useState({
    
    title: "",
    type: "",
    sector: "",
    wage: "",
    workingtime: "",
    skills: "",
  });

  // useEffect(() => {
  //   if (currentUser.role !== "ADMIN") {
  //     navigate("/home");
  //   }
  // }, []);

  // button pour ajouter des annonces

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "type") {
      setType(value);
    } else if (name === "sector") {
      setSector(value);
    } else if (name === "wage") {
      setWage(value);
    } else if (name === "working_time") {
      setWorkingtime(value);
    } else if (name === "skills") {
      setSkills(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("sector", sector);
    formData.append("wage", wage);
    formData.append("working_time", workingtime);
    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/advertisement`,
        options
      );

      setTitle("");
      setType("");
      setSector("");
      setWage("");
      setWorkingtime("");
      setSkills("");

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const errorData = await response.json();
        console.log(errorData.errors);
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        console.log(error.response.data.errors);
      }
    }
  };

  // afficher les annonces
  const getJobs = async () => {
    try {
      const option = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/advertisement`,
        option
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des annonces");
      }

      const data = await response.json();

      setRowData(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    if (!rowData) {
      getJobs();
    }
  }, [rowData]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      floatingFilter: true,
    };
  }, []);

  const ActionsButtonComponent = (props) => {
    console.log(props);

    const handleDelete = async () => {
      try {
        const option = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/advertisement/delete/${props.data.id}`,
          option
        );

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
          await getJobs();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        setMessage("Error: " + error.message);
      }
    };

    const handleEdit = (advertisement) => {
      console.log(advertisement);

      setEditingAdvertisement((data) =>
        data === advertisement.id ? null : advertisement.id
      );

      setFormValues({ ...advertisement }); // Préremplit les champs du formulaire avec les valeurs actuelles de l'annonce
    };

    return (
      <div className="actionsUserAdmin">
        <button className="editUserAdmin" onClick={() => handleEdit(props.data)}> 
          <img src={EditLogo} alt="edit logo" />
        </button>
        <button className="deleteUserAdmin" onClick={handleDelete}>
          <img src={TrashLogo} alt="trash logo" />
        </button>
      </div>
    );
  };

  // UPDATE UN annonce

  // Fonction pour capturer les changements dans le formulaire
  const handleChangeForm = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Soumettre la mise à jour de l'annonce avec fetch
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/advertisement/${editingAdvertisement}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues), // Envoyer les données sous forme de JSON
        }
      );

      const result = await response.json(); // Traite la réponse
      console.log("annonce mis à jour:", result);

      // Après mise à jour, réinitialise l'annonce en cours de modification
      setEditingAdvertisement(null);
      getJobs(); // Recharge la liste des annonces pour montrer les modifications
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'annonce:", error);
    }
  };

  const colDefs = useMemo(
    () => [
      { field: "title", headerName: "Titre", flex: 2 },
      { field: "type", headerName: "Type", flex: 2 },
      { field: "sector", headerName: "Secteur", flex: 3 },
      { field: "wage", headerName: "Salaire", flex: 3 },
      { field: "working_time", headerName: "Temps de travail", flex: 2 },
      { field: "Informations", cellRenderer: ActionsButtonComponent, flex: 2 },
    ],
    []
  );

  return (
    <>
      <div className="admin-user-table-container">
        {editingAdvertisement && (
          <div className="edit-form">
            <h2>Modifier l'annonce</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-row">
                <label>Titre:</label>
                <input
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handleChangeForm}
                  required
                />
              </div>

              <div className="form-row">
                <label>Type:</label>
                <input
                  type="text"
                  name="type"
                  value={formValues.type}
                  onChange={handleChangeForm}
                  required
                />
              </div>

              <div className="form-row">
                <label>Secteur:</label>
                <input
                  type="text"
                  name="sector"
                  value={formValues.sector}
                  onChange={handleChangeForm}
                  required
                />
              </div>

              <div className="form-row">
                <label>salaire:</label>
                <input
                  type="interger"
                  name="wage"
                  value={formValues.wage}
                  onChange={handleChangeForm}
                  required
                />
              </div>

              <div className="form-row">
                <label>temps de travail:</label>
                <input
                  type="text"
                  name="workingtime"
                  value={formValues.workingtime}
                  onChange={handleChangeForm}
                  required
                />
              </div>


              <button type="submit">Mettre à jour</button>
            </form>
          </div>
        )}
      </div>

      <div className="adduser">
        <button
          className="logousers"
          onClick={() => setaddAdvertisement(!addAdvertisement)}
        >
          <img className="logoa" src={logo} alt="Logo" />
        </button>

        {addAdvertisement && (
          <div className="form">
            <form className="user-form" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-row">
                <input
                  type="text"
                  id="title"
                  className="form-input"
                  name="title"
                  placeholder="Titre..."
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  id="type"
                  className="form-input"
                  name="type"
                  placeholder="Type..."
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  id="sector"
                  className="form-input"
                  name="sector"
                  placeholder="Secteur..."
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="text"
                id="wage"
                className="form-input"
                name="wage"
                placeholder="Salaire..."
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="working_time"
                className="form-input"
                name="working_time"
                placeholder="Temps de travail..."
                onChange={handleChange}
                required
              />

              <button type="submit" className="form-button">
                Ajouter
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="table">
        <div className="ag-theme-quartz " style={{ height: 150 + 40 * 10 }}>
          <AgGridReact
            columnDefs={colDefs} // Définition des colonnes
            rowData={rowData} // Les données des annonces
            pagination={true} // Activer la pagination
            paginationPageSizeSelector={[10, 25, 50]}
            paginationPageSize={10} // Nombre d'éléments par page
            defaultColDef={defaultColDef} // Configuration par défaut des colonnes
            className="size-table"
          />
        </div>
      </div>
    </>
  );
}

export default TableJobs;
