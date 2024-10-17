// // admin advertisements
// import React, { useEffect, useState } from 'react';
// import "../../assets/css/AdminJobs.css";


// const TableJobs = () => {
//     const [advertisements, setAdvertisement] = useState([]);

//     useEffect(() => {
//       const fetchJobs = async () => {
//         try {
//           const response = await fetch("http://localhost:8000/api/annonce");
//           const data = await response.json();
//           setAdvertisement(data);
//         } catch (error) {
//           console.error("Erreur lors de la récupération des annonces:", error);
//         }
//       };
  
//       fetchJobs();
//     }, []);


    

//   return (
//     <div className="table-container">
//       <table className="annonce-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Titre</th>
//             <th>Type</th>
//             <th>Secteur</th>
//             <th>Description</th>
//             <th>Salaire</th>
//             <th>Temps de travail</th>
//             <th>Compétences</th>
//             <th>Date de création</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {advertisements.length > 0 ? (
//             advertisements.map((advertisement) => (
//               <tr key={advertisement.id}>
//                 <td>{advertisement.id}</td>
//                 <td>{advertisement.title}</td>
//                 <td>{advertisement.type}</td>
//                 <td>{advertisement.sector}</td>
//                 <td>{advertisement.description}</td>
//                 <td>{advertisement.wage} €</td>
//                 <td>{advertisement.working_time}</td>
//                 <td>{advertisement.skills}</td>
//                 <td>{new Date(advertisement.created_at).toLocaleDateString()}</td>
//                 <td>
//                   <button className="btn-edit">Modifier</button>
//                   <button className="btn-delete">Supprimer</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">Aucune annonce trouvée</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableJobs;
