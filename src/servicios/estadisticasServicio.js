import EstadisticasDb from "../db/estadisticasDb.js"

export default class EstadisticasServicio {
    constructor(){
        this.db = new EstadisticasDb();
    }
    
    getIngresos = async() => {
        return await this.db.getIngresosUltimoMes()
    }
}