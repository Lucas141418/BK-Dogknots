const mongoose = require("mongoose");

const activoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  idActivo: {
    type: String,
    required: true,
  },
  codeUbicacion: {
    type: String,
    required: true,
  },
  unidad: {
    type: String,
    required: true,
  },
  piso: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});
const Activo = mongoose.model("activo", activoSchema);
module.exports = Activo;
