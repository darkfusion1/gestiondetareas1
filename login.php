<?php
session_start();
header('Content-Type: application/json');

// Leer los datos JSON de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Leer usuarios desde el archivo JSON
$users = json_decode(file_get_contents('users.json'), true);

// Buscar al usuario con el correo electrónico proporcionado
$userFound = false;
foreach ($users as $user) {
    if ($user['email'] === $email) {
        $userFound = $user;
        break;
    }
}

if ($userFound && password_verify($password, $userFound['password'])) {
    $_SESSION['loggedin'] = true;
    $_SESSION['username'] = $userFound['username']; // Ajusta esto según tu lógica de autenticación
    $_SESSION['email'] = $email;

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas.']);
}
?>
