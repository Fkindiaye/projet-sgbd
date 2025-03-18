import express from 'express';
import mysql from 'mysql2';
import multer from 'multer';
import fs from 'fs';
import crypto from 'crypto';
import iconv from 'iconv-lite';

const app = express();
const port = 3000; // Change le port si nécessaire

// Configurer l'upload des fichiers CSV
const upload = multer({ dest: 'uploads/' });

// Connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_parrainage',
});

// Fonction pour vérifier l'empreinte SHA256 et l'encodage UTF-8 du fichier
function verifyFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);

  // Vérification de l'empreinte SHA256
  const sha256Hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

  // Vérification de l'encodage UTF-8
  let encoding = 'Non-UTF-8';
  try {
    iconv.decode(fileBuffer, 'utf8');
    encoding = 'UTF-8';
  } catch (err) {
    // L'encodage reste "Non-UTF-8"
  }

  return { sha256: sha256Hash, encoding: encoding };
}

// API pour uploader et vérifier le fichier
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier envoyé');
  }

  const filePath = req.file.path;
  const { sha256, encoding } = verifyFile(filePath);

  const sql = 'CALL ControlerFichierElecteurs(?, ?)';
  connection.query(sql, [sha256, encoding], (error) => {
    if (error) {
      console.error('Erreur dans l\'exécution de la procédure:', error);
      return res.status(500).send('Erreur dans l\'exécution de la procédure : ' + error.sqlMessage);
    }
    res.json({
      message: "Fichier vérifié avec succès.",
      sha256: sha256,
      encoding: encoding
    });
    
  });
});

// Route pour exécuter la procédure ControlerElecteurs
app.post('/controler-electeurs', (req, res) => {
  const sql = 'CALL ControlerElecteurs()';

  connection.query(sql, (error) => {
    if (error) {
      console.error('Erreur lors de l\'exécution de la procédure ControlerElecteurs:', error);
      return res.status(500).send('Erreur lors de l\'exécution de la procédure : ' + error.sqlMessage);
    }

    res.json({ message: "La procédure ControlerElecteurs a été exécutée avec succès." });
  });
});

// Route pour exécuter la procédure ControlerValiderImportation
app.post('/controler-valider-importation', (req, res) => {
  const sql = 'CALL ControlerValiderImportation()';

  connection.query(sql, (error) => {
    if (error) {
      console.error('Erreur lors de l\'exécution de ControlerValiderImportation:', error);
      return res.status(500).send('Erreur: ' + error.sqlMessage);
    }
    res.json({ message: 'Importation validée avec succès !' });

  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
