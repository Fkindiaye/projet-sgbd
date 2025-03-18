import fs from 'fs';
import crypto from 'crypto';
import csv from 'csv-parser';
import mysql from 'mysql2';
import iconv from 'iconv-lite';

// Configuration de la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_parrainage'
});

// Fonction pour vérifier l'empreinte SHA256
function verifierSHA256(fichierPath, empreinteAttendue) {
    const hash = crypto.createHash('sha256');
    const fichier = fs.createReadStream(fichierPath);

    fichier.on('data', (data) => {
        hash.update(data);
    });

    fichier.on('end', () => {
        const empreinteFichier = hash.digest('hex');
        if (empreinteFichier === empreinteAttendue) {
            console.log("L'empreinte SHA256 correspond !");
        } else {
            console.log("L'empreinte SHA256 ne correspond pas.");
        }
    });
}

// Fonction pour vérifier le format UTF-8
function verifierUTF8(fichierPath) {
    const buffer = fs.readFileSync(fichierPath);
    const fichierUTF8 = iconv.decode(buffer, 'utf8');
    if (fichierUTF8) {
        console.log("Le fichier est bien encodé en UTF-8.");
        return true;
    } else {
        console.log("Le fichier n'est pas encodé en UTF-8.");
        return false;
    }
}

// Fonction pour charger les données dans une table temporaire
function chargerCSVDansTableTemporaire(fichierPath) {
    const dataTemporaire = [];
    
    fs.createReadStream(fichierPath)
        .pipe(csv())
        .on('data', (row) => {
            dataTemporaire.push(row);
        })
        .on('end', () => {
            // Insérer les données dans la table temporaire
            dataTemporaire.forEach((row) => {
                const query = 'INSERT INTO temp_electeurs (nom, prenom, cin) VALUES (?, ?, ?)';
                db.execute(query, [row.nom, row.prenom, row.cin], (err) => {
                    if (err) {
                        console.log("Erreur lors de l'insertion dans la table temporaire:", err);
                    }
                });
            });
            console.log('Fichier CSV chargé dans la table temporaire.');
        });
}

// Exemple d'utilisation
const fichierCSV = 'path_to_your_file.csv';
const empreinteAttendue = 'votre_empreinte_sha256_attendue';

if (verifierUTF8(fichierCSV)) {
    verifierSHA256(fichierCSV, empreinteAttendue);
    chargerCSVDansTableTemporaire(fichierCSV);
}


// Fonction pour transférer les données de la table temporaire vers la table permanente
function transfererVersTablePermanente() {
    const query = `
        INSERT INTO electeurs (nom, prenom, cin)
        SELECT nom, prenom, cin
        FROM temp_electeurs;
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.log("Erreur lors du transfert des données vers la table permanente:", err);
        } else {
            console.log("Données transférées avec succès vers la table permanente.");
        }
    });
}
