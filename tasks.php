<?php
session_start();

$tasksFile = 'tasks.json';
$reportFile = 'informetareas.json';
$tasks = json_decode(file_get_contents($tasksFile), true) ?? [];
$report = json_decode(file_get_contents($reportFile), true) ?? ['total_tareas' => 0, 'total_completadas' => 0];

header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode($tasks);
        break;
    
    case 'POST':
        $newTask = json_decode(file_get_contents('php://input'), true);
        $tasks[] = array_merge($newTask, ['completed' => false]);
        file_put_contents($tasksFile, json_encode($tasks));
        updateReport();
        echo json_encode(['success' => true]);
        break;
    
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['index'])) {
            array_splice($tasks, $data['index'], 1);
            file_put_contents($tasksFile, json_encode($tasks));
            updateReport();
            echo json_encode(['success' => true]);
        } elseif (isset($data['action']) && $data['action'] === 'deleteAll') {
            $tasks = [];
            file_put_contents($tasksFile, json_encode($tasks));
            updateReport();
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid request']);
        }
        break;

    case 'PATCH':
        foreach ($tasks as &$task) {
            $task['completed'] = true;
        }
        file_put_contents($tasksFile, json_encode($tasks));
        updateReport();
        echo json_encode(['success' => true]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['index'])) {
            $tasks[$data['index']] = array_merge($tasks[$data['index']], $data);
            file_put_contents($tasksFile, json_encode($tasks));
            updateReport();
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid request']);
        }
        break;

    case 'POST':
        if (isset($_POST['action']) && $_POST['action'] === 'clearReport') {
            $report = ['total_tareas' => 0, 'total_completadas' => 0];
            file_put_contents($reportFile, json_encode($report));
            echo json_encode(['success' => true]);
        }
        break;
}

function updateReport() {
    global $tasks, $reportFile;
    $totalTasks = count($tasks);
    $completedTasks = count(array_filter($tasks, fn($task) => $task['completed']));

    $report = [
        'total_tareas' => $totalTasks,
        'total_completadas' => $completedTasks
    ];

    file_put_contents($reportFile, json_encode($report));
}
?>
