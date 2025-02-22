import { Link } from "react-router-dom";
import { FaUsers, FaUserTie, FaVoteYea } from "react-icons/fa";
import { motion } from "framer-motion";
import "./../styles.css";

const HomePage = () => {
  return (
    <div className="container">
      <h1>Gestion des Parrainages</h1>
      <div className="cards">
        {[
          { icon: <FaUsers size={50} color="#007BFF" />, title: "DGE", desc: "Gérer les fichiers électoraux et superviser le parrainage.", link: "/dge" },
          { icon: <FaUserTie size={50} color="#007BFF" />, title: "Candidats", desc: "Suivez l’évolution de vos parrainages et gérez votre profil.", link: "/candidat" },
          { icon: <FaVoteYea size={50} color="#007BFF" />, title: "Électeurs", desc: "Parrainez un candidat de manière sécurisée.", link: "/electeur" }
        ].map((item, index) => (
          <motion.div 
            className="card"
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {item.icon}
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <Link to={item.link} className="button">Accéder</Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
