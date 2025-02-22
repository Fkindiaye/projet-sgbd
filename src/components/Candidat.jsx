import { useState } from "react";
import { motion } from "framer-motion"; // Importation de Framer Motion pour les animations

const Candidat = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = () => {
    if (!email || !code) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(`Connexion réussie en tant que candidat avec ${email}`);
      setEmail("");
      setCode("");
    }, 1500);
  };

  return (
    <div className="container">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Espace Candidat
      </motion.h1>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Suivez l’évolution de vos parrainages et gérez votre profil.
      </motion.p>

      {/* Affichage des messages d'erreur ou de succès avec animation */}
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
        Connexion
      </motion.h2>

      <motion.input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        whileFocus={{ scale: 1.05 }} // Effet de mise en surbrillance au focus
        transition={{ type: "spring", stiffness: 300 }}
        style={{ marginBottom: "10px", padding: "10px", width: "300px", borderRadius: "5px" }}
      />
      <motion.input
        type="text"
        placeholder="Code d'authentification"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        whileFocus={{ scale: 1.05 }} // Effet de mise en surbrillance au focus
        transition={{ type: "spring", stiffness: 300 }}
        style={{ marginBottom: "20px", padding: "10px", width: "300px", borderRadius: "5px" }}
      />

      <motion.button
        onClick={handleLogin}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
        whileHover={{ scale: 1.1 }} // Animation de survol
        transition={{ type: "spring", stiffness: 200 }}
      >
        {loading ? "Connexion en cours..." : "Se connecter"}
      </motion.button>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        Suivi des parrainages
      </motion.h2>
      <motion.button
        onClick={() => alert("Statistiques des parrainages")}
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
        Voir les statistiques
      </motion.button>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        Exporter les données
      </motion.h2>
      <motion.button
        onClick={() => alert("Données exportées en PDF")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#FFC107",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Télécharger PDF
      </motion.button>
    </div>
  );
};

export default Candidat;
