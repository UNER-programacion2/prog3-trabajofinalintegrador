import express from 'express';

import UsuariosController from '../controllers/usuarios.js';
import { validarCreateUsuario, validarEditUsuario } from '../middleware/validators/usuariosValidator.js';
import { validarId } from '../middleware/validators/validacionId.js'
import autorizarUsuarios from '../middleware/auth/autorizarUsuarios.js';

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
        autorizarUsuarios(1),
        validarId('usuario_id'),
        validarEditUsuario,
        controller.putUsuario)

    // DELETE eliminar usuario            
    .delete(
        autorizarUsuarios(1),
        autorizarUsuarios(1),
        validarId('usuario_id'),
        controller.deleteUsuario); 

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */

export { usuariosRouter };