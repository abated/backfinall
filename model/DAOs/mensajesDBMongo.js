const mongoose = require("mongoose")
const mensajes = require("../models/mensaje.model.js")
const logger = require("../../utils/loggers/logger.js")
const config = require("../../config.js")
class MensajesDBMongoDAO  {
    constructor() {
       
       ;(async () => {
        try {
            const url = config.MONGO_CONNECT
            await mongoose.connect(url,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            logger.info('MongoDB connected Mensajes')
        } catch (error) {
            logger.error(error)
        }
        })()
    }

    async obtenerMensajes(){
        try {
          const  resultado = await mensajes.find()
            return resultado
        } catch (error) {
            logger.error(`error Obtener Mensajes ${error}`)
        }
    }
    
    async obtenerMensajesEmail(email){
        try {
            if (email) {
               
                const producto = await mensajes.find({ email: email })
                if(producto ==  null){
                    return `Producto id no encontrado`
                }
                logger.info(producto)
                return producto
            } else {
                return await mensajes.find({}).toArray()
            }
        } catch (error) {
            logger.error('error obtener mensajes ID', error)            
        }
    }
    async agregarMensaje({email:email,mensaje:mensaje,hora:hora}){
        try {
            
            let doc = await mensajes.insertMany({email:email,mensaje:mensaje,hora:hora});
            logger.info(`doc agregado${doc}`)
        } catch (error) {
            logger.error(error)
        }
    }

}




module.exports = MensajesDBMongoDAO