;
'use strict'
const express = require('express');

let authMiddleware = require('../controles/middleware/auth'),
    permissionMiddleware = require('../controles/middleware/permissions')
    filesMiddleware = require('../controles/middleware/file'),
    multiparty = require('connect-multiparty')

let api = express.Router(),
    estudianteControl = require('../controles/estudiante.Controller');

api.get('/getStudients', [authMiddleware.autentificar], estudianteControl.getAll)
api.post('/insertStudients', [authMiddleware.autentificar], estudianteControl.insertDataMany)
api.post('/insertStudient', [authMiddleware.autentificar, multiparty('../files/galeria')], estudianteControl.insertData)
api.put('/updateStudient', [authMiddleware.autentificar], estudianteControl.updateData)
api.get('/findStudient', [authMiddleware.autentificar], estudianteControl.getById)
api.get('/findStudientElement', [authMiddleware.autentificar], estudianteControl.getByElement)
api.delete('/deleteStudient', [authMiddleware.autentificar], estudianteControl.deleteData)

module.exports = api;