
import express from 'express';
import UsuariosController from '../controllers/usuarios.js';

const usuariosRouter = express.Router();
const controller = new UsuariosController();

// GET todos los usuarios
usuariosRouter.get('/', controller.getUsuarios);

// POST crear usuario
usuariosRouter.post('/', controller.postUsuario);

// Rutas con ID
usuariosRouter.route('/:usuario_id')
    .get(controller.getUsuarioConId)   // GET usuario por ID
    .put(controller.putUsuario)        // PUT actualizar usuario
    .delete(controller.deleteUsuario); // DELETE eliminar usuario

export { usuariosRouter };