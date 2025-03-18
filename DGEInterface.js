import React from "react";
import { Link } from "react-router-dom";
import "../../styles/DGEInterface.css";

const DGEInterface = () => {
  return (
    <div className="interface-container">
      <h2>Gestion des Élections</h2>
      <div className="interface-options">
        <Link to="/upload-electeurs" className="interface-btn">Uploader un fichier</Link>
        <Link to="/saisie-candidats" className="interface-btn">Saisir un candidat</Link>
        <Link to="/ouverture-parrainage" className="interface-btn">Ouverture du parrainage</Link>
      </div>
    </div>
  );
};

export default DGEInterface;
