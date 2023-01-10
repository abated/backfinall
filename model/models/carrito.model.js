const mongoose = require("mongoose")
const CarritoSchema = new mongoose.Schema({
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
    direccion: {
        type: String, 
        trim: true
    }
})

module.exports = mongoose.model("carritos",CarritoSchema)