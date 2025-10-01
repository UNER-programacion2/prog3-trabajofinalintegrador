import express from "express";
import { getTurnos, getTurnoConId, addTurno, updateTurno, deleteTurno } from "../controllers/turnos.controller.js";

const router = express.Router();

router.get("/turnos", getTurnos);
router.get("/turnos/:id", getTurnoConId);
router.post("/turnos", addTurno);
router.put("/turnos/:id", updateTurno);
router.delete("/turnos/:id", deleteTurno);

export default router;
