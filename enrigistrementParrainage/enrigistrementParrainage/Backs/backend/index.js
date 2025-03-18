const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données MariaDB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parrainage'
});

db.connect(err => {
    if (err) {
        console.error('❌ Erreur de connexion à la base de données:', err);
    } else {
        console.log('✅ Connecté à MariaDB');
    }
});

// ✅ Vérification de l'électeur
app.post('/verifier-electeur', (req, res) => {
    const { numero_electeur, cin } = req.body;
    if (!numero_electeur || !cin) {
        return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires !" });
    }

    console.log("🔹 Données reçues :", numero_electeur, cin);

    const sql = "SELECT * FROM electeurs WHERE TRIM(numero_electeur) = TRIM(?) AND TRIM(cin) = TRIM(?)";
    db.query(sql, [numero_electeur, cin], (err, result) => {
        if (err) {
            console.error("❌ Erreur SQL :", err);
            return res.status(500).json({ error: err.message });
        }

        console.log("🔹 Résultat SQL :", result);

        if (result.length > 0) {
            res.json({ success: true, electeur: result[0] });
        } else {
            res.json({ success: false, message: 'Informations incorrectes' });
        }
    });
});

// ✅ Récupération des candidats
app.get('/candidats', (req, res) => {
    const sql = "SELECT * FROM candidats";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("❌ Erreur SQL :", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// ✅ Enregistrement du choix de parrainage
app.post('/enregistrer-parrainage', (req, res) => {
    const { numero_electeur, candidat_id } = req.body;

    if (!numero_electeur || !candidat_id) {
        return res.status(400).json({ success: false, message: "Tous les champs sont requis !" });
    }

    const sql = "INSERT INTO parrainages (numero_electeur, candidat_id) VALUES (?, ?)";
    db.query(sql, [numero_electeur, candidat_id], (err, result) => {
        if (err) {
            console.error("❌ Erreur SQL :", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, message: '✅ Parrainage enregistré avec succès' });
    });
});

app.listen(port, () => {
    console.log(`🚀 Serveur backend en cours d'exécution sur http://localhost:${port}`);
});
