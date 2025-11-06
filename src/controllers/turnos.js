import turnosServicios from '../servicios/turnosServicio.js';
import { clearCache } from '../middleware/cache/cache.js';


export default class turnosController{
    constructor() {
        this.turnosServicios = new turnosServicios();
  }

// GET browser
    getTurnos = async (req, res) => {
        try {
            const turnos = await this.turnosServicios.getAllTurnos();
            res.json
                ({ ok: true, turnos: turnos});
        } catch (err) {
            console.log('error en GET/turnos',err);
            res.status(500).json
                ({ ok: false, mensaje: "Error al obtener turnos" });
        }
    };

// GET BY ID  
    getTurnoConId = async (req, res) => {
    try {
      const turno_id = req.params.turno_id;

      if (isNaN(turno_id))
        return res.status(400).json({ ok: false, mensaje: "ID inválido." });

      const turno = await this.turnosServicios.getTurnoConId(turno_id);

      if (turno.length === 0)
        return res.status(404).json({ ok: false, mensaje: "Turno no encontrado." });

      res.json({ ok: true, turno: turno[0] });
    } catch (error) {
      console.log("Error en GET /turnos/:turno_id", error);
      res.status(500).json({ ok: false, mensaje: "Error interno del servidor." });
    }
  };

    // POST 
    addTurno = async (req, res) => {
        try {
            const { orden, hora_desde, hora_hasta } = req.body;
            
            const turno = {
                orden, hora_desde, hora_hasta
            }

            const nuevoTurno = await this.turnosServicios.createTurno(turno);

            clearCache('/');

            if(!nuevoTurno){
                return res.status(400).json
                    ({estado: false, mensaje: 'Faltan campos requeridos.'})
            }

            res.json
                ({ ok: true, id: nuevoTurno.insertId, orden, hora_desde, hora_hasta });

        } catch (error) {
            console.log('Error en POST /turnos/:turno_id', error);
            res.status(500).json({ ok: false, mensaje: "Error al crear turno" });
        }
    };

    // PUT - editar
    updateTurno = async (req, res) => {
        try {
            const  turno_id = req.params.turno_id;
            const datos = req.body;
            
            const turnoModificado  = await this.turnosServicios.editTurno(turno_id, datos);

            clearCache('/');
            clearCache(`/turnos/${turno_id}`);
            
            if (turnoModificado.affectedRows === 0) {
            return res.status(404).json
                ({ ok: false, mensaje: "Turno no encontrado" });
            }

            res.json
                ({ ok: true, mensaje: "Turno actualizado" });

        } catch (error) {
            console.log('Error en PUT /turnos/:turno_id',error);
            res.status(500).json
                ({ ok: false, mensaje: "Error al actualizar turno" });
        }
    };

    // --------- DELETE 
    deleteTurno = async (req, res) => {
        try {
            const turno_id  = req.params.turno_id;
            const turnoEliminado = await this.turnosServicios.deleteTurno(turno_id);

            clearCache('/');
            clearCache(`/turnos/${turno_id}`)

            if (turnoEliminado.affectedRows === 0) {
            return res.status(404).json
                ({ ok: false, mensaje: "Turno no encontrado" });
            }

            res.json
                ({ ok: true, mensaje: "Turno eliminado" });

        } catch (error) {
            console.log('Error en DELETE /turnos', error);
            res.status(500).json
                ({ ok: false, mensaje: "Error al eliminar turno" });
        }
    };

}