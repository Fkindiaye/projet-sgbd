// Importer les modules nécessaires
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Remplacez par votre mot de passe MySQL
    database: 'GestionParrainage'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});

// Endpoint pour enregistrer un candidat
app.post('/enregistrer-candidat', (req, res) => {
    // Récupérer les données du candidat depuis le corps de la requête
    const { cin, nom, prenom, date_naissance, email, telephone, parti_politique, slogan, photo, couleurs_partis, url_page } = req.body;

    // Vérifier que les champs obligatoires sont présents
    if (!cin || !nom || !prenom || !date_naissance || !email || !telephone) {
        return res.status(400).send('Tous les champs obligatoires doivent être renseignés.');
    }

    // Requête SQL pour insérer un candidat
    const query = `
        INSERT INTO Candidats (cin, nom, prenom, date_naissance, email, telephone, parti_politique, slogan, photo, couleurs_partis, url_page)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Exécuter la requête SQL
    db.query(query, [cin, nom, prenom, date_naissance, email, telephone, parti_politique, slogan, photo, couleurs_partis, url_page], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement du candidat :', err);
            return res.status(500).send('Erreur serveur lors de l\'enregistrement du candidat.');
        }

        // Si tout s'est bien passé, renvoyer une réponse de succès
        res.status(201).send('Candidat enregistré avec succès !');
    });
});

app.post('/enregistrer-candidat', (req, res) => {
    const { cin, nom, prenom, date_naissance, email, telephone, parti_politique, slogan, photo, couleurs_partis, url_page } = req.body;

    const query = 'INSERT INTO Candidats (cin, nom, prenom, date_naissance, email, telephone, parti_politique, slogan, photo, couleurs_partis, url_page) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [cin, nom, prenom, date_naissance, email, telephone, parti_politique, slogan, photo, couleurs_partis, url_page], (err, result) => {
        if (err) throw err;
        res.status(200).send('Candidat enregistré avec succès');
    });
});

app.get('/candidats', (req, res) => {
    const query = 'SELECT * FROM Candidats';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});