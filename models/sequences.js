// codigo para saber cual es la ultima unidad guardada por id 

const mongoose = require("mongoose"); 

const SequenceSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 }
});

const Sequence = mongoose.model('Sequences', SequenceSchema); // funcion recibe nonre y forma 

Sequence.getNextSequence = async function (sequenceName) { // getNextSequence es un nombre iventado 
    const sequenceDoc = await this.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDoc.sequence_value;
};

module.exports = Sequence;
