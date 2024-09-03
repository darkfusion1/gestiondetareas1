<?php
session_start();

// Inicializar variables
$isLoggedIn = false;
$username = '';
$email = '';

// Verificar si el usuario está logueado
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $isLoggedIn = true;
    $username = $_SESSION['username'] ?? ''; // Asegúrate de que el nombre de usuario esté en la sesión
    $email = $_SESSION['email'] ?? '';       // Asegúrate de que el correo electrónico esté en la sesión
}

// Leer el informe de tareas
$reportFile = 'informetareas.json';
$report = ['total_tareas' => 0, 'total_completadas' => 0]; // Valores por defecto
if (file_exists($reportFile)) {
    $json = file_get_contents($reportFile);
    $reportData = json_decode($json, true);
    if (is_array($reportData)) {
        $report = array_merge($report, $reportData); // Actualiza el informe si se leen correctamente
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Tareas</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <style>
        #chat-messages {
            border: 1px solid #ccc;
            padding: 10px;
            height: 200px;
            overflow-y: scroll;
            margin-top: 10px;
            display: none; /* Ocultar el chat por defecto */
        }

        #toggle-chat {
            margin-bottom: 10px;
        }

        #chat-form {
            margin-top: 10px;
        }

        /* Estilos para el Modal */
        #edit-task-modal {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            width: 80%;
            max-width: 500px;
            position: relative;
        }

        .close {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
        }

        .close:hover {
            color: red;
        }
    </style>
</head>
<body>
    <header>
        <h1>Gestión de Tareas</h1>
        <nav id="nav-links">
            <!-- El menú de navegación se actualizará con JavaScript -->
        </nav>
        <?php if ($isLoggedIn): ?>
            <form method="post">
                <button id="logout-btn" type="submit" name="logout">Cerrar Sesión</button>
            </form>
        <?php endif; ?>
    </header>

    <main id="main-content" style="<?php echo $isLoggedIn ? 'display: block;' : 'display: none;'; ?>">
        <section class="user-info">
            <h2>Información del Usuario</h2>
            <div id="user-details">
                <p>Nombre de usuario: <?php echo htmlspecialchars($username); ?></p>
                <p>Correo electrónico: <?php echo htmlspecialchars($email); ?></p>
            </div>
        </section>

        <section class="task-form">
            <h2>Agregar Nueva Tarea</h2>
            <form id="form-tarea">
                <input type="text" id="titulo" placeholder="Título de la Tarea" required>
                <textarea id="descripcion" placeholder="Descripción"></textarea>
                <button type="submit">Agregar Tarea</button>
            </form>
        </section>

        <section class="task-list">
            <h2>Lista de Tareas</h2>
            <ul id="lista-tareas"></ul>
        </section>

        <section class="task-actions">
            <h2>Acciones de Tareas</h2>
            <button id="complete-all-btn">Marcar Todas como Completadas</button>
            <button id="delete-all-btn">Eliminar Todas las Tareas</button>
            <button id="clear-report-btn">Vaciar Informe</button>
        </section>

        <section class="task-report">
            <h2>Informe de Tareas</h2>
            <p>Tareas Agregadas: <?php echo htmlspecialchars($report['total_tareas']); ?></p>
            <p>Tareas Completadas: <?php echo htmlspecialchars($report['total_completadas']); ?></p>
            <canvas id="chartTareas"></canvas>
        </section>

        <!-- Modal para Editar Tareas -->
        <div id="edit-task-modal" style="display: none;">
            <div class="modal-content">
                <span id="close-edit-modal" class="close">&times;</span>
                <h2>Editar Tarea</h2>
                <form id="edit-task-form">
                    <input type="hidden" id="edit-task-index" />
                    <label for="edit-title">Título:</label>
                    <input type="text" id="edit-title" required />
                    <label for="edit-description">Descripción:</label>
                    <textarea id="edit-description" required></textarea>
                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
        </div>
    </main>

    <div id="login-prompt" style="<?php echo $isLoggedIn ? 'display: none;' : 'display: block;'; ?>">
        <p>Necesitas estar logueado para gestionar las tareas. Puedes ingresar <a href="login.html">AQUÍ</a>. Si no tienes usuario, regístrate <a href="register.html">AQUÍ</a>.</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="scripts.js"></script>
</body>
</html>
