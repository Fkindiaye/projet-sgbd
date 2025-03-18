import React from "react";
import { Link } from "react-router-dom";

const Accueil = () => {
  return (
    <div className="accueil-container">
      <h1 className="accueil-title">Plateforme de Parrainage</h1>

      <div className="accueil-grid">
        {/* DGE Section */}
        <div className="accueil-card dge">
          <h2>DGE</h2>
          <p>Gérez les candidats et la liste électorale.</p>
          <Link to="/dge" className="accueil-btn">Accéder</Link>
        </div>

        {/* Candidat Section */}
        <div className="accueil-card candidat">
          <h2>Candidats</h2>
          <p>Suivez l'évolution de vos parrainages.</p>
          <Link to="/suivi-parrainages" className="accueil-btn">Voir</Link>
        </div>

        {/* Electeur Section */}
        <div className="accueil-card electeur">
          <h2>Électeurs</h2>
          <p>Enregistrez votre parrainage facilement.</p>
          <Link to="/electeur" className="accueil-btn">Accéder</Link>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
