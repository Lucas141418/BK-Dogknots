const mongoose = require("mongoose");
const Sequence = require("./sequences");

const unitsSchema = new mongoose.Schema({
    _id: { type: Number, unique: true },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    canton: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    otherSigns: {
        type: String,
        required: true,
    },
    registerDate: {
        type: String,
        required: true,
    },
});

unitsSchema.pre('save', async function (next) {
    if (!this._id) {
        this._id = await Sequence.getNextSequence('units');
    }
    next();
});

const Units = mongoose.model("Units", unitsSchema);

module.exports = Units;
