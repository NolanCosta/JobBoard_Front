import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import TrashLogo from "../assets/image/trash.png";
import EditLogo from "../assets/image/edit.png";
// import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/AdminUser.css";

function TableUser() {
  const { accessToken, currentUser } = useContext(AuthContext);
  const [rowData, setRowData] = useState();
  // const navigate = useNavigate();
  const [message, setMessage] = useState();

  // useEffect(() => {
  //   if (currentUser.role !== "ADMIN") {
  //     navigate("/home");
  //   }
  // }, []);

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
      editable: true,
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

    const handleEdit = () => {};

    return (
      <div className="actionsUserAdmin">
        <button className="editUserAdmin" onClick={handleEdit}>
          <img src={EditLogo} alt="edit logo" />
        </button>
        <button className="deleteUserAdmin" onClick={handleDelete}>
          <img src={TrashLogo} alt="trash logo" />
        </button>
      </div>
    );
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "firstname",
      headerName: "Prénom",
      flex: 2,
    },
    {
      field: "lastname",
      headerName: "Nom de famille",
      flex: 2,
    },
    {
      field: "email",
      headerName: "Mail",
      flex: 3,
    },

    {
      field: "phone",
      headerName: "téléphone",
      flex: 3,
    },

    { field: "Informations", cellRenderer: ActionsButtonComponent, flex: 2 },
  ]);

  return (
    <>
      <div className="nav-admin"></div>
      <button>Ajouter un utilisateur</button>
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
