
import { conexion } from '../db/conexion.js';

/* GET Usuarios*/
    const getUsuarios = async (req, res) =>{
    try {
        const sql = 'SELECT * FROM usuarios WHERE activo = 1';
        const [results] = await conexion.query(sql);
        console.log(results);
        res.json({
             ok: true, usuarios: results
            });

    } catch (error) {
        res.status(500).json({ message: 'Error del lado del servidor al traer los usuarios', error: error.message });
        console.log(error);
    }
}

/* GET Usuario con ID*/
const getUsuarioConId = async (req, res) => {
    try {
        const usuario_id = parseInt(req.params.usuario_id);
        console.log(usuario_id);
        if (Number.isNaN(usuario_id)) {
            return res.status(400)
                      .json({ ok: false, mensaje: 'ID inválido' });
        }   
        const sql = `SELECT * FROM usuarios WHERE usuario_id = ${usuario_id} AND activo = 1`;
        const [result] = await conexion.query(sql);
        if(result.length === 0){
            res.status(404)
            .json({ ok: false, mensaje: `No existe Usuario con el ID ${usuario_id}` })
            console.log(result);
        }else{
            console.log(result);
            res.json({ ok: true, usuario: result });
    } 
    } catch (error) {
        console.log(error);
        res.status(500)
        .json({ ok: false, mensaje: 'Error al obtener usuarios' });
    }
}
/* add(POST) Usuario nuevo*/
const addUsuario = async (req, res) => {
    try {
        const { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario } = req.body;

        const sql = `
        INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario) 
        VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await conexion.query(sql, [
        nombre, apellido, nombre_usuario, contrasenia, tipo_usuario
        ]);

        return res.status(201)
                .json({
                    ok: true,
                    message: `Se creó el usuario con el id ${result.insertId}`,
                    usuario_id: result.insertId
                });

    } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400)
                        .json({ ok: false, mensaje: `El nombre de usuario '${req.body.nombre_usuario}' ya existe` });
            }

            console.error(error);
            return res.status(500)
                .json({
                        ok: false,
                        mensaje: 'Error al crear usuario',
                        error: error.message
                    });
        }
};
/* edit(PUT) Usuario con ID*/
const editUsuario  = async (req, res) =>{

}
/* DELETE Usuario*/
const deleteUsuario = async (req, res) => {

}

export{getUsuarios, getUsuarioConId, addUsuario, editUsuario, deleteUsuario};

