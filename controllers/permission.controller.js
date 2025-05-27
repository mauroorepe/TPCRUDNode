const Permission = require('../models/permission.model');

function getAllPermissions(req, res) {
    try {
        const permissions = Permission.getAll();
        res.render('permissions/index', { permissions });
    } catch (err) {
        console.error('[Error]', err.message);
        res.status(500).send('Error al obtener Permiso');
    }
}

function getPermissionById(req, res) {
    try {
        const permission = Permission.getById(req.params.id);
        if (!permission) return res.status(404).send('Permiso no encontrado');
        res.render('permissions/detail', { permission });
    } catch (err) {
        console.error('[Error]', err.message);
        res.status(500).send('Error al buscar el permiso');
    }
}

function renderNewPermissionForm(req, res) {
    res.render('permissions/new');
}

function renderEditPermissionForm(req, res) {
    try {
        const permission = Permission.getById(req.params.id);
        if (!permission) return res.status(404).send('Permiso no encontrado');
        res.render('permissions/edit', { permission });
    } catch (err) {
        console.error('[Error]', err.message);
        res.status(500).send('Error al cargar formulario');
    }
}

function createPermission(req, res) {
    try {
        const { nombre } = req.body;
        if (!nombre || nombre.length < 3) {
            throw new Error('Nombre del permiso inválido');
        }

        Permission.create({ nombre });
        console.log("Permiso creado");
        res.redirect('/permissions');
    } catch (err) {
        console.error('[Error]', err.message);
        res.status(400).send('Error al crear: ' + err.message);
    }
}

function updatePermission(req, res) {
    try {
        Permission.update(req.params.id, req.body);
        res.redirect('/permissions');
    } catch (err) {
        console.error('[Error]', err.message);
        res.status(400).send('Error al actualizar: ' + err.message);
    }
}

function deletePermission(req, res) {
    try {
        Permission.remove(req.params.id);
        res.redirect('/permissions');
    } catch (err) {
        console.error('[Error]', err.message);
        res.status(500).send('Error al eliminar');
    }
}

module.exports = {
    getAllPermissions,
    getPermissionById,
    renderNewPermissionForm,
    renderEditPermissionForm,
    createPermission,
    updatePermission,
    deletePermission
};