import express from 'express';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath} from 'url';
import { readFile } from 'fs/promises';
import path from 'path';
import { conexion } from '../db/conexion.js';

/* GET Usuarios*/
    const getUsuarios = async (req, res) =>{
    try {
        const sql = 'SELECT * FROM usuarios WHERE activo = 1';
        const [results] = await conexion.query(sql);
        console.log(results);
        res.status(200);  
        res.json({
             ok: true, usuarios: results
            });

    } catch (error) {
        res.status(500).json({ message: 'Error del lado del servidor al traer los usuarios', error: error.message });
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

        res.json({ ok: true, usuario: results });
    } catch (error) {
        console.log(error);
        res.status(500)
        .json({ ok: false, mensaje: 'Error al obtener usuarios' });
    }
}
/* add(POST) Usuario nuevo*/
const addUsuario = async (req, res) => {

}

/* edit(PUT) Usuario con ID*/
const editUsuario  = async (req, res) =>{

}
/* DELETE Usuario*/
const deleteUsuario = async (req, res) => {

}

export{getUsuarios, getUsuarioConId, addUsuario, editUsuario, deleteUsuario};

