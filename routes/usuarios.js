const express = require('express');
const router = express.Router();
const { getUsuarios, getUsuarioConId, addUsuario, editUser, deleteUser } = require('../controllers/userController');
 
router.get('/', getUsuarios);
router.get('/:usuario_id', getUsuarioConId);
router.post('/', addUsuario);
router.put('/:usuario_id', editUser);
router.delete('/:usuario_id', deleteUser);

module.exports = router;


