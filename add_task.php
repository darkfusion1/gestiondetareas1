<?php
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $username = $_SESSION['username'] ?? 'anonimo';

    $tasksFile = 'tasks.json';

    $tasks = file_exists($tasksFile) ? json_decode(file_get_contents($tasksFile), true) : [];

    $tasks[] = [
        'user' => $username,
        'title' => $titulo,
        'description' => $descripcion,
        'completed' => false,
        'timestamp' => date('Y-m-d H:i:s')
    ];

    if (file_put_contents($tasksFile, json_encode($tasks, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No se pudo guardar la tarea.']);
    }
}
?>
