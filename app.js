const express = require('express');
const path = require('path');
const morgan = require('morgan');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const createError = require('http-errors');
const permissionRoutes = require('./routes/permission.routes');

// Instancia de la app
const app = express();

// Configuracion de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuracion de entorno 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuracion de rutas
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/permissions', permissionRoutes);


// Configuracion de redireccion (por defecto)
app.get('/', (req, res) => {
  res.redirect('/users');
});

// Middleware de error 404
app.use((req, res, next) => {
  next(createError(404, 'Ruta no encontrada'));
});

// Manejador de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('general_error', { message: err.message, error: app.get('env') === 'development' ? err : {} });
});

module.exports = app;