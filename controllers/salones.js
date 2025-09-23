//BREAD SALONES
//import express from 'express';
import { ok } from 'assert';
import { conexion } from '../db/conexion.js';


//GET SALONES 
const getSalones =  async(req, res) => {
    try {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [results] = await conexion.query(sql);
        res.json
            ({ok:true, salones :results});

    } catch (err) {
        console.log(err);
    }
}

 //GET BY ID 
const getSalonConId = async (req, res) => {
    try {
        const salon_id = req.params.salon_id
        const sql = `SELECT * FROM salones WHERE activo = 1 and salon_id = ?`;
        const valores = [salon_id];

        const [results] = await conexion.execute(sql,valores);
      
        if (results.length === 0) {
            return res.status(404).json
                ({ estado: false, mensaje: 'salon no encontrado'})
        }
        res.json
            ({ ok: true, salones: results [0] });

    } catch (error) {
        console.log('error en GET/salones/:salon_id', error);
        res.status(500).json
            ({ ok: false, mensaje: 'Error interno del servidor' });
    }
}

//POST
const postSalon = async (req, res)=>{    
    try{
        if(!req.body.titulo || !req.body.direccion || !req.body.capacidad || !req.body.importe){
            return res.status(400).json
                ({estado: false, mensaje: 'Faltan campos requeridos.'})
        }

        const {titulo, direccion, capacidad, importe} = req.body;
        const valores = [titulo, direccion, capacidad, importe];
        const sql = 'INSERT INTO salones (titulo, direccion, capacidad, importe) VALUES (?,?,?,?)';
        const [result]= await conexion.execute(sql, valores);
        
        res.status(201).json
            ({estado: true, mensaje: `Salón creado con id ${result.insertId}.`})

    }catch (err) {
        console.log('Error en POST /salones', err);
        res.status(500).json
            ({estado: false,mensaje: 'Error interno del servidor.'})
    }

}


//PUT
const putSalon = async (req, res)=>{    
    try{
        const salon_id = req.params.salon_id;
        const sql = `SELECT * FROM salones WHERE activo = 1 and salon_id = ?`;
                
        const [results] = await conexion.execute(sql, [salon_id]);
                
        if(results.length === 0){
            return res.status(404).json({estado: false, mensaje: 'El salón no existe.'})
        }

        if(!req.body.titulo || !req.body.direccion || !req.body.capacidad || !req.body.importe){
            return res.status(400).json
            ({estado: false, mensaje: 'Faltan campos requeridos.'})
        }
        
        const {titulo, direccion, capacidad, importe} = req.body;
        
        const valores = [titulo, direccion, capacidad, importe, salon_id];
        const sql2 = `UPDATE salones SET titulo = ?, direccion = ?, capacidad = ? , importe = ? WHERE salon_id = ?`;

        const [result]= await conexion.execute(sql2, valores);
        //console.log(result) 

        if (result.changedRows === 0) {
            return res.status(200).json
                ({estado: true,mensaje: `no se realizaron cambios en el salon: ${salon_id}.`});
        }
        res.status(200).
            json({estado: true, mensaje: `Salón modificado. id ${salon_id}`});
            
    }catch(err) {
        console.log('Error en PUT /salones/:salon_id', err);
        res.status(500).json
            ({estado: false,mensaje: 'Error interno del servidor.'})
    }
};



//DELETE

// const deleteSalon = async (req, res)=>{    
//     try{
//         }

//     }catch () {
      
       

// }deleteSalon



export{getSalones, getSalonConId, postSalon, putSalon};