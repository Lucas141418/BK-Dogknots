const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//definiendo la estructura de datos del traslado

const transferSchema = new mongoose.Schema({
  transferId: { type: String, required: true },
  assetName: { type: String, required: true },
  assetId: { type: String, required: true },
  transferReason: { type: String, required: true },
  currentUnit: { type: String, required: true },
  destinationUnit: { type: String, required: true },
  justification: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  isPending: { type: Boolean, required: true },
  requestedBy: { type: String, required: true },
});

transferSchema.plugin(mongoosePaginate);
//Es en la linea de abajo donde Mongoose se da cuenta el esquema iria a la collection del primer a
//argumento de mongoose.model(), el lo baja a minuscula y busca la coleccion
const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
