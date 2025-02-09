<?php
$host = "localhost";
$user = "root"; 
$password = ""; 
$database = "elections";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("Échec de connexion: " . $conn->connect_error);
}
?>
