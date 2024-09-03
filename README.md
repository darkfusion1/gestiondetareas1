# Gestion de tareas

Gestión de Tareas es una aplicación web que permite a los usuarios registrarse, iniciar sesión, gestionar tareas y visualizar estadísticas sobre las mismas. 

## Objetivo

Desarrollar una plataforma para la gestión de tareas que permita a los usuarios registrarse, iniciar sesión, agregar nuevas tareas, ver una lista de tareas, editarlas, eliminarlas y realizar acciones de limpieza y estadísticas.

## Tecnologías Utilizadas

HTML5
CSS3
JavaScript
PHP
JSON para almacenamiento de datos

## Estructura del Proyecto

/gestiontareas
-- css
-- styles.css
-- js
-- login.js
-- scripts.js
-- tasks.js
-- php
-- add_task.php
-- delete_all_tasks.php
-- get_user.php
-- informetareas.php
-- login.php
-- logout.php
-- register.php
-- save_task.php
-- tasks.php
-- data
-- informetareas.json
-- tasks.json
-- users.json
-- index.php
-- login.html
-- register.html



## Instrucciones de Instalación

1. Clona el repositorio: `git clone https://github.com/tuusuario/TechSpot-Web.git`
2. Configura tu servidor local (XAMPP o similar) para que soporte PHP.
3. Asegúrate de que los archivos PHP puedan leer y escribir en `users.json`.

## Uso

Para interactuar con todas las funcionalidades del sitio, debes seguir estos pasos:

1. **Registro**:
   - Regístrate en `register.html` para crear una cuenta de usuario.
2. **Inicio de Sesión**:
   - Inicia sesión en `login.html` con tu cuenta registrada.
3. **Index**:
   - **Informacion de usuario**: Refleja la informacion del usuario logeado`.
   - **Agregar Nueva Tarea**: Agrega una nueva tarea`.
   - **Acciones de tareas**: Realiza la accion de marcar , eliminar todas las tareas y vaciar informe`.
   - **Informe De Tareas**: Indica la cantidad de tareas agregadas y tareas completas`.

## Desafíos y Soluciones

- **Problema**: La autenticación y gestión de usuarios con JSON en lugar de una base de datos SQL.
  - **Solución**: Implementé scripts PHP para manejar el registro, inicio de sesión y gestión de usuarios utilizando el archivo users.json.

- **Problema**: Sincronización entre el estado de las tareas y la visualización en la página.
  - **Solución**: Utilicé JavaScript para actualizar el carrito en tiempo real y PHP para manejar la lógica del servidor.

## Documentación Adicional

Para más detalles, consulta los archivos `CONTRIBUTING.md` y otros documentos en la carpeta raíz.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

