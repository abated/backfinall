const mongoose = require("mongoose")
const MensajesSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        trim: true
    },
    mensaje: {
        type: String, 
        required: true,
        trim: true
    },
    hora: {
        type: String, 
        required: true,
        trim: true
    }

})

module.exports = mongoose.model("mensajes",MensajesSchema)