import express from 'express';
const router = express.Router()

// JWT
const jwt = require('jsonwebtoken');

import User from '../models/user';

// Hash # de Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async(req, res) => {

   const body = req.body;

   try {
      
      // Evaluar Email
      const usuarioDB = await User.findOne({email: body.email})

      if(!usuarioDB){
         return res.status(400).json({
            mensaje: 'Email no encontrado'
         })
      }

      // Evaluar contraseña
      if(!bcrypt.compareSync(body.pass, usuarioDB.pass)){
         return res.status(400).json({
            mensaje: 'Contraseña incorrecta'
         })
      }

      // Generar JWT
      const token = jwt.sign({
         data: usuarioDB
      }, 'secret', { expiresIn: 60 * 60 * 24 * 30 });

      // Devolver usuario
      res.json({
         usuarioDB,
         token
      })

   } catch (error) {
      return res.status(400).json({
         mensaje: 'Ocurrio un error',
         error
      })
   }
});

module.exports = router;