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
     getReporteIngresos = async (req, res) => {
        try {
            const reporte = await this.servicio.getIngresos(); 
            
            if (!reporte || reporte.total_ingresos_30_dias === null) {
                 return res.status(200).json({ 
                     mensaje: "No se registraron ingresos en los últimos 30 días.",
                     total: 0 
                 });
            }
            
            res.status(200).json({
                mensaje: "Total de ingresos generados en los últimos 30 días:",
                total: reporte.total_ingresos_30_dias 
            });

        } catch (error) {
            res.status(500).json({ mensaje: 'Error al generar reporte', error: error.message });
        }
  }
}

