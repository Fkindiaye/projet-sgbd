const db = require('../config/db');

// Récupérer tous les électeurs
exports.getAllElecteurs = (req, res) => {
    db.query('SELECT * FROM electeurs', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ajouter un électeur
exports.addElecteur = (req, res) => {
    const { cin, nom, prenom, date_naissance, adresse, telephone } = req.body;

    if (!cin || !nom || !prenom || !date_naissance) {
        return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
    }

    db.query(
        'INSERT INTO electeurs (cin, nom, prenom, date_naissance, adresse, telephone) VALUES (?, ?, ?, ?, ?, ?)',
        [cin, nom, prenom, date_naissance, adresse, telephone],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Électeur ajouté avec succès', id: results.insertId });
        }
    );
};
