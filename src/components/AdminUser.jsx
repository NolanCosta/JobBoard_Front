import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Link, useNavigate, } from "react-router-dom";

import "../assets/css/AdminUser.css";

function TableUser() {
  const [rowData, setRowData] = useState();
  const navigate = useNavigate();
  const [message ,setMessage]= useState();

  // Fonction pour récupérer les utilisateurs avec fetch
  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/useradmin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }

      const data = await response.json();
      console.log(data);
      setRowData(data); // Assurez-vous que la structure des données correspond à celle attendue
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

  const CustomButtonComponent = (props) => {
    const handleClick = () => {
      navigate(`/useradmin/${props.data.id}`); // Redirection vers la page de l'entreprise avec l'ID de l'entreprise
    };

    return <button onClick={handleClick}>Voir</button>;
  };

  const DeleteButtonComponent = (props) => {
    const handleClick = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/userde/${props.data.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (response.ok) {
              setMessage('User deleted successfully.');
            } else {
              setMessage('Failed to delete user.');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };    

    return <button onClick={handleClick}>supprimer</button>;
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

    { field: 'Informations', cellRenderer: DeleteButtonComponent, flex: 2 },
  ]);

  return (
    <>
      <div className="nav-admin">

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
