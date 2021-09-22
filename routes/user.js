import express from 'express';
const router = express.Router()

import User from '../models/user';

// Importando middlewares
const { verificarAuth, verificarAdministrador } = require('../middlewares/autenticacion');

// Hash # de Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Filtrar o excluir campos de PUT
const _ = require('underscore');

// POST - Crear usuario
router.post('/nuevo-usuario', async(req, res) => {
   
   const body = {
      nombre: req.body.nombre,
      email: req.body.email,
      role: req.body.role
   }

   body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

   try {
      
      // Guardado en la DB
      const usuarioDB = await User.create(body);
      res.json(usuarioDB);
      
   } catch (error) {
      return res.status(500).json({
         mensaje: 'Ocurrio un error',
         error
      })
   }

});

// PUT - Actualizar usuario
router.put('/usuario/:id', [verificarAuth, verificarAdministrador], async(req, res) => {
   
   const _id = req.params.id;
   const body = _.pick(req.body, ['nombre', 'email', 'pass', 'activo']);

   if(body.pass){
      body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
   }

   try {

      const usuarioDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
      
      return res.json(usuarioDB);

   } catch (error) {
      return res.status(400).json({
         mensaje: 'Ocurrio un error',
         error
      })
   }
})

module.exports = router;

