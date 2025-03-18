import React, { useState } from "react";
import { Button, Alert, Form, Card } from "react-bootstrap";
import axios from "axios";

const SaisieCandidats = () => {
  const [numeroElecteur, setNumeroElecteur] = useState("");
  const [candidat, setCandidat] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    telephone: "",
    parti: "",
    slogan: "",
    photo: null,
    couleurs: "",
    url: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerifier = async () => {
    try {
      setError("");
      setSuccess("");

      if (!numeroElecteur.trim()) {
        setError("Veuillez saisir un numéro de carte d'électeur.");
        return;
      }

      const response = await axios.get(`http://localhost:5000/electeurs/${numeroElecteur}`);

      if (response.data.candidatExistant) {
        setError("Candidat déjà enregistré !");
        setCandidat(null);
      } else if (response.data.electeur) {
        setCandidat(response.data.electeur);
      } else {
        setError("Le candidat considéré n’est pas présent dans le fichier électoral.");
        setCandidat(null);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la vérification du candidat.");
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!candidat || !formData.email || !formData.telephone) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("cin", candidat.cin);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("telephone", formData.telephone);
      formDataToSend.append("parti", formData.parti);
      formDataToSend.append("slogan", formData.slogan);
      formDataToSend.append("photo", formData.photo);
      formDataToSend.append("couleurs", formData.couleurs);
      formDataToSend.append("url", formData.url);

      const response = await axios.post("http://localhost:5000/candidats", formDataToSend);

      if (response.data.success) {
        setSuccess("Candidat enregistré avec succès !");
        setError("");
        setNumeroElecteur("");
        setCandidat(null);
        setFormData({ email: "", telephone: "", parti: "", slogan: "", photo: null, couleurs: "", url: "" });
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'enregistrement du candidat.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Saisie des candidats</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Étape 1 : Saisie du numéro de la carte d'électeur */}
      <Form.Group className="mb-3">
        <Form.Label>Numéro de la carte d'électeur</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="text"
            value={numeroElecteur}
            onChange={(e) => setNumeroElecteur(e.target.value)}
            placeholder="Saisissez le numéro de la carte d'électeur"
          />
          <Button variant="primary" onClick={handleVerifier} className="ms-2">
            Vérifier
          </Button>
        </div>
      </Form.Group>

      {/* Étape 2 : Affichage des informations du candidat */}
      {candidat && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Informations du candidat</Card.Title>
            <Card.Text>
              <strong>Nom :</strong> {candidat.nom}<br />
              <strong>Prénom :</strong> {candidat.prenom}<br />
              <strong>Date de naissance :</strong> {candidat.date_naissance}
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {/* Étape 3 : Saisie des informations complémentaires */}
      {candidat && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
              type="text"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Parti politique</Form.Label>
            <Form.Control
              type="text"
              value={formData.parti}
              onChange={(e) => setFormData({ ...formData, parti: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Slogan</Form.Label>
            <Form.Control
              type="text"
              value={formData.slogan}
              onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Couleurs du parti</Form.Label>
            <Form.Control
              type="text"
              value={formData.couleurs}
              onChange={(e) => setFormData({ ...formData, couleurs: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enregistrer la candidature
          </Button>
        </Form>
      )}
    </div>
  );
};

export default SaisieCandidats;
