
import express from 'express';
import { getUsuarios, getUsuarioConId, addUsuario, editUsuario, deleteUsuario } from '../controllers/usuario.js';
const usuariosRouter = express.Router();


usuariosRouter.get('/', getUsuarios);

usuariosRouter.post('/', addUsuario);

usuariosRouter.route('/:usuario_id')
    .get(getUsuarioConId)
    .put(editUsuario)
    .delete(deleteUsuario );

export {usuariosRouter};


