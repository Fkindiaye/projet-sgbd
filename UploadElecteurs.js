import React, { useState } from 'react';
import { Button, Alert, Form } from 'react-bootstrap';

const UploadElecteurs = () => {
  const [file, setFile] = useState(null);
  const [checksum, setChecksum] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChecksumChange = (e) => {
    setChecksum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !checksum) {
      setError('Veuillez sélectionner un fichier et saisir le checksum.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('checksum', checksum);

    try {
      const response = await fetch('http://localhost:5000/api/upload-electeurs', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || 'Fichier uploadé avec succès !');
        setError('');
      } else {
        setError(data.error || 'Erreur lors de l\'upload.');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Chargement de la liste des électeurs</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Fichier CSV</Form.Label>
          <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Checksum (SHA256)</Form.Label>
          <Form.Control type="text" value={checksum} onChange={handleChecksumChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Upload</Button>
      </Form>
    </div>
  );
};

export default UploadElecteurs;