import { conexion } from "../db/conexion.js";

// GET browser
const getTurnos = async (req, res) => {
    try {
        const sql = "SELECT * FROM turnos WHERE activo = 1";
        const [results] = await conexion.query(sql);
        res.json({ ok: true, turnos: results });
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, mensaje: "Error al obtener turnos" });
    }
};

// GET BY ID  
const getTurnoConId = async (req, res) => {
    try {
        const { turno_id} = req.params;
        const sql = "SELECT * FROM turnos WHERE turno_id = ? AND activo = 1";
        const [results] = await conexion.query(sql, [turno_id]);

        if (results.length === 0) {
        return res.status(404).json({ ok: false, mensaje: "Turno no encontrado" });
        }

        res.json({ ok: true, turno: results[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, mensaje: "Error al obtener turno" });
    }
};

    // POST 
    const addTurno = async (req, res) => {
    try {
        const { orden, hora_desde, hora_hasta } = req.body;
        const sql = "INSERT INTO `turnos` (`orden`,`hora_desde`,`hora_hasta`,`activo`,`creado`) VALUES (?, ?, ?, 1, NOW())";
        const [result] = await conexion.query(sql, [orden, hora_desde, hora_hasta]);

        res.json({ ok: true, id: result.insertId, orden, hora_desde, hora_hasta });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, mensaje: "Error al crear turno" });
    }
};

    // PUT 
    const updateTurno = async (req, res) => {
    try {
        const { turno_id } = req.params;
        const { orden, hora_desde, hora_hasta } = req.body;

        const sql = "UPDATE `turnos` SET `orden` = ?, `hora_desde` = ?, `hora_hasta` = ?, `modificado` = NOW() WHERE `turno_id` = ? AND `activo` = 1";
        const [result] = await conexion.query(sql, [orden, hora_desde, hora_hasta, turno_id]);
        if (result.affectedRows === 0) {
        return res.status(404).json({ ok: false, mensaje: "Turno no encontrado" });
        }

        res.json({ ok: true, mensaje: "Turno actualizado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, mensaje: "Error al actualizar turno" });
    }
};

    // --------- DELETE 
    const deleteTurno = async (req, res) => {
    try {
        const { turno_id } = req.params;
        const sql = "UPDATE turnos SET activo=0 WHERE turno_id=?";
        const [result] = await conexion.query(sql, [turno_id]);

        if (result.affectedRows === 0) {
        return res.status(404).json({ ok: false, mensaje: "Turno no encontrado" });
        }

        res.json({ ok: true, mensaje: "Turno eliminado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, mensaje: "Error al eliminar turno" });
    }
};

export { getTurnos, getTurnoConId, addTurno, updateTurno, deleteTurno };
