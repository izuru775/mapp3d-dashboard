const mongoose = require(`mongoose`);

const environmentSchema = new mongoose.Schema({
    environmentName: {
        type: String,
        required: true,
    },
    environmentURL: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Environment", environmentSchema);