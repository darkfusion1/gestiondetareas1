<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tasks = file_get_contents('php://input');
    file_put_contents('tasks.json', $tasks);
    echo "Tareas guardadas";
}
?>
