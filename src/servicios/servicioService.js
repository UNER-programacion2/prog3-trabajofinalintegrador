import serviciosDb from "../db/serviciosDB.js";

export default class serviciosServicios {

    constructor() {
        this.servicios = new serviciosDb();
        
    }

    getAllServicios = () => {
        return this.servicios.getServicios();
    }

    getServicioConId = (servicio_id) => {
        return this.servicios.getServicioConId(servicio_id);
    }

    createServicio = (data) => {
        return this.servicios.addServicio(data);
    }

    editServicio = async (servicio_id, datos) => {
        const exist = await this.servicios.getServicioConId(servicio_id);
        if (!exist) {
            return null; 
        }

        return this.servicios.editServicio(servicio_id, datos);
    }

    deleteServicio = (servicio_id) => {
        return this.servicios.deleteServicio(servicio_id);
    }
}