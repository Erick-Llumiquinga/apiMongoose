; 
'use strict'

const bcrypt =  require('bcrypt'),
      connectDB = require('../../config/db');

let encritpPass = (req, res, next) => {
    let usuario = req.body.usuario || null

    if(!usuario || usuario.password == "" || !usuario.password)
    {
        return res.status(400).send('Usuario o contraseña no valido');
    } else {
        let encriptPass = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10))
        if(encriptPass)
        {
            req.body.usuario.password = encriptPass;
            req.body.usuario.createAt = new Date();
            if(req.sessionID){
                req.body.usuario.sessionID = req.sessionID
                next();
            }
            else{
               return res.status(400).send('No se encontro el sessionID') 
            }
        }
        else {
            return res.status(400).send('Usurio o contraseña no validos')
        }
    }
}

let PermissionsByRole = async (req, res, next) => {
    let db = await connectDB(),
        usuario = req.body.usuario

    if(!usuario || usuario.password == "" || !usuario.password)
    {
        return res.status(400).send('Usuario o contraseña no valido');
    } else {

    }
}

module.exports = {
    encritpPass
}