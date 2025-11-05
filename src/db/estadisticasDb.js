// src/db/estadisticasDb.js

import {conexion} from "./conexion.js";

export default class EstadisticasDb {
  // Ya no acepta argumentos y ya no usa placeholder (?)
  async getReservasPorSalon() { 
    // La llamada no lleva '?' y no lleva argumentos en el segundo parámetro.
    const [result] = await conexion.query("CALL sp_estadistica_reservas_por_salon();");
    return result[0]; 
  }
};