// Manejo del formulario de inicio de sesión
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Intento de inicio de sesión con:', email, password);

        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor de inicio de sesión:', data);
            if (data.success) {
                alert(data.message); // Muestra el mensaje de éxito

                // Actualizar la información del usuario en ../users.json
                readJSONFile('users.json').then(users => {
                    const updatedUsers = users.map(user => ({
                        ...user,
                        isLoggedIn: user.email === email ? true : user.isLoggedIn
                    }));

                    writeJSONFile('users.json', updatedUsers).then(() => {
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 1500); // Redirige a index.html después de 1.5 segundos
                    }).catch(error => {
                        console.error('Error al guardar los datos del usuario:', error);
                    });
                }).catch(error => {
                    console.error('Error al leer los usuarios:', error);
                });
            } else {
                alert("Credenciales incorrectas. Por favor, intenta nuevamente.");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud de inicio de sesión:', error);
            alert('Hubo un error en el inicio de sesión. Intenta nuevamente.');
        });
    });
}

// Manejo del cierre de sesión
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        fetch('logout.php', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Sesión cerrada correctamente.');
                window.location.href = 'login.html';
            } else {
                alert('Error al cerrar sesión. Intenta nuevamente.');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud de cierre de sesión:', error);
        });
    });
}


// Funciones para leer y escribir archivos JSON
function readJSONFile(filePath) {
    return fetch(filePath)
        .then(response => response.json())
        .catch(error => {
            console.error('Error al leer el archivo JSON:', error);
            return [];
        });
}

function writeJSONFile(filePath, data) {
    return fetch(filePath, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(error => {
        console.error('Error al escribir el archivo JSON:', error);
    });
}
