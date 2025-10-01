import { conexion } from "../db/conexion.js";

// GET
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
        const { id } = req.params;
        const sql = "SELECT * FROM turnos WHERE id = ? AND activo = 1";
        const [results] = await conexion.query(sql, [id]);

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
        const { fecha, salon_id, servicio_id, cliente } = req.body;
        const sql = "INSERT INTO turnos (fecha, salon_id, servicio_id, cliente, activo) VALUES (?, ?, ?, ?, 1)";
        const [result] = await conexion.query(sql, [fecha, salon_id, servicio_id, cliente]);

        res.json({ ok: true, id: result.insertId, fecha, salon_id, servicio_id, cliente });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, mensaje: "Error al crear turno" });
    }
};

    // PUT 
    const updateTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha, salon_id, servicio_id, cliente } = req.body;

        const sql = "UPDATE turnos SET fecha=?, salon_id=?, servicio_id=?, cliente=? WHERE id=? AND activo=1";
        const [result] = await conexion.query(sql, [fecha, salon_id, servicio_id, cliente, id]);

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
        const { id } = req.params;
        const sql = "UPDATE turnos SET activo=0 WHERE id=?";
        const [result] = await conexion.query(sql, [id]);

        if (result.affectedRows === 0) {
        return res.status(404).json({ ok: false, mensaje: "Turno no encontrado" });
        }

        res.json({ ok: true, mensaje: "Turno eliminado (lógico)" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, mensaje: "Error al eliminar turno" });
    }
};

export { getTurnos, getTurnoConId, addTurno, updateTurno, deleteTurno };
