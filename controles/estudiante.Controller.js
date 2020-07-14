;
'use stric'

const  Estudiante  = require('../modelos/Estudiantes'), 
       path        = require('path'),
       { ObjectId } = require('mongodb'),
       fs          = require('fs'),
       { unlink }  = require('fs')

let getAll = (req, res) => {
    Estudiante.find()
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let getById = async (req, res) => {
    let id = new ObjectId(req.query.id)
    Estudiante.find({'_id': id})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let getByElement = async (req, res) => {
    let campos = req.query.campo
    let elemento = req.query.elemento

    Estudiante.find({'nombre': elemento})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let insertData = async (req, res) => {
    let datas = req.body.usuario
    
    if(!datas.password && datas.password == "")
    {
        return res.status(400).json({
            transaction: false,
            msg: 'Campos vacios!'
        })
    } else {
        Estudiante.create(datas)
        .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos guardados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
    }
}

let insertDataMany = async (req, res) => {
    let arrayPersons = req.body.data
    Estudiante.insertMany(arrayPersons)
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos guardados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let updateData = (req, res) => {
    let datas = req.body
    Estudiante.updateOne({'_id': new ObjectId(datas.id) }, datas.datosACambiar)
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos actualizados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let deleteData = async (req, res) => {
    let id = new ObjectId(req.query.id)
    Estudiante.deleteOne({ '_id': id})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos actualizados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

module.exports = {
    getAll,
    getById,
    getByElement,
    insertData,
    insertDataMany,
    updateData,
    deleteData
}