export default function autorizarUsuarios(...perfilAutorizados) {
  return (req, res, next) => {
    const usuarioArray = req.user;
    console.log('Usuario recibido en autorizarUsuarios:', usuarioArray);
    console.log('Perfiles autorizados:', perfilAutorizados);

    if (!usuarioArray || usuarioArray.length === 0) {
      return res.status(401).json({
        estado: "Falla",
        mensaje: "No autenticado. Se requiere token válido."
      });
    }
  
    const usuario = usuarioArray[0];

    const tipoUsuarioNum = parseInt(usuario.tipo_usuario, 10);
   
    if (!perfilAutorizados.includes(tipoUsuarioNum)) {
      return res.status(403).json({
        estado: "Falla",
        mensaje: "Acceso denegado. No tienes los permisos necesarios."
      });
    }

    next();
  };
}
