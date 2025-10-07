//BREAD SALONES
import SalonesServicios from "../servicios/salonesServicios.js";

//GET SALONES 

export default class salonesController{

    constructor() {
    this.SalonesServicios = new SalonesServicios();
  }
    
    getSalones =  async(req, res) => {
        try {
            const salones = await this.SalonesServicios.getSalones();
            res.json
                ({ok:true, salones :salones});
        } catch (error) {
            console.log('error en GET/salones', error);
            res.status(500).json
                ({ ok: false, mensaje: 'Error interno del servidor' });
        }
    }   

 //GET BY ID 
    getSalonConId = async (req, res) => {
        try {
            const id = req.params.salon_id;
           const salon = await this.SalonesServicios.getSalonConId(id);
        
            if (salon.length === 0) {
                return res.status(404).json
                    ({ estado: false, mensaje: 'salon no encontrado'})
            }
            res.json
                ({ ok: true, salones: salon [0] });

        } catch (error) {
            console.log('error en GET/salones/:salon_id', error);
            res.status(500).json
                ({ ok: false, mensaje: 'Error interno del servidor' });
        }
    }

//POST
    postSalon = async (req, res)=>{    
        try{
            const {titulo, direccion, capacidad, importe} = req.body;
            if(!titulo || !direccion || !capacidad || !importe){
                return res.status(400).json
                    ({estado: false, mensaje: 'Faltan campos requeridos.'})
            }

            const result= await this.SalonesServicios.postSalones({titulo, direccion, capacidad, importe});
            res.status(201).json
                ({estado: true, mensaje: `Salón creado con id ${result.insertId}.`})

        }catch (error) {
            console.log('Error en POST /salones', error);
            res.status(500).json
                ({estado: false,mensaje: 'Error interno del servidor.'})
        }

    }


//PUT
    putSalon = async (req, res)=>{    
        try{
            const salon_id = req.params.salon_id;
            const {titulo, direccion, capacidad, importe} = req.body;
            
            if(!titulo || !direccion || !capacidad || !importe){
                return res.status(400).json
                ({estado: false, mensaje: 'Faltan campos requeridos.'})
            }

            const result= await this.SalonesServicios.putSalones(salon_id, { titulo, direccion, capacidad, importe });
            
            if(result.length === 0){
                return res.status(404).json({estado: false, mensaje: 'El salón no existe'})
            }

            //solo para saber si no hizo ningun cambio, se guarda como estaba
            if (result.changedRows === 0) {
                return res.status(200).json
                    ({estado: true,mensaje: `no se realizaron cambios en el salon: ${salon_id}.`});
            }
            res.status(200).json
                ({estado: true, mensaje: `Salón modificado. id ${salon_id}`});
                
        }catch(error) {
            console.log('Error en PUT /salones/:salon_id', error);
            res.status(500).json
                ({estado: false,mensaje: 'Error interno del servidor.'})
        }
    }



//DELETE
 deleteSalon = async (req, res)=>{    
        try{
            const salon_id = req.params.salon_id;
            const results = await this.SalonesServicios.deleteSalones(salon_id);
           
            if(results.affectedRows === 0){
                return res.status(404).json
                    ({estado: false, mensaje: 'El salon no existe o ya fue eliminado'})
            }
           
            //console.log(resultado)

            res.status(200).json
                ({estado: true, mensaje: `Salón eliminado. id ${salon_id}`});

        }catch (error) {
            console.log('Error en DELETE /salones', error);
            res.status(500).json
                ({estado: false,mensaje: 'Error interno del servidor.'})
        }

    }


}


//export{getSalones, getSalonConId, postSalon, putSalon, deleteSalon};