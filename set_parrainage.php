<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date_debut = $_POST["date_debut"];
    $date_fin = $_POST["date_fin"];

    // Vérification que date_debut >= 6 mois après aujourd’hui et date_fin > date_debut
    $six_mois_plus_tard = date('Y-m-d', strtotime('+6 months'));
    if ($date_debut < $six_mois_plus_tard || $date_fin <= $date_debut) {
        echo json_encode(["status" => "error", "message" => "Dates invalides"]);
        exit;
    }

    // Insertion dans la base de données
    $sql = "INSERT INTO PeriodeParrainage (date_debut, date_fin) VALUES ('$date_debut', '$date_fin')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Période enregistrée"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erreur : " . $conn->error]);
    }
}
?>
