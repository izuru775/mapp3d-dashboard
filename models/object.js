const mongoose = require(`mongoose`);

const objectSchema = new mongoose.Schema({
    objectName: {
        type: String,
        required: true,
    },
    objectURL: {
        type: String,
        required: true,
    },
    scale: {
        type: String,
        required: true,
    },
    rotation: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Object", objectSchema);
