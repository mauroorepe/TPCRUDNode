const User = require('../models/user.model');
const Role = require('../models/role.model');
const RolePermission = require('../models/role_permission.model');

function getAllUsers(req, res) {
  try {
    const { limit, offset, search, role } = req.query;
    const users = User.getAll({ limit, offset, search, role });
    res.render('users/index', { users });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al obtener usuarios');
  }
}

function getUserById(req, res) {
  try {
    const user = User.getById(req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');

    const role = Role.getById(user.role_id);
    const permissions = RolePermission.getPermissionsByRoleId(role.id); // no por userId

    res.render('users/detail', { user, role, permissions });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al cargar usuario');
  }
}
// function getUserById(req, res) {
//   try {
//     const user = User.getById(req.params.id);
//     if (!user) return res.status(404).send('Usuario no encontrado');
//     res.render('users/detail', { user });
//   } catch (err) {
//     console.error('[Error]', err.message);
//     res.status(500).send('Error en la búsqueda');
//   }
// }

function createUser(req, res) {
  try {
    User.create(req.body);
    res.redirect('/users');
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(400).send('Error al crear: ' + err.message);
  }
}

function updateUser(req, res) {
  try {
    User.update(req.params.id, req.body);
    res.redirect('/users');
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(400).send('Error al actualizar: ' + err.message);
  }
}

function deleteUser(req, res) {
  try {
    User.softDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al eliminar');
  }
}

function renderNewUserForm(req, res) {
  try {
    const roles = Role.getAll();
    res.render('users/new', { roles });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al cargar formulario');
  }
}

function renderEditUserForm(req, res) {
  try {
    const user = User.getById(req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');

    const roles = Role.getAll();
    res.render('users/edit', { user, roles });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al cargar el formulario');
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, renderNewUserForm, renderEditUserForm };