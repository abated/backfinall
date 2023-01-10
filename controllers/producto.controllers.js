
const ApiProductos = require("../api/productos.api.js")
const Users = require("../model/models/usuario.model.js")
const ApiCarritos = require("../api/carritos.api.js")
const logger = require("../utils/loggers/logger.js")
class ControladorProductos {

    constructor() {
        this.apiProductos = new ApiProductos()
        this.apiCarritos = new ApiCarritos()
    }

    obtenerProductos = async (req,res) => {
        try {
            const CarritoProductos = await this.apiCarritos.obtenerCarritos()
            logger.info(CarritoProductos)
            const usuario = req.session.passport.user
            const elementos = await Users.findOne({_id:usuario})
            let productos = await this.apiProductos.obtenerProductos()
            res.render('index', {
                productos: productos,
                mensaje: elementos.username,
                email:elementos.email 
            })
        }
        catch(error) {
            logger.error('error Productos', error)
        }
    }
    obtenerProductosId = async (req,res) => {
        try {
            let id = req.params.id
            logger.info(`id del ${id}`)
            let ProductosId = await this.apiProductos.obtenerProductosId(id)
            res.send(ProductosId)
        }
        catch(error) {
            logger.error('error Obtener Datos Id', error)
        }
    }
    obtenerProductosCategory = async (req,res) => {
        try {
            let category = req.params.category
            logger.info(category)
            let ProductosCategory = await this.apiProductos.obtenerProductosCategory(category)
            res.send(ProductosCategory)
        }
        catch(error) {
            logger.error('error Obtener Productos Category', error)
        }
    }
    
    eliminarProductoId = async (req,res) => {
        try {
            let id = req.params.id
      
            let ProductosId = await this.apiProductos.eliminarProductoId(id)
            res.send(ProductosId)
        }
        catch(error) {
            logger.error('error eliminar Datos Id', error)
        }
    }

    agregarProducto = async (req,res)=>{
    try {
        const {thumbnail,title,price,category} = req.body
        await this.apiProductos.agregarProducto({thumbnail:thumbnail,title:title,price:price,category:category})
    }   
        catch (error) {
            logger.error(error)
    }
    }

    actualizarProducto = async (req,res) => {
    try {
        let id = req.params.id
        const {thumbnail,title,price,category} = req.body
       let productosActualizado = await this.apiProductos.actualizarProducto(id, {thumbnail,title,price,category})
        res.send(productosActualizado)
   
    }   catch(error) {
        logger.log('error obtener productos', error)
    }
}} 
module.exports = ControladorProductos



