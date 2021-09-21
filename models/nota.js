import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Crear esquema de la nota
const notaSchema = new Schema({
   nombre: {type: String, required: [true, 'Nombre Obligatorio']},
   descripcion: String,
   usuarioId: String,
   date: {type: Date, default: Date.now},
   activo: {type: Boolean, default: true}
})

// Pasar esquema a modelo
const Nota = mongoose.model('Nota', notaSchema);

export default Nota;

