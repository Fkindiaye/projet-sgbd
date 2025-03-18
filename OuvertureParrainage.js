import React, { useState } from 'react';
import { Button, Alert, Form } from 'react-bootstrap';

const OuvertureParrainage = () => {
  const [dates, setDates] = useState({
    dateDebut: '',
    dateFin: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(dates.dateDebut) >= new Date(dates.dateFin)) {
      setError('La date de début doit être antérieure à la date de fin.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/parrainage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dates),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Période de parrainage enregistrée avec succès !');
        setError('');
      } else {
        setError(data.error || 'Erreur lors de l\'enregistrement.');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ouverture de la période de parrainage</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Date de début</Form.Label>
          <Form.Control type="date" name="dateDebut" value={dates.dateDebut} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date de fin</Form.Label>
          <Form.Control type="date" name="dateFin" value={dates.dateFin} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Enregistrer</Button>
      </Form>
    </div>
  );
};

export default OuvertureParrainage;