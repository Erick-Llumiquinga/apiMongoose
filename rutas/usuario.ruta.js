;
'use strict'
const express = require('express');

let authMiddleware = require('../controles/middleware/auth'),
    passwordMiddleware = require('../controles/middleware/password'),
    permissionMiddleware = require('../controles/middleware/permissions')

let api = express.Router(),
    usuarioControl = require('../controles/usuarios.control');

api.get('/getUsers', [authMiddleware.autentificar], usuarioControl.getAll)
api.post('/insertMany', [authMiddleware.autentificar], usuarioControl.insertDataMany)
api.post('/insertOne', [authMiddleware.autentificar, passwordMiddleware.encritpPass], usuarioControl.insertData)
api.put('/updateOne', [authMiddleware.autentificar], usuarioControl.updateData)
api.get('/findOne', [authMiddleware.autentificar], usuarioControl.getById)
api.get('/findElement', [authMiddleware.autentificar], usuarioControl.getByElement)
api.delete('/deleteElement', [authMiddleware.autentificar], usuarioControl.deleteData)
api.post('/login', usuarioControl.loginUsuario)

module.exports = api;