const mongoose = require('mongoose');

const bitacoraSchema = new mongoose.Schema({
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
       ubicacion: {
        type: String,
        required: true,
       },
       estado: {
          type: String,
          required: true,
       },
       photo: {
          type: String,
          required: true
        },
        fecha: {
            type: Date, 
            default: Date.now,
            get: function() {
                return this.createdAt.toLocaleDateString();
            }
         
        }
 });
 
 const Bitacora = mongoose.model("bitacoraActivo", bitacoraSchema);
 module.exports = Bitacora;
 