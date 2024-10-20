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
  const [addAdvertisement, setAddAdvertisement] = useState(false);
  const [editAdvertisement, setEditAdvertisement] = useState(false);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const [rowData, setRowData] = useState();

  const [skillInput, setSkillInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    type: "",
    sector: "",
    description: "",
    wage: "",
    working_time: "",
    skills: [],
    tags: [],
    zip_code: "",
    city: "",
    company_id: "",
  });

  const getCompanies = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/company/`);

    const data = await response.json();

    setCompanies(data);
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "city") {
      setFormValues({
        ...formValues,
        [name]: value.toUpperCase(),
      });
    } else if (name === "skills" || name === "tags") {
      setFormValues({
        ...formValues,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleAddSkill = () => {
    if (skillInput !== "") {
      setFormValues({
        ...formValues,
        skills: [...formValues.skills, skillInput],
      });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...formValues.skills];
    updatedSkills.splice(index, 1);
    setFormValues({
      ...formValues,
      skills: updatedSkills,
    });
  };

  const handleAddTag = () => {
    if (tagInput !== "") {
      setFormValues({
        ...formValues,
        tags: [...formValues.tags, tagInput],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...formValues.tags];
    updatedTags.splice(index, 1);
    setFormValues({
      ...formValues,
      tags: updatedTags,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formValues),
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/advertisement/create`,
        options
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        getJobs();
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
    const advertisement = props.data;
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
          `${process.env.REACT_APP_API_URL}/advertisement/delete/${advertisement.id}`,
          options
        );

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
          await getJobs();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log("Error: " + error.message);
      }
    };

    const handleEdit = (e) => {
      e.preventDefault();

      setEditAdvertisement((data) =>
        data === advertisement.id ? null : advertisement.id
      );

      const parsedAdvertisement = {
        ...advertisement,
        skills: JSON.parse(advertisement.skills || "[]"),
        tags: JSON.parse(advertisement.tags || "[]"),
      };
      setFormValues(parsedAdvertisement);
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
        `${process.env.REACT_APP_API_URL}/advertisement/${editAdvertisement}`,
        options
      );

      const data = await response.json();
      toast.success(data.message);
      setEditAdvertisement(null);
      getJobs();
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

  useEffect(() => {
    if (currentUser.role !== "ADMIN") {
      navigate("/home");
    }
    getCompanies();
  }, [accessToken]);

  useEffect(() => {
    if (!rowData) {
      getJobs();
    }
  }, [rowData]);

  return (
    <>
      <div>
        {editAdvertisement && (
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
                  name="company_id"
                  id="company_id"
                  onChange={handleChange}
                  value={formValues.company_id}
                  required
                >
                  <option value="">Choisir une entreprise...</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="title"
                  className="form-input"
                  name="title"
                  placeholder="Titre..."
                  onChange={handleChange}
                  value={formValues.title}
                  required
                />
                <input
                  type="text"
                  id="sector"
                  className="form-input"
                  name="sector"
                  placeholder="Secteur..."
                  onChange={handleChange}
                  value={formValues.sector}
                  required
                />
                <select
                  name="type"
                  id="type"
                  className="form-input"
                  onChange={handleChange}
                  value={formValues.type}
                  required
                >
                  <option value="">Type de contrat...</option>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Intérim">Intérim</option>
                  <option value="Stage">Stage</option>
                  <option value="Alternance">Alternance</option>
                </select>
                <select
                  type="text"
                  id="working_time"
                  className="form-input"
                  name="working_time"
                  onChange={handleChange}
                  value={formValues.working_time}
                >
                  <option value="">Format...</option>
                  <option value="Temps plein">Temps plein</option>
                  <option value="Temps partiel">Temps partiel</option>
                </select>
                <input
                  type="number"
                  id="wage"
                  className="form-input"
                  name="wage"
                  placeholder="Salaire..."
                  onChange={handleChange}
                  value={formValues.wage}
                />
                <input
                  type="number"
                  id="zip_code"
                  className="form-input"
                  name="zip_code"
                  placeholder="Code postal..."
                  onChange={handleChange}
                  value={formValues.zip_code}
                  required
                />

                <input
                  type="text"
                  id="city"
                  className="form-input"
                  name="city"
                  placeholder="Ville..."
                  onChange={handleChange}
                  value={formValues.city}
                  required
                />
                <div>
                  <div className="inputMultiple">
                    <input
                      type="text"
                      id="skills"
                      className="form-input"
                      name="skills"
                      placeholder="Ajouter une compétence..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                    />
                    <button type="button" onClick={handleAddSkill}>
                      +
                    </button>
                  </div>
                  <div className="renderElements">
                    {formValues.skills.map((skill, index) => {
                      return (
                        <p key={index}>
                          {skill}
                          <button
                            className="deleteElement"
                            type="button"
                            onClick={() => handleRemoveSkill(index)}
                          >
                            X
                          </button>
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="inputMultiple">
                    <input
                      type="text"
                      id="tags"
                      className="form-input"
                      name="tags"
                      placeholder="Ajouter un tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                    <button type="button" onClick={handleAddTag}>
                      +
                    </button>
                  </div>
                  <div className="renderElements">
                    {formValues.tags.map((tag, index) => {
                      return (
                        <p key={index}>
                          {tag}
                          <button
                            className="deleteElement"
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                          >
                            X
                          </button>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <textarea
                name="description"
                id="description"
                className="form-textarea"
                placeholder="Description de l'annonce..."
                onChange={handleChange}
                value={formValues.description}
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
          onClick={() => setAddAdvertisement(!addAdvertisement)}
        >
          <img className="logoa" src={logo} alt="Logo" />
        </button>

        {addAdvertisement && (
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
                  name="company_id"
                  id="company_id"
                  onChange={handleChange}
                  required
                >
                  <option value="">Choisir une entreprise...</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
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
                  id="sector"
                  className="form-input"
                  name="sector"
                  placeholder="Secteur..."
                  onChange={handleChange}
                  required
                />
                <select
                  name="type"
                  id="type"
                  className="form-input"
                  onChange={handleChange}
                  required
                >
                  <option value="">Type de contrat...</option>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Intérim">Intérim</option>
                  <option value="Stage">Stage</option>
                  <option value="Alternance">Alternance</option>
                </select>
                <select
                  type="text"
                  id="working_time"
                  className="form-input"
                  name="working_time"
                  onChange={handleChange}
                >
                  <option value="">Format...</option>
                  <option value="Temps plein">Temps plein</option>
                  <option value="Temps partiel">Temps partiel</option>
                </select>
                <input
                  type="number"
                  id="wage"
                  className="form-input"
                  name="wage"
                  placeholder="Salaire..."
                  onChange={handleChange}
                />
                <input
                  type="number"
                  id="zip_code"
                  className="form-input"
                  name="zip_code"
                  placeholder="Code postal..."
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  id="city"
                  className="form-input"
                  name="city"
                  placeholder="Ville..."
                  onChange={handleChange}
                  required
                />
                <div>
                  <div className="inputMultiple">
                    <input
                      type="text"
                      id="skills"
                      className="form-input"
                      name="skills"
                      placeholder="Ajouter une compétence..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                    />
                    <button type="button" onClick={handleAddSkill}>
                      +
                    </button>
                  </div>
                  <div className="renderElements">
                    {formValues.skills.map((skill, index) => {
                      return (
                        <p key={index}>
                          {skill}
                          <button
                            className="deleteElement"
                            type="button"
                            onClick={() => handleRemoveSkill(index)}
                          >
                            X
                          </button>
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="inputMultiple">
                    <input
                      type="text"
                      id="tags"
                      className="form-input"
                      name="tags"
                      placeholder="Ajouter un tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                    <button type="button" onClick={handleAddTag}>
                      +
                    </button>
                  </div>
                  <div className="renderElements">
                    {formValues.tags.map((tag, index) => {
                      return (
                        <p key={index}>
                          {tag}
                          <button
                            className="deleteElement"
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                          >
                            X
                          </button>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <textarea
                name="description"
                id="description"
                className="form-textarea"
                placeholder="Description de l'annonce..."
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
