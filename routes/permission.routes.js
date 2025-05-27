const express = require('express');
const router = express.Router();
const controller = require('../controllers/permission.controller');

router.get('/', controller.getAllPermissions);
router.get('/new', controller.renderNewPermissionForm);
router.get('/:id/edit', controller.renderEditPermissionForm);
router.get('/:id', controller.getPermissionById);
router.post('/', controller.createPermission);
router.post('/:id', controller.updatePermission);
router.post('/:id/delete', controller.deletePermission);

module.exports = router;