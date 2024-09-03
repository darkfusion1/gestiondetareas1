<?php
$reportFile = 'informetareas.json';
$reports = json_decode(file_get_contents($reportFile), true) ?? [];

header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode($reports);
        break;

    case 'DELETE':
        // Vaciar el archivo
        file_put_contents($reportFile, json_encode([]));
        echo json_encode(['success' => true]);
        break;

    // Otras operaciones según tu necesidad
}
?>
