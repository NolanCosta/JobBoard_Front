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
import "../../assets/css/AdminUser.css";
import { useNavigate } from "react-router-dom";

function TableUser() {
  const { accessToken } = useContext(AuthContext);
  const [addUser, setAddUser] = useState(false);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [rowData, setRowData] = useState();
  // const navigate = useNavigate();
  const [message, setMessage] = useState();

  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    zip_code: "",
    city: "",
    role: "",
  });

  // useEffect(() => {
  //   if (currentUser.role !== "ADMIN") {
  //     navigate("/home");
  //   }
  // }, []);

  // button pour ajouter des utilisateurs

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lastname") {
      setLastname(value);
    } else if (name === "firstname") {
      setFirstname(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lastname", lastname);
    formData.append("firstname", firstname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/create`,
        options
      );

      setLastname("");
      setFirstname("");
      setEmail("");
      setPhone("");
      setPassword("");

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
  const getUsers = async () => {
    try {
      const option = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/userAdmin`,
        option
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }

      const data = await response.json();

      setRowData(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    if (!rowData) {
      getUsers();
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
          `${process.env.REACT_APP_API_URL}/user/delete/${props.data.id}`,
          option
        );

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
          await getUsers();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        setMessage("Error: " + error.message);
      }
    };

    const handleEdit = (user) => {
      console.log(user);

      setEditingUser((data) => (data === user.id ? null : user.id));

      setFormValues({ ...user }); // Préremplit les champs du formulaire avec les valeurs actuelles de l'utilisateur
    };

    return (
      <div className="actionsUserAdmin">
        <button
          className="editUserAdmin"
          onClick={() => handleEdit(props.data)}
        >
          <img src={EditLogo} alt="edit logo" />
        </button>
        <button className="deleteUserAdmin" onClick={handleDelete}>
          <img src={TrashLogo} alt="trash logo" />
        </button>
      </div>
    );
  };

  // UPDATE UN UTILISATEUR

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
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/update/${editingUser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues), // Envoyer les données sous forme de JSON
        }
      );

      const result = await response.json(); // Traite la réponse
      console.log("Utilisateur mis à jour:", result);

      // Après mise à jour, réinitialise l'utilisateur en cours de modification
      setEditingUser(null);
      getUsers(); // Recharge la liste des utilisateurs pour montrer les modifications
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    }
  };

  const colDefs = useMemo(
    () => [
      { field: "firstname", headerName: "Prénom", flex: 2 },
      { field: "lastname", headerName: "Nom de famille", flex: 2 },
      { field: "email", headerName: "Mail", flex: 3 },
      { field: "phone", headerName: "Téléphone", flex: 3 },
      { field: "Informations", cellRenderer: ActionsButtonComponent, flex: 2 },
    ],
    []
  );

  return (
    <>
      <div className="admin-user-table-container">
        {editingUser && (
          <div className="edit-form">
            <h2>Modifier l'utilisateur</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-row">
                <label>Prénom:</label>
                <input
                  type="text"
                  name="firstname"
                  value={formValues.firstname}
                  onChange={handleChangeForm}
                  required
                />
              </div>

              <div className="form-row">
                <label>Nom:</label>
                <input
                  type="text"
                  name="lastname"
                  value={formValues.lastname}
                  onChange={handleChangeForm}
                  required
                />
              </div>

              <div className="form-row">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChangeForm}
                  required
                />
              </div>

              <div className="form-row">
                <label>Téléphone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formValues.phone}
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
                <label>Rôle:</label>
                <input
                  type="text"
                  name="role"
                  value={formValues.role}
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
        <button className="logousers" onClick={() => setAddUser(!addUser)}>
          <img className="logoa" src={logo} alt="Logo" />
        </button>

        {addUser && (
          <div className="form">
            <form className="user-form" onSubmit={(e) => handleSubmit(e)}>
              <div className="form-row">
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
              </div>
              <div className="form-row">
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
                  pattern="[0-9]{10}$"
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  name="password"
                  placeholder="Mot de passe..."
                  onChange={handleChange}
                  required
                />
              </div>

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

export default TableUser;
