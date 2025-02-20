import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConnexionCandidat = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'authentification
    if (email === 'test@example.com' && code === '123456') {
      navigate('/tableau-de-bord'); // Rediriger vers le tableau de bord
    } else {
      setMessage('Code ou email incorrect.');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Connexion Candidat</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Code d'authentification :</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Se connecter</button>
          {message && <p style={styles.error}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

// 🎨 STYLES EN OBJETS (CSS intégré)
const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    margin: 0,
  },
  container: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '350px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '22px',
    color: '#333',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '14px',
  },
};

export default ConnexionCandidat;
