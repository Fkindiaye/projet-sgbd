import React from "react";
import { Link } from "react-router-dom";
import "../../styles/ElecteurInterface.css";

const ElecteurInterface = () => {
  return (
    <div className="interface-container">
      <h2>Espace Électeur</h2>
      <div className="interface-options">
        <Link to="/enregistrement-parrain" className="interface-btn">Enregistrer un parrain</Link>
        <Link to="/enregistrement-parrainage" className="interface-btn">Enregistrer un parrainage</Link>
      </div>
    </div>
  );
};

export default ElecteurInterface;
