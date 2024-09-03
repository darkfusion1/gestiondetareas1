<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['username'])) {
    echo json_encode([
        'loggedIn' => true,
        'username' => $_SESSION['username'],
        'email' => isset($_SESSION['email']) ? $_SESSION['email'] : 'Correo electrónico no disponible',
    ]);
} else {
    echo json_encode([
        'loggedIn' => false,
        'username' => null,
        'email' => 'Correo electrónico no disponible',
    ]);
}
?>
