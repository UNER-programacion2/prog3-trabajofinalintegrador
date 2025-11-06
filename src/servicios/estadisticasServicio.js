
import EstadisticasDb from "../db/estadisticasDb.js";

export default class EstadisticasServicio {
    constructor() {
        this.estadisticas = new EstadisticasDb();
    }

    async getReservasPorSalon() {
        return await this.estadisticas.getReservasPorSalon();
    }
  
    getIngresos = async() => {
        return await this.db.getIngresosUltimoMes()
    }
}