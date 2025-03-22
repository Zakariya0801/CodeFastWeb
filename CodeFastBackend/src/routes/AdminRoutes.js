const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const {protect} = require('../middleware/AuthMiddleware');

// Protected routes - require authentication
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.post('/', adminController.createAdmin);
router.put('/:id', adminController.updateAdmin);
router.put('/:id/password', adminController.updatePassword);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;