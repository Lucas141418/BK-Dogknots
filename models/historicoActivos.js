const mongoose = require("mongoose");

const historicoActivoSchema = new mongoose.Schema({
  actor: {type: String, required: true},
  transferId: { type: String, required: true},
  assetName: { type: String, required: true},
  assetId: { type: String, required: true},
  transferReason: { type: String, required: true},
  currentUnit: { type: String, required: true},
  destinationUnit: { type: String, required: true},
  justification: { type: String, required: true},
  createdAt: {
    type: Date,
    default: Date.now,
    get: function () {
      return this.createdAt.toLocaleDateString();
    }
  }
});

const historicoActivo = mongoose.model("historicoActivo", historicoActivoSchema);
module.exports = historicoActivo;