import jwt from 'jsonwebtoken';
import passport from 'passport';


export default class LoginController {
  login = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, usuario, info) => {
      if (err || !usuario) {
        return res.status(400).json({
          message: info?.message || 'Error de autenticación'
        });
      }

      req.login(usuario, { session: false }, (err) => {
        if (err) return next(err);

        // 🔹 Arma un payload claro y seguro
        const payload = {
          usuario_id: usuario.usuario_id,
          usuario: usuario.usuario,
          tipo_usuario: usuario.tipo_usuario
        };

        // 🔹 Firma el JWT con tu secreto y expiración
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({
          message: 'Login exitoso',
          token
        });
      });
    })(req, res, next);
  };
}
