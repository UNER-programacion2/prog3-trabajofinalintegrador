import express from 'express';

import UsuariosController from '../controllers/usuarios.js';
import { cacheMinutes} from '../middleware/cache.js';
import { validarCreateUsuario, validarEditUsuario } from '../middleware/usuariosValidator.js';
import { validarId } from '../middleware/validacionId.js'



const usuariosRouter = express.Router();
const controller = new UsuariosController();

// GET todos los usuarios
usuariosRouter.get('/', 
    cacheMinutes,
    controller.getUsuarios);

// POST crear usuario
usuariosRouter.post('/',
    validarCreateUsuario, 
    controller.postUsuario);

// Rutas con ID
usuariosRouter.route('/:usuario_id')
    // GET usuario por ID
    .get( 
        validarId('usuario_id'),
        cacheMinutes,
        controller.getUsuarioConId)

    // PUT actualizar usuario    
    .put( 
        validarId('usuario_id'),
        validarEditUsuario,
        controller.putUsuario)

    // DELETE eliminar usuario            
    .delete(
        validarId('usuario_id'),
        controller.deleteUsuario); 

export { usuariosRouter };