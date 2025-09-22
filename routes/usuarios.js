
import express from 'express';
import { getUsuarios, getUsuarioConId, addUsuario, editUsuario, deleteUsuario } from '../controllers/usuario.js';
const router = express.Router();

router.get('/', getUsuarios);
router.get('/:usuario_id', getUsuarioConId);
router.post('/', addUsuario);
router.put('/:usuario_id', editUsuario);
router.delete('/:usuario_id',  deleteUsuario );

export {router};


