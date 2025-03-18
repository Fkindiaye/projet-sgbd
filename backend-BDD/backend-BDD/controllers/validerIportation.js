const mysql = require('mysql2');

// Crée la connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_parrainage'
});

// Fonction pour exécuter la procédure ValiderImportation
const validerImportation = (req, res) => {
    // Appel de la procédure stockée
    connection.query('CALL ValiderImportation()', (error, results, fields) => {
        if (error) {
            console.error('Erreur lors de l\'exécution de la procédure:', error);
            return res.status(500).send('Une erreur est survenue lors de l\'importation.');
        }

        // Si l'importation a réussi
        console.log('Importation réussie');
        return res.status(200).send('L\'importation a été validée avec succès.');
    });
};

// Exporter la fonction du contrôleur
module.exports = {
    validerImportation
};
