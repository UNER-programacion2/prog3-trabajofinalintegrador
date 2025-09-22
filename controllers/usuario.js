import express from 'express';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath} from 'url';
import { readFile } from 'fs/promises';
import path from 'path';
import { conexion } from '../db/conexion.js';

/* GET Usuarios*/
    const getUsuarios = async (res, req) =>{
    try {
        const sql = 'SELECT * FROM usuarios WHERE activo = 1';
        const [results, fields] = await conexion.query(sql);
        // console.log(results); 
        // console.log(fields); 
        res.status(200).
        json({'ok':true, 'usuarios':results});

    } catch (error) {
        res.status(500).json({ message: 'Error del lado del servidor al traer los usuarios', error: err.message });
        console.log(error);
    }
}

/* GET Usuario con ID*/
const getUsuarioConId = async (req, res) => {
    try {
        const usuario_id = req.params.usuario_id
        const sql = `SELECT * FROM usuarios WHERE usuario_id = ${usuario_id} AND activo = 1`;
        const [results, fields] = await conexion.query(sql);
        console.log(results); console.log(fields);

        res.status(200)
        .json({ ok: true, usuario: results });
    } catch (error) {
        console.log(error);
        res.status(500)
        .json({ ok: false, mensaje: 'Error al obtener usuarios' });
    }
}

const addUsuario = async (req, res) => {

}
const editUsuario  = async (req, res) =>{

}

const deleteUsuario = async (req, res) => {

}

module.exports = {getUsuarios, getUsuarioConId, addUsuario, editUsuario, deleteUsuario};


process.loadEnvFile();
app.listen(process.env.PUERTO, () => {
    console.log(`Servidor iniciado en ${process.env.PUERTO}`);
})