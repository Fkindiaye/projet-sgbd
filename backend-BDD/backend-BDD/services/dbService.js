// src/services/dbService.js
const db = require('../db');

// Charger les données dans la table temporaire
function chargerCSVDansTableTemporaire(data) {
    const query = `
        INSERT INTO temp_electeurs (nom, prenom, cin)
        VALUES (?, ?, ?);
    `;
    return new Promise((resolve, reject) => {
        data.forEach((row) => {
            const { nom, prenom, cin } = row;
            db.execute(query, [nom, prenom, cin], (err, results) => {
                if (err) {
                    reject(err);
                }
            });
        });
        resolve("Données insérées dans la table temporaire.");
    });
}

// Transférer les données de la table temporaire vers la table permanente
function transfererVersTablePermanente() {
    const query = `
        INSERT INTO electeurs (nom, prenom, cin)
        SELECT nom, prenom, cin
        FROM temp_electeurs;
    `;
    return new Promise((resolve, reject) => {
        db.execute(query, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve("Données transférées vers la table permanente.");
        });
    });
}

// Nettoyer la table temporaire
function nettoyerTableTemporaire() {
    const query = "DELETE FROM temp_electeurs;";
    return new Promise((resolve, reject) => {
        db.execute(query, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve("Table temporaire nettoyée.");
        });
    });
}

module.exports = { chargerCSVDansTableTemporaire, transfererVersTablePermanente, nettoyerTableTemporaire };
