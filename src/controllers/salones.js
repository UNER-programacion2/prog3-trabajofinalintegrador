//BREAD SALONES
import SalonesServicios from '../servicios/salonesServicios.js';
import { clearCache } from '../middleware/cache/cache.js';

//GET SALONES - OBTENER TODOS LOS SALONES
export default class salonesController{

    constructor() {
    this.SalonesServicios = new SalonesServicios();
  }
    
    getSalones =  async(req, res) => {
        try {
            const salones = await this.SalonesServicios.getAllSalones();
            res.json
                ({estado:true, datos :salones});

        } catch (error) {
            console.log('error en GET/salones', error);
            res.status(500).json
                ({ estado: false, mensaje: 'Error interno del servidor.' });
        }
    }   

 //GET BY ID - OBTENER MEDIANTE EL ID
    getSalonConId = async (req, res) => {
        try {
            const id = req.params.salon_id;
            const salon = await this.SalonesServicios.getSalonConId(id);
        
            if (!salon) {
                return res.status(404).json
                    ({ estado: false, mensaje: 'Salon no encontrado.'})
            }
            res.json
                ({ estado: true, salon: salon});

        } catch (error) {
            console.log('error en GET/salones/:salon_id', error);
            res.status(500).json
                ({ estado: false, mensaje: 'Error interno del servidor.' });
        }
    }

//POST - CREAR SALON 
    createSalon = async (req, res)=>{    
        try{
            const {titulo, direccion, capacidad, importe} = req.body;

            const salon = {
                titulo, direccion, capacidad, importe
            }

            const nuevoSalon = await this.SalonesServicios.createSalon(salon);
            
            clearCache('/');
            
            if(!nuevoSalon){
                return res.status(400).json
                    ({estado: false, mensaje: 'Faltan campos requeridos.'})
            }

            res.status(201).json
                ({estado: true, mensaje: `Salón creado con id. ${nuevoSalon.insertId}` })

        }catch (error) {
            console.log('Error en POST /salones.', error);
            res.status(500).json
                ({estado: false,mensaje: 'Error interno del servidor.'})
        }

    }


//PUT - EDITAR SALON
    editSalon = async (req, res)=>{    
        try{
            const salon_id = req.params.salon_id;
            const datos = req.body;

            const salonModificado= await this.SalonesServicios.editSalon(salon_id, datos);
            
            clearCache('/');
            clearCache(`/salones/${salon_id}`);
            
            if(!salonModificado){
                return res.status(400).json
                    ({estado: false, mensaje: 'Salón no encontrado.'})
            }

            res.status(200).json
                ({estado: true, mensaje: `Salón modificado con id. ${salon_id}` });
                
        }catch(error) {
            console.log('Error en PUT /salones/:salon_id', error);
            res.status(500).json
                ({estado: false,mensaje: 'Error interno del servidor.'})
        }
    }



//DELETE - ELIMINAR SALON(soft delete)
 deleteSalon = async (req, res)=>{    
        try{
            const salon_id = req.params.salon_id;
            const salonElimniado = await this.SalonesServicios.deleteSalon(salon_id);

            clearCache('/');
            clearCache(`/salones/${salon_id}`);
           
            if(salonElimniado.affectedRows === 0){
                return res.status(404).json
                    ({estado: false, mensaje: 'El salon no existe o ya fue eliminado.'})
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

