const db = require('../config/db');
const chalk = require('chalk');

function getPermissionsByRoleId(roleId) {
    return db.prepare(`
    SELECT p.* FROM permissions p
    JOIN role_permission rp ON p.id = rp.permiso_id
    WHERE rp.rol_id = ?
`).all(roleId);
}

function getPermissionsByUserId(userId){
    return db.prepare(`
    SELECT p.* FROM permissions p
    JOIN role_permission rp ON p.id = rp.permiso_id
    WHERE rp.rol_id = ?
`).all(roleId);
}

function setPermissionsForRole(roleId, permissionIds) {
    const deleteStmt = db.prepare('DELETE FROM role_permission WHERE rol_id = ?');
    const insertStmt = db.prepare('INSERT INTO role_permission (rol_id, permiso_id) VALUES (?, ?)');

    const transaction = db.transaction((roleId, permissionIds) => {
        deleteStmt.run(roleId);
        for (const pid of permissionIds) {
            insertStmt.run(roleId, pid);
        }
    });

    transaction(roleId, permissionIds);
    console.log(chalk.green(`[DB] Permisos actualizados para el rol ID ${roleId}`));
}

module.exports = {
    getPermissionsByRoleId,
    setPermissionsForRole
};