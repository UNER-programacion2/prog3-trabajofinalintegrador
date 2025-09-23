
import express from 'express';
import { getUsuarios, getUsuarioConId, addUsuario, editUsuario, deleteUsuario } from '../controllers/usuario.js';
const usuariosRouter = express.Router();

usuariosRouter.get('/', getUsuarios);
usuariosRouter.get('/:usuario_id', getUsuarioConId);
usuariosRouter.post('/', addUsuario);
usuariosRouter.put('/:usuario_id', editUsuario);
usuariosRouter.delete('/:usuario_id',  deleteUsuario );

export {usuariosRouter};


