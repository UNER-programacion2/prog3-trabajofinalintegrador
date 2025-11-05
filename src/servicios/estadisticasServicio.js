// src/services/EstadisticasServicio.js

import EstadisticasDb from "../db/estadisticasDb.js";

export default class EstadisticasServicio {
    constructor() {
        this.estadisticas = new EstadisticasDb();
    }

    // El método ya no acepta 'salon_id'
    async getReservasPorSalon() {
        // Llama a la capa de datos sin argumentos
        return await this.estadisticas.getReservasPorSalon();
    }
}