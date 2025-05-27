// controllers/role.controller.js
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');
const RolePermission = require('../models/role_permission.model');

function getAllRoles(req, res) {
  try {
    const roles = Role.getAll();
    res.render('roles/index', { roles });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al obtener roles');
  }
}

function getRoleById(req, res) {
  const roleId = req.params.id;
  const role = Role.getById(roleId);

  if (!role) {
    return res.status(404).send('Rol no encontrado');
  }

  const permissions = RolePermission.getPermissionsByRoleId(roleId);

  res.render('roles/detail', { role, permissions });
}
  
  function renderNewRoleForm(req, res) {
    res.render('roles/new');
  }
  
  function renderEditRoleForm(req, res) {
  try {
    const role = Role.getById(req.params.id);
    if (!role) return res.status(404).send('Rol no encontrado');

    const allPermissions = Permission.getAll();
    const assignedPermissions = RolePermission.getPermissionsByRoleId(role.id).map(p => p.id);

    res.render('roles/edit', { role, allPermissions, assignedPermissions });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al cargar el formulario');
  }
}
  
  function createRole(req, res) {
    try {
      Role.create(req.body);
      res.redirect('/roles');
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(400).send('Error al crear: ' + err.message);
    }
  }
  
  function updateRole(req, res) {
  try {
    const { name, permisos } = req.body;
    Role.update(req.params.id, { name });

    const permisosArray = Array.isArray(permisos) ? permisos.map(Number) : (permisos ? [Number(permisos)] : []);
    const role = Role.getById(req.params.id);
    if (!role) {
      return res.status(404).send('Rol no encontrado');
    }
    console.log(`Rol: ${req.params.id}`);
    console.log(`Permisos:`, permisosArray);
    RolePermission.setPermissionsForRole(req.params.id, permisosArray);

    res.redirect('/roles');
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(400).send('Error al actualizar el rol: ' + err.message);
  }
}
  
  function deleteRole(req, res) {
    try {
      Role.remove(req.params.id);
      res.redirect('/roles');
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(500).send('Error al eliminar');
    }
  }

//   function updateRolePermissions(req, res) {
//     const roleId = req.params.id;
//     const selectedPermissions = req.body.permissions || [];

//     const permissionIds = Array.isArray(selectedPermissions)
//         ? selectedPermissions.map(id => parseInt(id))
//         : [parseInt(selectedPermissions)];

//     Role.setPermissions(roleId, permissionIds);
//     res.redirect(`/roles/${roleId}/edit`);
// }

function getRoleDetail(req, res) {
    const role = Role.getById(req.params.id);
    if (!role) return res.status(404).send('Rol no encontrado');

    const permissions = db.prepare(`
        SELECT p.* FROM permissions p
        JOIN role_permission rp ON p.id = rp.permiso_id
        WHERE rp.rol_id = ?
    `).all(role.id);

    res.render('roles/detail', { role, permissions });
}
  
  module.exports = {
    getAllRoles,
    getRoleById,
    renderNewRoleForm,
    renderEditRoleForm,
    createRole,
    updateRole,
    deleteRole,
    // updateRolePermissions,
    getRoleDetail
  };