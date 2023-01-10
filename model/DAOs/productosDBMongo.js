const mongoose = require("mongoose")
const {ObjectId} = mongoose.Types
const productos = require("../models/producto.model.js")
const logger = require("../../utils/loggers/logger.js")
const config = require("../../config.js")
class ProductosDBMongoDAO  {
    constructor() {
       ;(async () => {
        try {
            const url = config.MONGO_CONNECT
            await mongoose.connect(url,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            logger.info('MongoDB connected')
        } catch (error) {
            logger.error(error)
        }
        })()
    }

    async obtenerProductos(){
        try {
           
          const  resultado = await productos.find()
   
            return resultado
        } catch (error) {
            logger.error(`error Obtener Productos ${error}`)
        }
    }
    
    async obtenerProductosId(_id){
        try {
            if (_id) {
                const producto = await productos.findOne({ _id: ObjectId(_id) })
                if(producto ==  null){
                    return `Producto id no encontrado`
                }
                logger.info(producto)
                return [producto]
            } else {
                return await productos.find({}).toArray()
            }
        } catch (error) {
            logger.error('error obtenerProductos ID', error)            
        }
    }
    async obtenerProductosCategory(category){
        try {
           
            if (category) {
                logger.info(category)
                const producto = await productos.find({ category:category })
                logger.info(producto)
                return [producto]
            } else {
                return await productos.find({}).toArray()
            }
        } catch (error) {
            logger.error('error obtenerProductos category', error)            
        }
    }
    async eliminarProductoId(_id){
        
        try {
            if(_id){
                const producto = await productos.deleteOne({ _id: ObjectId(_id) })
                logger.info(`${producto} eliminado`)
            }
            
        } catch (error) {
            logger.error(error)
        }
    }

    async agregarProducto({thumbnail,title,price,category}){
        try {
            
            let doc = await productos.insertMany({thumbnail:thumbnail,title:title,price:price,category:category});
            logger.info(`doc agregado${doc}`)
        } catch (error) {
            logger.error(error)
        }
    }
    actualizarProducto = async (id, {thumbnail,title,price,category}) => {
        try {
            await productos.updateOne({ _id: ObjectId(id) }, { $set: {thumbnail:thumbnail,title:title,price:price,category:category} })
            return {thumbnail,title,price,category}
        } catch (error) {
            logger.error('error Actualizar producto', error)
            return {thumbnail,title,price,category}
        }
    }
}

module.exports = ProductosDBMongoDAO
