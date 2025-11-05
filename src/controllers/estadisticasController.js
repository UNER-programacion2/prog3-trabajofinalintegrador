import EstadisticasServicio from "../servicios/estadisticasServicio.js";

export default class EstadisticasController {
    
    constructor (){
        this.servicio = new EstadisticasServicio();
    }

    getReservasPorSalon = async (req, res) => {
    

        try {
            // Llama al servicio sin argumentos
            const resultado = await this.servicio.getReservasPorSalon();
            res.json(resultado);
        } catch (error) {
            console.error("Error al obtener estadísticas:", error); 
            res.status(500).send("Error interno del servidor.");
        }
    }
}