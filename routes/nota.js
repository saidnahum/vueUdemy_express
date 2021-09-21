import express from "express";
const router = express.Router();

//Importar modelo de nota
import Nota from "../models/nota";

//Agregando una nota
router.post('/nueva-nota', async(req, res) => {

   const body = req.body

   try {
      const notaDB = await Nota.create(body)

      res.status(200).json(notaDB)
   } catch (error) {
      return res.status(500).json({
         mensaje: 'Ocurrio un error',
         error
      })
   }
})

// Método GET Retornar una sola nota
router.get('/nota/:id', async(req, res) => {
   const _id = req.params.id;

   try {
      const notaDB = await Nota.findOne({_id});
      res.json(notaDB);

   } catch (error) {
      return res.status(400).json({
         mensaje: 'Ocurrio un error',
         error
      })
   }
})

// Método GET Retornar todas las notas
router.get('/notas', async(req, res) => {
   try {
      const notaDB = await Nota.find();
      res.json(notaDB);
   } catch (error) {
      return res.status(400).json({
         mensaje: 'Ocurrio un error',
         error
      })
   }
})

// Método DELETE para borrar una nota
router.delete('/nota/:id', async(req, res) => {
   const _id = req.params.id

   try {
      const notaDB = await Nota.findByIdAndDelete({_id})

      if(!notaDB){
         return res.status(400).json({
            mensaje: 'No se encontro el ID indicado',
            error
         })
      }

      res.json(notaDB);
   } catch (error) {
      return res.status(400).json({
         mensaje: 'Ocurrio un error',
         error
      })
   }
});

// Método PUT para actualizar una nota
router.put('/nota/:id', async(req, res) => {
   const _id = req.params.id;
   const body = req.body;

   try {
      const notaDB = await Nota.findByIdAndUpdate(_id, body, {new: true})
      res.json(notaDB);
   } catch (error) {
      return res.status(400).json({
         mensaje: 'Ocurrio un error',
         error
      })
   }
})

// Exportar router
module.exports = router;