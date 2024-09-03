Gestión de Tareas
Gestión de Tareas es una aplicación web que permite a los usuarios registrarse, iniciar sesión, gestionar tareas y visualizar estadísticas sobre las mismas.

Objetivo
Desarrollar una plataforma para la gestión de tareas que permita a los usuarios registrarse, iniciar sesión, agregar nuevas tareas, ver una lista de tareas, editarlas, eliminarlas y realizar acciones de limpieza y estadísticas.

Tecnologías Utilizadas
HTML5
CSS3
JavaScript
PHP
JSON para almacenamiento de datos
Estructura del Proyecto
/gestiontareas
|-- add_task.php
|-- delete_all_tasks.php
|-- get_user.php
|-- index.php
|-- informetareas.json
|-- informetareas.php
|-- login.html
|-- login.js
|-- login.php
|-- logout.php
|-- register.html
|-- register.php
|-- save_task.php
|-- scripts.js
|-- tasks.js
|-- tasks.json
|-- tasks.php
|-- users.json
|-- styles.css
Archivos Clave
index.php: Página principal que muestra la interfaz de gestión de tareas.
login.html: Formulario de inicio de sesión.
register.html: Formulario de registro de usuario.
login.js: Script para manejar el inicio de sesión.
scripts.js: Script principal para la gestión de tareas.
tasks.js: Script para manejar las tareas específicas.
styles.css: Archivo de estilos para la aplicación.
Instrucciones de Instalación
Clona el repositorio: git clone (https://github.com/darkfusion1/gestiondetareas1)
Configura tu servidor local (XAMPP o similar) para que soporte PHP.
Asegúrate de que los archivos PHP puedan leer y escribir en tasks.json y users.json.
Uso
Para interactuar con todas las funcionalidades del sitio, sigue estos pasos:

Registro: Regístrate en register.html para crear una cuenta de usuario.
Inicio de Sesión: Inicia sesión en login.html con tu cuenta registrada.
Navegación:
Página Principal: Gestiona tareas en index.php.
Agregar Tareas: Añade nuevas tareas en la sección de tareas de index.php.
Lista de Tareas: Visualiza y gestiona tareas en la lista de tareas en index.php.
Acciones de Tareas: Marca tareas como completadas, elimina todas las tareas o vacía el informe en index.php.
Perfil del Usuario: Consulta y edita tu perfil en la sección correspondiente de index.php.
Nota: La mayoría de las funcionalidades, como la visualización de tareas y la adición de nuevas tareas, requieren que estés registrado e iniciado sesión. Sin una cuenta activa, no podrás acceder a estas funcionalidades.

Desafíos y Soluciones
Problema: La autenticación y gestión de usuarios con JSON en lugar de una base de datos SQL.

Solución: Implementé scripts PHP para manejar el registro, inicio de sesión y gestión de usuarios utilizando el archivo users.json.
Problema: Sincronización entre el estado de las tareas y la visualización en la página.

Solución: Utilicé JavaScript para actualizar la lista de tareas en tiempo real y PHP para manejar la lógica del servidor.
Documentación Adicional
Para más detalles, consulta los archivos CONTRIBUTING.md y otros documentos en la carpeta raíz.

Licencia
Este proyecto está licenciado bajo la Licencia MIT.
