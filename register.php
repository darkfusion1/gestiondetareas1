<?php
header('Content-Type: application/json');

// Obtén los datos del registro
$data = json_decode(file_get_contents('php://input'), true);

// Verifica si los datos son válidos
if (isset($data['username']) && isset($data['email']) && isset($data['password'])) {
    $username = $data['username'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT); // Hashea la contraseña

    // Carga los usuarios existentes
    $usersFile = 'users.json';
    $users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

    // Agrega el nuevo usuario
    $users[] = [
        'username' => $username,
        'email' => $email,
        'password' => $password,
    ];

    // Guarda los usuarios actualizados
    file_put_contents($usersFile, json_encode($users));

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
?>
