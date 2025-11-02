import express from 'express';

import UsuariosController from '../controllers/usuarios.js';
import { validarCreateUsuario, validarEditUsuario } from '../middleware/usuariosValidator.js';
import { validarId } from '../middleware/validacionId.js'
import autorizarUsuarios from '../middleware/autorizarUsuarios.js';

const usuariosRouter = express.Router();
const controller = new UsuariosController();

// GET todos los usuarios
usuariosRouter.get('/', 
    autorizarUsuarios(1,2),
    controller.getAllUsuarios);

// POST crear usuario
usuariosRouter.post('/',
    autorizarUsuarios(1),
    validarCreateUsuario, 
    controller.postUsuario);

// Rutas con ID
usuariosRouter.route('/:usuario_id')
    // GET usuario por ID
    .get( 
        autorizarUsuarios(1),
        validarId('usuario_id'),
        controller.getUsuarioConId)

    // PUT actualizar usuario    
    .put( 
       // autorizarUsuarios(1),
        validarId('usuario_id'),
        validarEditUsuario,
        controller.putUsuario)

    // DELETE eliminar usuario            
    .delete(
        autorizarUsuarios(1),
        autorizarUsuarios(1),
        validarId('usuario_id'),
        controller.deleteUsuario); 

export { usuariosRouter };