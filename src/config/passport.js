import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalSrategy } from 'passport-local';

import UsuariosServicios from '../servicios/usuariosServicios.js';


// Estrategia LOCAL:
const estrategia = new LocalSrategy({
      usernameField: 'nombre_usuario',  
      passwordField: 'contrasenia',
},    
  async (nombre_usuario, contrasenia, done) => {
        try {
          const userService = new UsuariosServicios();
          const usuarios = await userService.getUsuarios(nombre_usuario, contrasenia);

          if (!usuarios || usuarios.length === 0) {
            return done(null, false, { mensaje: 'Login incorrecto' });
          }
          const usuario = usuarios[0];
          return done(null, usuario, { mensaje: 'Login correcto' });

        } catch (error) {
          return done(error);
        }

})

const validacion = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET 

    },
    async (jwtPayload, done) => { 
      try {
        const userService = new UsuariosServicios();
        const usuario = await userService.getUsuarioConId(jwtPayload.usuario_id);

        if (!usuario || usuario.length === 0) {
          return done(null, false, { mensaje: 'Token incorrecto'});
        }
        return done(null, usuario);

      } catch (error) {
        return done(error, false);
      }
    }
  );
  
export { estrategia, validacion };