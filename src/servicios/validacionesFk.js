
import { conexion } from "../db/conexion.js";

export const validarFKsReserva = async ({ salon_id, usuario_id, turno_id }) => {
  const [salon] = await conexion.execute(
    "SELECT salon_id FROM salones WHERE salon_id = ? AND activo = 1",
    [salon_id]
  );
  if (salon.length === 0) throw new Error(`El salón con ID ${salon_id} no existe.`);

  const [usuario] = await conexion.execute(
    "SELECT usuario_id FROM usuarios WHERE usuario_id = ? AND activo = 1",
    [usuario_id]
  );
  if (usuario.length === 0) throw new Error(`El usuario con ID ${usuario_id} no existe.`);

  const [turno] = await conexion.execute(
    "SELECT turno_id FROM turnos WHERE turno_id = ? AND activo = 1",
    [turno_id]
  );
  if (turno.length === 0) throw new Error(`El turno con ID ${turno_id} no existe.`);
};