const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    cedula: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    primerApellido: { type: String, required: true },
    segundoApellido: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    unidad: { type: String, required: true },
    status: { type: String, required: true },
    role: { type: String, required: true },
    foto:  { type: String, required: true },
    password: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function () {
          return this.createdAt.toLocaleDateString();
        }
      }
});

const User = mongoose.model('User', userSchema);

module.exports = User;