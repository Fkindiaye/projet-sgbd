import React, { useState } from "react";
import axios from "axios";

const EnregistrementParrain = () => {
    const [formData, setFormData] = useState({
        numeroElecteur: "",
        cin: "",
        nom: "",
        bureauVote: "",
        telephone: "",
        email: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Réinitialiser le message

        try {
            const response = await axios.post("http://localhost:5000/parrains/enregistrer", formData);
            setMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Erreur de connexion au serveur");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Inscription Parrain</h2>
                {message && <p className="text-center text-red-500">{message}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input type="text" name="numeroElecteur" placeholder="Numéro électeur" onChange={handleChange} required className="p-2 border rounded" />
                    <input type="text" name="cin" placeholder="Numéro CNI" onChange={handleChange} required className="p-2 border rounded" />
                    <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required className="p-2 border rounded" />
                    <input type="text" name="bureauVote" placeholder="Bureau de vote" onChange={handleChange} required className="p-2 border rounded" />
                    <input type="text" name="telephone" placeholder="Téléphone" onChange={handleChange} required className="p-2 border rounded" />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="p-2 border rounded" />
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">S'inscrire</button>
                </form>
            </div>
        </div>
    );
};

export default EnregistrementParrain;
