import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Table } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from "recharts";
import axios from "axios";

const SuiviParrainages = () => {
  const [email, setEmail] = useState("");
  const [codeAuth, setCodeAuth] = useState("");
  const [candidat, setCandidat] = useState(null);
  const [parrainages, setParrainages] = useState([]);
  const [totalParrainages, setTotalParrainages] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    // Animation du compteur
    let currentTotal = 0;
    const interval = setInterval(() => {
      if (currentTotal < totalParrainages) {
        currentTotal += Math.ceil(totalParrainages / 50); // Augmentation progressive
        setTotalParrainages(Math.min(currentTotal, totalParrainages));
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [totalParrainages]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/candidats/login", {
        email,
        codeAuth,
      });

      if (response.data.success) {
        setCandidat(response.data.candidat);
        fetchParrainages(response.data.candidat.cin);
      } else {
        setError("Échec de l'authentification");
      }
    } catch (err) {
      setError("Email ou code incorrect");
    }
  };

  const fetchParrainages = async (cin) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/candidats/parrainages/${cin}`);
      setParrainages(response.data);
      
      // Calculer le total des parrainages
      const total = response.data.reduce((sum, p) => sum + p.total, 0);
      setTotalParrainages(total);
    } catch (err) {
      setError("Erreur lors du chargement des parrainages");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Suivi des Parrainages</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {!candidat ? (
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Code d'authentification</Form.Label>
            <Form.Control
              type="text"
              value={codeAuth}
              onChange={(e) => setCodeAuth(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Se connecter</Button>
        </Form>
      ) : (
        <div>
          <h4>Bonjour {candidat.nom}, voici vos statistiques de parrainage :</h4>
          
          {/* Compteur dynamique */}
          <div className="total-parrainages">
            <h3>Total des Parrainages : <span className="counter">{totalParrainages}</span></h3>
          </div>

          {/* Tableau des données */}
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Date</th>
                <th>Nombre de Parrainages</th>
              </tr>
            </thead>
            <tbody>
              {parrainages.map((p, index) => (
                <tr key={index}>
                  <td>{p.date}</td>
                  <td>{p.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Graphiques */}
          <div className="chart-container">
            <h5>Évolution des Parrainages</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={parrainages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#007bff" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h5>Répartition des Parrainages</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={parrainages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#28a745" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuiviParrainages;
