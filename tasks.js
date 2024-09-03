document.addEventListener('DOMContentLoaded', function() {
    const formTarea = document.getElementById('form-tarea');
    const listaTareas = document.getElementById('lista-tareas');
    const completeAllBtn = document.getElementById('complete-all-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const taskReportList = document.getElementById('task-report-list');
    const editTaskModal = document.getElementById('edit-task-modal');
    const editTaskForm = document.getElementById('edit-task-form');
    const editTitleInput = document.getElementById('edit-title');
    const editDescriptionInput = document.getElementById('edit-description');
    const editTaskIndexInput = document.getElementById('edit-task-index');

    let reports = JSON.parse(localStorage.getItem('taskReports')) || [];

    function updateTaskList() {
        fetch('tasks.php', { method: 'GET' })
            .then(response => response.json())
            .then(tasks => {
                listaTareas.innerHTML = '';
                tasks.forEach((task, index) => {
                    const li = document.createElement('li');
                    li.id = `task-${index}`;
                    li.className = task.completed ? 'completed-task' : 'pending-task';
                    li.innerHTML = `
                        <span class="task-title">${task.title}</span>: 
                        <span class="task-description">${task.description}</span> 
                        - ${task.completed ? 'Realizada' : 'Pendiente'}
                        <button class="modify-task-btn" data-id="${index}">Modificar</button>
                        <button class="delete-task-btn" data-id="${index}">Eliminar</button>
                    `;
                    listaTareas.appendChild(li);
                });
            });
    }

    function updateTaskReport() {
        taskReportList.innerHTML = '';
        reports.forEach(report => {
            const li = document.createElement('li');
            li.textContent = `Título: ${report.title}, Hora: ${report.time}, Estado: ${report.completed ? 'Completa' : 'Pendiente'}`;
            li.className = report.completed ? 'completed-report' : 'pending-report';
            taskReportList.appendChild(li);
        });
    }

    function markTaskAsComplete(index) {
        fetch('tasks.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index: index, completed: true })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateTaskList();
                const report = {
                    title: `Tarea ${index}`,
                    time: new Date().toLocaleString(),
                    completed: true
                };
                reports.push(report);
                localStorage.setItem('taskReports', JSON.stringify(reports));
                updateTaskReport();
            }
        });
    }

    function deleteTask(index) {
        fetch('tasks.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index: index })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateTaskList();
            }
        });
    }

    function addTask(title, description) {
        fetch('tasks.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description, completed: false })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateTaskList();
            }
        });
    }

    function editTask(index, title, description) {
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
            }
        });
    }

    formTarea.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('titulo').value;
        const description = document.getElementById('descripcion').value;
        addTask(title, description);
        formTarea.reset();
    });

    completeAllBtn.addEventListener('click', function() {
        document.querySelectorAll('.pending-task').forEach(taskElement => {
            const index = taskElement.id.replace('task-', '');
            markTaskAsComplete(index);
        });
    });

    deleteAllBtn.addEventListener('click', function() {
        document.querySelectorAll('.task-list li').forEach(taskElement => {
            const index = taskElement.id.replace('task-', '');
            deleteTask(index);
        });
    });

    listaTareas.addEventListener('click', function(event) {
        const target = event.target;
        const index = target.getAttribute('data-id');

        if (target.classList.contains('modify-task-btn')) {
            // Mostrar modal de edición
            fetch('tasks.php', { method: 'GET' })
                .then(response => response.json())
                .then(tasks => {
                    const task = tasks[index];
                    editTitleInput.value = task.title;
                    editDescriptionInput.value = task.description;
                    editTaskIndexInput.value = index;
                    editTaskModal.style.display = 'block';
                });
        } else if (target.classList.contains('delete-task-btn')) {
            deleteTask(index);
        }
    });

    editTaskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const index = editTaskIndexInput.value;
        const title = editTitleInput.value;
        const description = editDescriptionInput.value;
        editTask(index, title, description);
    });

    document.getElementById('close-edit-modal').addEventListener('click', function() {
        editTaskModal.style.display = 'none';
    });

    // Funcionalidad del chat
    const toggleChatBtn = document.getElementById('toggle-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const chatMessageInput = document.getElementById('chat-message');

    toggleChatBtn.addEventListener('click', function() {
        if (chatMessages.style.display === 'none') {
            chatMessages.style.display = 'block';
        } else {
            chatMessages.style.display = 'none';
        }
    });

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = chatMessageInput.value;
        const user = '<?php echo htmlspecialchars($username); ?>'; // Usar el nombre de usuario del PHP

        fetch('chat.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: user, text: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                chatMessageInput.value = '';
                chatMessages.innerHTML += `<p><strong>${user}:</strong> ${message}</p>`;
            }
        });
    });

    updateTaskList();
    updateTaskReport();
});
document.addEventListener('DOMContentLoaded', function() {
    // Renderiza el informe de tareas al cargar la página
    renderReports();
    
    document.getElementById('complete-all-btn').addEventListener('click', function() {
        fetch('tasks.php', { method: 'PATCH' })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Actualiza el informe
                    renderReports();
                } else {
                    console.error('Error al marcar todas como completadas:', data.message);
                }
            });
    });
});

function renderReports() {
    fetch('informetareas.json')
        .then(response => response.json())
        .then(informe => {
            const reportSection = document.querySelector('.task-report');
            reportSection.innerHTML = `
                <h2>Informe de Tareas</h2>
                <p>Tareas Agregadas: ${informe.total_tareas}</p>
                <p>Tareas Completadas: ${informe.total_completadas}</p>
            `;
        });
}