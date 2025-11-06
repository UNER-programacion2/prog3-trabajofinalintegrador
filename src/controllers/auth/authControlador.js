import jwt from 'jsonwebtoken';
import passport from 'passport';


export default class LoginController {
  login = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, usuario, info) => {
      if (err || !usuario) {

        
        return res.status(400).json
        ({estado: false,
          mensaje: info
        });
      }

      req.login(usuario, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        
        const payload = {
          usuario_id: usuario.usuario_id,
          usuario: usuario.usuario,
          tipo_usuario: usuario.tipo_usuario
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({
          message: 'Login exitoso',
          token
        });
      });
    })(req, res);
  };
}
