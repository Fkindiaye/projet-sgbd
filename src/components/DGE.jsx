import { useState } from "react";
import { motion } from "framer-motion"; // Importation de Framer Motion pour les animations

const DGE = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      alert("Fichier importé : " + file.name);
    }
  };

  return (
    <div className="container">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Direction Générale des Élections
      </motion.h1>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Gérez les fichiers électoraux et le processus de parrainage.
      </motion.p>

      {/* Importer la liste des électeurs */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Importer la liste des électeurs
      </motion.h2>
      <motion.input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ marginBottom: "20px", padding: "10px", width: "300px", borderRadius: "5px" }}
      />
      <motion.button
        onClick={handleSubmit}
        className="primary"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{ marginBottom: "20px" }}
      >
        Importer
      </motion.button>

      {/* Gestion des Candidats */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        Gestion des Candidats
      </motion.h2>
      <motion.button
        className="warning"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Ajouter un candidat
      </motion.button>

      {/* Définir la période de parrainage */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        Définir la période de parrainage
      </motion.h2>
      <motion.input
        type="date"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ marginBottom: "20px", padding: "10px", width: "300px", borderRadius: "5px" }}
      />
      <motion.button
        className="success"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Définir
      </motion.button>

      <style>
        {`
          .primary {
            background-color: blue;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .warning {
            background-color: blue;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .success {
            background-color: blue;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default DGE;
