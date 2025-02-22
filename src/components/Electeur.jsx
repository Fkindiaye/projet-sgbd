import { useState } from "react";
import { motion } from "framer-motion";

const Electeur = () => {
  const [electeurID, setElecteurID] = useState("");
  const [cin, setCIN] = useState("");
  const [authCode, setAuthCode] = useState(""); // Code d'authentification
  const [selectedCandidat, setSelectedCandidat] = useState("");
  const [validationCode, setValidationCode] = useState(""); // Code de validation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [candidats, setCandidats] = useState([]); // Liste des candidats
  const [userData, setUserData] = useState(null); // Informations de l'électeur

  // Fonction pour valider l'électeur via API backend
  const validateElecteur = async () => {
    if (!electeurID || !cin || !authCode) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://votre-api.com/validate-electeur", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ electeurID, cin, authCode }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setUserData(data.electeur); // Sauvegarder les données de l'électeur dans l'état
        setError(""); // Enlever les erreurs si l'électeur est validé
        setSuccess(`Parrainage validé pour l’électeur ${electeurID}`);
      } else {
        setError("Numéro de carte d’électeur ou CIN incorrect.");
      }
    } catch (err) {
      setError("Erreur de connexion avec le serveur.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer la vérification du code de validation
  const handleCodeVerification = () => {
    if (validationCode === "12345") { // Exemple de code de validation
      setSuccess("Votre parrainage a été validé avec succès !");
      // Vous pouvez ici envoyer une confirmation par email ou SMS
    } else {
      setError("Le code de validation est incorrect.");
    }
  };

  return (
    <div className="container">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Espace Électeur
      </motion.h1>

      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Parrainez un candidat de manière sécurisée.
      </motion.p>

      {/* Affichage des messages d'erreur ou de succès */}
      {error && (
        <motion.div
          style={{ color: "red", marginBottom: "20px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.div>
      )}
      {success && (
        <motion.div
          style={{ color: "green", marginBottom: "20px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {success}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Création de profil
      </motion.h2>

      {/* Saisie du numéro d’électeur et de CIN */}
      <motion.input
        type="text"
        placeholder="Numéro d’électeur"
        value={electeurID}
        onChange={(e) => setElecteurID(e.target.value)}
        whileFocus={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ marginBottom: "10px", padding: "10px", width: "300px", borderRadius: "5px" }}
      />
      <motion.input
        type="text"
        placeholder="Numéro de CIN"
        value={cin}
        onChange={(e) => setCIN(e.target.value)}
        whileFocus={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ marginBottom: "10px", padding: "10px", width: "300px", borderRadius: "5px" }}
      />

      {/* Affichage des informations personnelles après validation */}
      {userData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>Nom: {userData.nom}</p>
          <p>Date de Naissance: {userData.dateNaissance}</p>
          <p>Bureau de vote: {userData.bureauVote}</p>
          <motion.input
            type="text"
            placeholder="Code d'authentification"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            style={{ marginBottom: "10px", padding: "10px", width: "300px", borderRadius: "5px" }}
          />
        </motion.div>
      )}

      {/* Sélection du candidat */}
      {authCode && (
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Choisissez un Candidat
          </motion.h2>

          <motion.select
            value={selectedCandidat}
            onChange={(e) => setSelectedCandidat(e.target.value)}
            style={{ marginBottom: "20px", padding: "10px", width: "300px", borderRadius: "5px" }}
          >
            <option value="">Sélectionner un candidat</option>
            {candidats.map((candidat) => (
              <option key={candidat.id} value={candidat.id}>
                {candidat.nom}
              </option>
            ))}
          </motion.select>
        </div>
      )}

      {/* Code de validation envoyé par email/téléphone */}
      {selectedCandidat && (
        <motion.input
          type="text"
          placeholder="Code de validation (5 chiffres)"
          value={validationCode}
          onChange={(e) => setValidationCode(e.target.value)}
          style={{ marginBottom: "20px", padding: "10px", width: "300px", borderRadius: "5px" }}
        />
      )}

      <motion.button
        onClick={handleCodeVerification}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28A745",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Valider le choix
      </motion.button>

      {/* Bouton pour valider l'électeur */}
      <motion.button
        onClick={validateElecteur}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px",
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {loading ? "Validation en cours..." : "Valider mes informations"}
      </motion.button>
    </div>
  );
};

export default Electeur;
