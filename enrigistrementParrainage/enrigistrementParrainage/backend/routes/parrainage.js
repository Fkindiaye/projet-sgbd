const express = require('express');
const router = express.Router();
const db = require('../db');
const nodemailer = require('nodemailer');

router.post('/envoyer-otp', async (req, res) => {
  const { email, telephone, numeroElecteur, candidatId } = req.body;
  const codeOTP = Math.floor(10000 + Math.random() * 90000); // Génère un code 5 chiffres

  try {
    await db.query('INSERT INTO parrainages (numero_electeur, candidat_id, code_otp) VALUES (?, ?, ?)', 
      [numeroElecteur, candidatId, codeOTP]);

    // Configuration de l'email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'tonemail@gmail.com', pass: 'tonmotdepasse' }
    });

    await transporter.sendMail({
      from: 'tonemail@gmail.com',
      to: email,
      subject: 'Votre code de validation',
      text: `Votre code OTP est : ${codeOTP}`
    });

    res.json({ message: 'Code OTP envoyé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi du code' });
  }
});
router.post('/valider', async (req, res) => {
    const { numeroElecteur, candidatId, otp } = req.body;
  
    try {
      const [rows] = await db.query('SELECT * FROM parrainages WHERE numero_electeur = ? AND candidat_id = ? AND code_otp = ?', 
        [numeroElecteur, candidatId, otp]);
  
      if (rows.length > 0) {
        await db.query('UPDATE parrainages SET valide = 1 WHERE numero_electeur = ? AND candidat_id = ?', [numeroElecteur, candidatId]);
        res.json({ message: 'Parrainage validé avec succès !' });
      } else {
        res.status(400).json({ message: 'Code OTP incorrect' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  
module.exports = router;
