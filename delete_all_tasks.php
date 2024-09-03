<?php
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tasksFile = 'tasks.json';

    if (file_put_contents($tasksFile, json_encode([], JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No se pudieron eliminar las tareas.']);
    }
}
?>
