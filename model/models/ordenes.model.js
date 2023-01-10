const mongoose = require("mongoose")
const OrdenesSchema = new mongoose.Schema({
    items:[{
        title: {
            type: String,
            trim: true,
        },
        cantidad: {
            type: Number, 
            trim: true
        }
    }],
    email: {
        type: String,
        trim: true
    },
    hora: {
        type: String,
        trim: true
    },
    estado: {
        type: String, 
        trim: true
    }
})

module.exports = mongoose.model("ordenes",OrdenesSchema)