import React, { useState } from "react";
import axios from "axios";

const EnregistrementParrainage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        numeroElecteur: "",
        cin: "",
        codeAuth: "",
        candidatChoisi: null,
        codeValidation: ""
    });

    const [electeurInfo, setElecteurInfo] = useState(null);
    const [candidats, setCandidats] = useState([]); 
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Étape 1 : Vérifier l’électeur
    const verifierElecteur = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await axios.post("http://localhost:5000/api/parrains/verifier", {
                numeroElecteur: formData.numeroElecteur.trim(),
                cin: formData.cin.trim()
            });

            if (response.data.success) {
                setElecteurInfo(response.data.electeur);
                setStep(2);
            } else {
                setMessage("Informations incorrectes ou électeur non inscrit.");
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur.");
        }
    };

    // 🔹 Étape 2 : Vérifier le code d'authentification et charger les candidats
    const verifierCodeAuth = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await axios.post("http://localhost:5000/api/parrains/verifier-code", {
                numeroElecteur: formData.numeroElecteur.trim(),
                codeAuth: formData.codeAuth.trim()
            });

            if (response.data.success && response.data.candidats.length > 0) {
                setCandidats(response.data.candidats);
                setStep(3);
            } else {
                setMessage("Code incorrect ou aucun candidat disponible.");
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur.");
        }
    };

    // 🔹 Étape 3 : Sélectionner un candidat (Corrigé ✅)
    const choisirCandidat = (candidatCin) => {
        setFormData({ ...formData, candidatChoisi: candidatCin });
        setMessage(""); // Enlever le message d'erreur si un candidat est sélectionné
    };

    // 🔹 Étape 4 : Demander un code de validation
    const demanderCodeValidation = async () => {
        if (!formData.candidatChoisi) {
            setMessage("Veuillez sélectionner un candidat !");
            return;
        }

        setMessage("");
        try {
            const response = await axios.post("http://localhost:5000/api/parrains/demanderCode", {
                numeroElecteur: formData.numeroElecteur,
                candidatId: formData.candidatChoisi
            });

            if (response.data.success) {
                setMessage("Code de validation envoyé !");
                setStep(4);
            } else {
                setMessage("Erreur lors de l'envoi du code.");
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur.");
        }
    };

    // 🔹 Étape 5 : Valider le parrainage
    const validerParrainage = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await axios.post("http://localhost:5000/api/parrains/valider", {
                numeroElecteur: formData.numeroElecteur,
                codeValidation: formData.codeValidation.trim()
            });

            if (response.data.success) {
                setStep(5);
            } else {
                setMessage("Code de validation incorrect.");
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur.");
        }
    };

    return (
        <div className="container">
            <h2>🗳️ Enregistrement du Parrainage</h2>
            {message && <p className="text-danger">{message}</p>}

            {step === 1 && (
                <form onSubmit={verifierElecteur}>
                    <input type="text" name="numeroElecteur" placeholder="Numéro électeur" onChange={handleChange} required />
                    <input type="text" name="cin" placeholder="Numéro CNI" onChange={handleChange} required />
                    <button type="submit">Vérifier</button>
                </form>
            )}

            {step === 2 && electeurInfo && (
                <div>
                    <p>👤 <strong>Nom :</strong> {electeurInfo.nom}</p>
                    <p>📅 <strong>Date de naissance :</strong> {electeurInfo.date_naissance}</p>
                    <p>🏛️ <strong>Bureau de vote :</strong> {electeurInfo.bureau_vote}</p>

                    <form onSubmit={verifierCodeAuth} className="mt-4">
                        <input type="text" name="codeAuth" placeholder="🔑 Code d’authentification" onChange={handleChange} required />
                        <button type="submit">Vérifier Code</button>
                    </form>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h3>👥 Choisissez un candidat</h3>
                    <ul className="candidat-list">
                        {candidats.map((candidat) => (
                            <li 
                                key={candidat.cin} 
                                className={`candidat-item ${formData.candidatChoisi === candidat.cin ? "selected" : ""}`} 
                                onClick={() => choisirCandidat(candidat.cin)}
                            >
                                <img src={candidat.photo} alt={candidat.nom} className="candidat-photo" />
                                <div>
                                    <strong>🏛️ {candidat.nom}</strong>
                                    <p>🎭 {candidat.parti_politique}</p>
                                </div>
                                {formData.candidatChoisi === candidat.cin && <span className="checkmark">✅</span>}
                            </li>
                        ))}
                    </ul>
                    <button onClick={demanderCodeValidation}>✅ Valider Parrainage</button>
                </div>
            )}

            {step === 4 && (
                <form onSubmit={validerParrainage}>
                    <input type="text" name="codeValidation" placeholder="🔑 Code reçu" onChange={handleChange} required />
                    <button type="submit">Valider</button>
                </form>
            )}

            {step === 5 && <p className="text-success">🎉 Parrainage validé avec succès !</p>}
        </div>
    );
};

export default EnregistrementParrainage;
