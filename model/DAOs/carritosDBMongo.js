const mongoose = require("mongoose")
const {ObjectId} = mongoose.Types
const carrito = require("../models/carrito.model.js")
const logger = require("../../utils/loggers/logger.js")
const config = require("../../config.js")

class CarritoDBMongoDAO  {
    constructor() {
       ;(async () => {
        try {
            const url = config.MONGO_CONNECT
            await mongoose.connect(url,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            logger.info('MongoDB carrito connected')
        } catch (error) {
            logger.error(error)
        }
        })()
    }

    async obtenerCarritos(){
        try {
          const  resultado = await carrito.find()
            return resultado
        } catch (error) {
            logger.warn(`error Obtener Carritos ${error}`)
        }
    }
    
    async obtenerCarritoId(_id){
        try {
            if (_id) {
               
                const producto = await carrito.findOne({ _id: ObjectId(_id) })
                if(producto ==  null){
                    return `carrito id no encontrado`
                }
                console.log(producto)
                return [producto]
            } else {
                return await carrito.find({}).toArray()
            }
        } catch (error) {
            logger.error('error obtenerCarrito ID', error)            
        }
    }

    async eliminarCarritoId(_id){
        
        try {
            if(_id){
                const producto = await carrito.deleteOne({ _id: ObjectId(_id) })
                logger.warn(`${producto} eliminado`)
            }
            
        } catch (error) {
            logger.error(error)
        }
    }


    async agregarCarrito({title,cantidad,hora,email,direccion}){
        try {
         const carritocreado = await carrito.findOne({email})
         if (carritocreado === null) {
             await carrito.insertMany({hora,email,direccion,items:[{title,cantidad}]})
         }
         if (carritocreado !== null ) {
            const  productoCarrito =  carritocreado.items.find(productow => productow.title === title);
            const emailCarrito = carritocreado.email
            if ((title === productoCarrito?.title) && (email === emailCarrito)) {
                let cantidadProducto = Number(productoCarrito.cantidad)+Number(cantidad)
                await carrito.updateOne(
                    { email: email, "items.title": productoCarrito.title },
                { $set: { "items.$.cantidad" : cantidadProducto } }
             )
             logger.info("Carrito Actualizado")
                }else{
                  await carrito.updateOne({"email":email},
                    { $addToSet: 
                    { "items" : 
                    { $each: 
             [{"title":title,"cantidad":1 }] }}});
                 }
                }
        } catch (error) {
            logger.error(error)
        }
    }
    
    async modificarCarritoId(_id,{hora:hora,email:email,direccion:direccion}){
        try {
          await carrito.updateOne({ _id: ObjectId(_id) }, { $set: {hora:hora,email:email,direccion:direccion} })
        } catch (error) {
            logger.error(error)
        }

    }
}

module.exports = CarritoDBMongoDAO