export default function autorizarUsuarios ( perfilAutorizados = [] ) {

    return (req, res, next) => {

        console.log('Usuario recibido en autorizarUsuarios:', req.user);
        const usuario = req.user;

        if(!usuario || !perfilAutorizados.includes(usuario.tipo_usuario)) {
            return res.status(403).json({
                estado:"Falla",
                mensaje:"Acceso denegado.No tienes los permisos necesarios"
            }) 
        }

        next(); 
    }
}