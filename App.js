import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil";
import DGEInterface from "./pages/DGE/DGEInterface";
import UploadElecteurs from "./pages/DGE/UploadElecteurs";
import SaisieCandidats from "./pages/DGE/SaisieCandidats";
import OuvertureParrainage from "./pages/DGE/OuvertureParrainage";
import ElecteurInterface from "./pages/Electeur/ElecteurInterface";
import EnregistrementParrain from "./pages/Electeur/EnregistrementParrain";
import EnregistrementParrainage from "./pages/Electeur/EnregistrementParrainage";
import SuiviParrainages from "./pages/Candidat/SuiviParrainages";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/dge" element={<DGEInterface />} />
        <Route path="/upload-electeurs" element={<UploadElecteurs />} />
        <Route path="/saisie-candidats" element={<SaisieCandidats />} />
        <Route path="/ouverture-parrainage" element={<OuvertureParrainage />} />
        <Route path="/electeur" element={<ElecteurInterface />} />
        <Route path="/enregistrement-parrain" element={<EnregistrementParrain />} />
        <Route path="/enregistrement-parrainage" element={<EnregistrementParrainage />} />
        <Route path="/suivi-parrainages" element={<SuiviParrainages />} />
      </Routes>
    </Router>
  );
}

export default App;
