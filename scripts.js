document.addEventListener('DOMContentLoaded', function() {
    const formTarea = document.getElementById('form-tarea');
    const listaTareas = document.getElementById('lista-tareas');
    const completeAllBtn = document.getElementById('complete-all-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const clearReportBtn = document.getElementById('clear-report-btn');
    const taskReportList = document.getElementById('task-report-list');
    const editTaskModal = document.getElementById('edit-task-modal');
    const closeEditModalBtn = document.getElementById('close-edit-modal');
    const editTaskForm = document.getElementById('edit-task-form');
    const editTaskIndex = document.getElementById('edit-task-index');
    const editTitle = document.getElementById('edit-title');
    const editDescription = document.getElementById('edit-description');

    function updateTaskList() {
        fetch('tasks.php', { method: 'GET' })
            .then(response => response.json())
            .then(tasks => {
                listaTareas.innerHTML = '';
                tasks.forEach((task, index) => {
                    const li = document.createElement('li');
                    li.id = `task-${index}`;
                    li.style.color = task.completed ? 'green' : 'black';
                    li.innerHTML = `
                        <span class="task-title">${task.title}</span>: 
                        <span class="task-description">${task.description}</span> 
                        - ${task.completed ? 'Completada' : 'Pendiente'}
                        <button class="modify-task-btn" data-id="${index}">Modificar</button>
                        <button class="delete-task-btn" data-id="${index}">Eliminar</button>
                    `;
                    listaTareas.appendChild(li);
                });
            });
    }

    function renderReports() {
        fetch('informetareas.json', { method: 'GET' })
            .then(response => response.json())
            .then(report => {
                document.getElementById('total-tareas').textContent = `Tareas Agregadas: ${report.total_tareas}`;
                document.getElementById('total-completadas').textContent = `Tareas Completadas: ${report.total_completadas}`;
            })
            .catch(error => {
                console.error('Error al cargar el informe de tareas:', error);
            });
    }

    formTarea.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('titulo').value;
        const description = document.getElementById('descripcion').value;

        fetch('tasks.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateTaskList();
                renderReports();
                document.getElementById('titulo').value = '';
                document.getElementById('descripcion').value = '';
            } else {
                console.error('Error al agregar tarea:', data.message);
            }
        });
    });

    listaTareas.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-task-btn')) {
            const taskId = event.target.getAttribute('data-id');
            fetch('tasks.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ index: taskId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    updateTaskList();
                    renderReports();
                } else {
                    console.error('Error al eliminar tarea:', data.message);
                }
            });
        } else if (event.target.classList.contains('modify-task-btn')) {
            const taskId = event.target.getAttribute('data-id');
            fetch('tasks.php', { method: 'GET' })
                .then(response => response.json())
                .then(tasks => {
                    const task = tasks[taskId];
                    editTaskIndex.value = taskId;
                    editTitle.value = task.title;
                    editDescription.value = task.description;
                    editTaskModal.style.display = 'flex';
                });
        }
    });

    editTaskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const index = editTaskIndex.value;
        const title = editTitle.value;
        const description = editDescription.value;

        fetch('tasks.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index: index, title: title, description: description })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateTaskList();
                editTaskModal.style.display = 'none';
                renderReports();
            } else {
                console.error('Error al modificar tarea:', data.message);
            }
        });
    });

    closeEditModalBtn.addEventListener('click', function() {
        editTaskModal.style.display = 'none';
    });

    completeAllBtn.addEventListener('click', function() {
        fetch('tasks.php', { method: 'PATCH' })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    updateTaskList();
                    renderReports();
                } else {
                    console.error('Error al marcar todas como completadas:', data.message);
                }
            });
    });

    deleteAllBtn.addEventListener('click', function() {
        fetch('tasks.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'deleteAll' })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateTaskList();
                renderReports();
            } else {
                console.error('Error al eliminar todas las tareas:', data.message);
            }
        });
    });

    clearReportBtn.addEventListener('click', function() {
        fetch('informetareas.php', { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    renderReports(); // Actualiza el informe vacío
                } else {
                    console.error('Error al vaciar informe:', data.message);
                }
            })
            .catch(error => {
                console.error('Error al vaciar el informe:', error);
            });
    });

    // Manejo del botón de cerrar sesión
    const logoutBtn = document.getElementById('logout-btn'); // Asume que tienes un botón con este ID

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            fetch('logout.php', { method: 'GET' }) // Cambia el método si es necesario
                .then(response => {
                    if (response.ok) {
                        window.location.href = 'index.php'; // Redirige a la página de inicio
                    } else {
                        console.error('Error al cerrar sesión.');
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud de cierre de sesión:', error);
                });
        });
    }

    updateTaskList();
    renderReports();
});
