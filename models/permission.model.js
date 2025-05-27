const db = require('../config/db');
const chalk = require('chalk');

function getAll() {
    const permissions = db.prepare('SELECT * FROM permissions').all();
    console.log(chalk.blue(`[DB] ${permissions.length} permissions encontrados`));
    return permissions;
}

function getById(id) {
    const permission = db.prepare('SELECT * FROM permissions WHERE id = ?').get(id);
    console.log(permission ? chalk.blue(`[DB] Permiso ID ${id} encontrado`) : chalk.yellow(`[DB] Permiso ID ${id} no encontrado`));
    return permission;
}

function create({ nombre }) {
    if (!nombre || nombre.length < 3) throw new Error('Nombre del permiso inválido');
    try {
        const result = db.prepare('INSERT INTO permissions (nombre) VALUES (?)').run(nombre);
        console.log(chalk.green(`[DB] permiso creado con ID ${result.lastInsertRowid}`));
        return result;
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            throw new Error('Ya existe un permiso con ese nombre');
        }
        throw err;
    }
}

function update(id, { nombre }) {
    if (!nombre || nombre.length < 3) throw new Error('Nombre del permiso inválido');
    const result = db.prepare('UPDATE permissions SET nombre = ? WHERE id = ?').run(nombre, id);
    console.log(chalk.cyan(`[DB] permiso ID ${id} actualizado (${result.changes} cambio/s)`));
    return result;
}

function remove(id) {
    const result = db.prepare('DELETE FROM permissions WHERE id = ?').run(id);
    console.log(chalk.red(`[DB] permiso ID ${id} eliminado (${result.changes} cambio/s)`));
    return result;
}

module.exports = { getAll, getById, create, update, remove };