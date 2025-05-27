# 🛡️ App de Gestión de Usuarios, Roles y Permisos

Aplicación web desarrollada en Node.js + Express + SQLite3 que permite la gestión de usuarios, asignación de roles y permisos. Incluye CRUD completo para cada entidad.

## 📦 Tecnologías utilizadas

- Node.js
- Express.js
- EJS (motor de plantillas)
- SQLite3
- Bootstrap 5 (para estilos)
- Chalk (para logs de consola)

## 🗂️ Estructura del proyecto

├── app.js
├── package.json
├── package-lock.json
├── /Bin
│    └── wwww
├── /config
│ └── db.js
├── /controllers
│ ├── user.controller.js
│ ├── role.controller.js
│ └── permission.controller.js
├── /models
│ ├── user.model.js
│ ├── role.model.js
│ ├── permission.model.js
│ └── role_permission.model.js
├── /routes
│ ├── user.routes.js
│ ├── role.routes.js
│ └── permission.routes.js
├── /views
│ ├── /users
│ ├── /roles
│ └── /permissions
└── /public
└── /stylesheets

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

Instala las dependencias:

npm install

Ejecuta la aplicación:

npm start

Accedé en tu navegador a: http://localhost:3000

🧱 Base de Datos
Este proyecto usa SQLite. La base de datos se encuentra en:

/config/db.sqlite
⚠️ Si es la primera vez que corrés el proyecto, asegurate de tener las tablas creadas.

Tablas principales
users — Usuarios del sistema

roles — Roles disponibles

permissions — Permisos disponibles

role_permission — Tabla intermedia entre roles y permisos

🔧 Funcionalidades
👥 Usuarios
Crear, editar, eliminar usuarios

Asignarles un rol al momento de crearlos o editarlos

Ver los permisos que tiene cada usuario según su rol

🧑‍⚖️ Roles
Crear, editar, eliminar roles

Asignar múltiples permisos a cada rol desde una lista de checkboxes

Visualizar los permisos asignados

🔐 Permisos
CRUD de permisos

Validación para evitar permisos duplicados

🧪 Ejemplo de uso
Crear permisos como: Creacion, Edicion, Borrado, Lectura

Crear un rol Administrador y asignarle todos los permisos

Crear un usuario y asignarle el rol Administrador

Ver el detalle del usuario: muestra automáticamente los permisos del rol

📝 To-Do / Mejoras futuras
Autenticación de usuarios (login)

Middleware para proteger rutas según permisos

Buscador y paginación

🤝 Autor
Desarrollado por Mauro Repetto – Junior Developer

