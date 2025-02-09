-- Création de la base de données
CREATE DATABASE elections;
USE elections;

-- Création de la table PeriodeParrainage
CREATE TABLE PeriodeParrainage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL
);

-- Insertion des données
INSERT INTO PeriodeParrainage (date_debut, date_fin)
VALUES ('2025-09-09', '2025-12-31');

-- Vérification des données insérées
SELECT * FROM PeriodeParrainage;
