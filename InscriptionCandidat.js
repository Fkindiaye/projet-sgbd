import React, { useState } from 'react';

const InscriptionCandidat = () => {
  const [numeroElecteur, setNumeroElecteur] = useState('');
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [parti, setParti] = useState('');
  const [slogan, setSlogan] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ numeroElecteur, email, nom, prenom, parti, slogan, photo });
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Inscription Candidat</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Numéro d'électeur :</label>
          <input type="text" value={numeroElecteur} onChange={(e) => setNumeroElecteur(e.target.value)} style={styles.input} required />

          <label style={styles.label}>Email :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />

          <label style={styles.label}>Nom :</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} style={styles.input} required />

          <label style={styles.label}>Prénom :</label>
          <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} style={styles.input} required />

          <label style={styles.label}>Parti politique :</label>
          <input type="text" value={parti} onChange={(e) => setParti(e.target.value)} style={styles.input} required />

          <label style={styles.label}>Slogan :</label>
          <input type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} style={styles.input} required />

          <label style={styles.label}>Photo :</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} style={styles.inputFile} />

          <button type="submit" style={styles.button}>S'inscrire</button>
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
    width: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
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
  inputFile: {
    marginTop: '5px',
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
};

export default InscriptionCandidat;
