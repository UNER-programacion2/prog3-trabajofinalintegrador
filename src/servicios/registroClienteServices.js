import RegistroClienteDb from "../db/registroClienteDb.js";

export default class registroClienteServicios{

    constructor(){
        this.registroCliente = new RegistroClienteDb();
    }
    
    
    //Registramos nuevo cliente
    createCliente = (data) => {
        return this.registroCliente.postCliente(data);
    }
}