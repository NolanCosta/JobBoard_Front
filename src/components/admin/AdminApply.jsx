import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import TrashLogo from "../../assets/image/trash.png";
import EditLogo from "../../assets/image/edit.png";
import logo from "../../assets/image/addusers.png";
import { toast } from "react-toastify";
import "../../assets/css/AdminJobs.css";
import { useNavigate } from "react-router-dom";

function TableJobs() {
  const { accessToken, currentUser } = useContext(AuthContext);
  const [addFollowAdvertisement, setAddFollowAdvertisement] = useState(false);
  const [editFollowAdvertisement, setEditFollowAdvertisement] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);
  const navigate = useNavigate();

  const [rowData, setRowData] = useState();

  const [formValues, setFormValues] = useState({
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    message: "",
    user_id: "",
    advertisement_id: "",
  });

  const getAdvertisements = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/advertisement`
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des annonces");
      }

      const data = await response.json();

      setAdvertisements(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const getFollowAdvertisement = async () => {
    try {
      const option = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/followAdvertisement`,
        option
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des candidatures");
      }

      const data = await response.json();

      setRowData(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/followAdvertisement/create`,
        options
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setAddFollowAdvertisement(false);
        getFollowAdvertisement();
      } else {
        const errorData = await response.json();
        toast.error(errorData.errors);
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        console.log(error.response.data.errors);
      }
    }
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      floatingFilter: true,
    };
  }, []);

  const ActionsButtonComponent = (props) => {
    const followAdvertisement = props.data;
    const handleDelete = async () => {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/followAdvertisement/delete/${followAdvertisement.id}`,
          options
        );

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
          await getFollowAdvertisement();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log("Error: " + error.message);
      }
    };

    const handleEdit = (e) => {
      e.preventDefault();

      setEditFollowAdvertisement((data) =>
        data === followAdvertisement.id ? null : followAdvertisement.id
      );

      setFormValues({ ...followAdvertisement });
    };

    return (
      <div className="actionsUserAdmin">
        <button className="editUserAdmin" onClick={(e) => handleEdit(e)}>
          <img src={EditLogo} alt="edit logo" />
        </button>
        <button className="deleteUserAdmin" onClick={handleDelete}>
          <img src={TrashLogo} alt="trash logo" />
        </button>
      </div>
    );
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);

    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formValues),
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/followAdvertisement/update/${editFollowAdvertisement}`,
        options
      );

      const data = await response.json();
      toast.success(data.message);
      setEditFollowAdvertisement(null);
      getFollowAdvertisement();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la candidature:", error);
    }
  };

  const colDefs = useMemo(
    () => [
      { field: "lastname", headerName: "Nom", flex: 2 },
      { field: "firstname", headerName: "Prénom", flex: 2 },
      { field: "email", headerName: "Email", flex: 3 },
      { field: "phone", headerName: "Téléphone", flex: 3 },
      { field: "Actions", cellRenderer: ActionsButtonComponent, flex: 2 },
    ],
    []
  );

  useEffect(() => {
    if (currentUser.role !== "ADMIN") {
      navigate("/home");
    }
    getAdvertisements();
  }, [accessToken]);

  useEffect(() => {
    if (!rowData) {
      getFollowAdvertisement();
    }
  }, [rowData]);

  return (
    <>
     <div className="admin-jobs-table-container">
        {editFollowAdvertisement && (
          <div className="form">
            <form
              className="advertisement-form"
              onSubmit={(e) => {
                handleUpdateSubmit(e);
              }}
            >
              <div className="form-row">
                <select
                  className="form-input"
                  name="advertisement_id"
                  id="advertisement_id"
                  onChange={handleChange}
                  value={formValues.advertisement_id}
                  required
                >
                  <option value="">Choisir une annonce...</option>
                  {advertisements.map((advertisement) => (
                    <option key={advertisement.id} value={advertisement.id}>
                      {advertisement.title} à {advertisement.city}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="lastname"
                  className="form-input"
                  name="lastname"
                  placeholder="Nom..."
                  onChange={handleChange}
                  value={formValues.lastname}
                  required
                />
                <input
                  type="text"
                  id="firstname"
                  className="form-input"
                  name="firstname"
                  placeholder="Prénom..."
                  onChange={handleChange}
                  value={formValues.firstname}
                  required
                />
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  name="email"
                  placeholder="Email..."
                  onChange={handleChange}
                  value={formValues.email}
                  required
                />
                <input
                  type="tel"
                  id="phone"
                  className="form-input"
                  name="phone"
                  placeholder="Téléphone..."
                  onChange={handleChange}
                  value={formValues.phone}
                  required
                />
              </div>
              <textarea
                name="message"
                id="message"
                className="form-textarea"
                placeholder="message de la candidature..."
                onChange={handleChange}
                value={formValues.message}
              ></textarea>

              <button type="submit" className="form-button">
                Modifier
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="addAdvertisement">
        <button
          className="logousers"
          onClick={() => setAddFollowAdvertisement(!addFollowAdvertisement)}
        >
          <img className="logoa" src={logo} alt="Logo" />
        </button>

        {addFollowAdvertisement && (
          <div className="form">
            <form
              className="advertisement-form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="form-row">
                <select
                  className="form-input"
                  name="advertisement_id"
                  id="advertisement_id"
                  onChange={handleChange}
                  required
                >
                  <option value="">Choisir une annonce...</option>
                  {advertisements.map((advertisement) => (
                    <option key={advertisement.id} value={advertisement.id}>
                      {advertisement.title} à {advertisement.city}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="lastname"
                  className="form-input"
                  name="lastname"
                  placeholder="Nom..."
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  id="firstname"
                  className="form-input"
                  name="firstname"
                  placeholder="Prénom..."
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  name="email"
                  placeholder="Email..."
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  id="phone"
                  className="form-input"
                  name="phone"
                  placeholder="Téléphone..."
                  onChange={handleChange}
                  required
                />
              </div>
              <textarea
                name="message"
                id="message"
                className="form-textarea"
                placeholder="message de la candidature..."
                onChange={handleChange}
              ></textarea>

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

export default TableJobs;
