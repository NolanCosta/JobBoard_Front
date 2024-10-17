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
import "../../assets/css/AdminCompany.css";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

function TableCompany() {
  const { accessToken } = useContext(AuthContext);
  const [addCompany, setaddCompany] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [aboutUs, setAboutUs] = useState("");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [rowData, setRowData] = useState();
  // const navigate = useNavigate();
  const [message, setMessage] = useState();

  const [editingCompany, setEditingCompany] = useState(null);
  const [users, setUsers] = useState([]);

  const [formValues, setFormValues] = useState({
    type: 'true',
    name: '',
    address: '',
    zip_code: '',
    city: '',
    aboutUs: '',
  });


  // useEffect(() => {
  //   if (currentUser.role !== "ADMIN") {
  //     navigate("/home");
  //   }
  // }, []);

  // button pour ajouter des entreprises

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "zip_code") {
      setZipCode(value);
    } else if (name === "city") {
      setCity(value);
    } else if (name === "aboutUs") {
      setAboutUs(value);
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Création de l\'entreprise:', name, address, zipCode, city, aboutUs);
    
  console.log(formValues);
  
    try {
      const options = {
        method: "POST",
       headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formValues), // Envoyer les données sous forme de JSON
  
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/company/create`,
        options
        
      );

      setName("");
      setAddress("");
      setZipCode("");
      setCity("");
      setAboutUs("");

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

  // afficher les utilisateurs
  const getCompany = async () => {
    try {
      const option = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/company`,
        option
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des entreprises");
      }

      const data = await response.json();

      setRowData(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    if (!rowData) {
      getCompany();
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
          `${process.env.REACT_APP_API_URL}/company/delete/${props.data.id}`,
          option
        );

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
          await getCompany();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        setMessage("Error: " + error.message);
      }
    };

    const handleEdit = (company) => {
      console.log(company);
      
      setEditingCompany((data) => (data === company.id ? null : company.id));

      setFormValues({ ...company }); // Préremplit les champs du formulaire avec les valeurs actuelles de l'utilisateur
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


   // Fonction pour capturer les changements dans le formulaire
   const handleChangeForm = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Soumettre la mise à jour de l'utilisateur avec fetch
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log('Mise à jour de l\'entreprise:', formValues);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/company/${editingCompany}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formValues), // Envoyer les données sous forme de JSON
      });

      const result = await response.json(); // Traite la réponse
      console.log('Entreprise mis à jour:', result);

      // Après mise à jour, réinitialise l'utilisateur en cours de modification
      setEditingCompany(null);
      getCompany(); // Recharge la liste des entreprises pour montrer les modifications
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'entreprise:', error);
    }
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "name",
      headerName: "Nom de l'entreprise",
      flex: 3,
    },
   
    {
      field: "address",
      headerName: "Addresse",
      flex: 3,
    },

    {
      field: "zip_code",
      headerName: "Code postal",
      flex: 2,
    },
    {
      field: "city",
      headerName: "Ville",
      flex: 2,
    },

    {
      field: "collaborators",
      headerName: "Collaborateurs",
      flex: 3,
    },

    { field: "Informations", cellRenderer: ActionsButtonComponent, flex: 2 },
  ]);

  return (
    <>
    <div className="admin-company-table-container">

{editingCompany && (
  <div className="edit-form">
    <h2>Modifier l'utilisateur</h2>
    <form onSubmit={handleUpdateSubmit}>
      <div className="form-row">
        <label>Nom:</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChangeForm}
          required
        />
      </div>

      <div className="form-row">
        <label>Adresse:</label>
        <input
          type="text"
          name="address"
          value={formValues.address}
          onChange={handleChangeForm}
          required
        />
      </div>

      <div className="form-row">
        <label>Code postal:</label>
        <input
          type="text"
          name="zip_code"
          value={formValues.zip_code}
          onChange={handleChangeForm}
          required
        />
      </div>

      <div className="form-row">
        <label>Ville:</label>
        <input
          type="text"
          name="city"
          value={formValues.city}
          onChange={handleChangeForm}
          required
        />
      </div>

      <div className="form-row">
        <label>A propos :</label>
        <textarea
          type=""
          name="aboutUs"
          value={formValues.aboutUs}
          onChange={handleChangeForm}
        />
      </div>

      <button type="submit">Mettre à jour</button>
    </form>
  </div>
)}
 </div>
      <div className="addcompany">
        <button
          className="logousers"
          onClick={() => setaddCompany(!addCompany)}
        >
          <img className="logoa" src={logo} alt="Logo" />
        </button>
        {addCompany && (
          <form className="company-form" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              id="name"
              className="form-input"
              name="name"
              placeholder="Nom..."
              onChange={handleChangeForm}
              required
            />

            <input
              type="text"
              id="address"
              className="form-input"
              name="address"
              placeholder="Adresse..."
              onChange={handleChangeForm}
              required
            />

            <input
              type="number"
              id="zip_code"
              className="form-input"
              name="zip_code"
              placeholder="Code postal..."
              onChange={handleChangeForm}
              required
            />

            <input
              type="text"
              id="city"
              className="form-input"
              name="city"
              placeholder="Ville..."
              onChange={handleChangeForm}
              required
            />

            <textarea
              id="aboutUs"
              className="form-textarea"
              name="aboutUs"
              placeholder="description..."
              onChange={handleChangeForm}
              rows="5"
              required
            />

            <button type="submit" className="form-button">
              Ajouter
            </button>
          </form>
        )}
      </div>
      <div className="table">
        <div className="ag-theme-quartz " style={{ height: 150 + 40 * 10 }}>
          <AgGridReact
            columnDefs={colDefs} // Définition des colonnes
            rowData={rowData} // Les données des utilisateurs
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

export default TableCompany;
