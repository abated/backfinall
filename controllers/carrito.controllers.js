const ApiCarritos = require("../api/carritos.api.js")
const Users = require("../model/models/usuario.model.js")
const logger =require("../utils/loggers/logger.js")
const ordenesModel = require("../model/models/ordenes.model.js")

class ControladorCarritos {
    constructor() {
        this.apiCarritos = new ApiCarritos()
    }

    obtenerCarritos = async (req,res) => {
        try {
           const usuario = req.session.passport.user
            const elementos = await Users.findOne({_id:usuario})
          await this.apiCarritos.obtenerCarritos()
            res.render('carrito', {
                mensaje: `hola ${elementos.username}`,
            })
        }
        catch(error) {
            logger.error('error Carrito', error)
        }
    }

    obtenerCarritoId = async (req,res) => {
        try {
            let id = req.params.id
            logger.info(`se obtuvo el id ${id} del carrito`)
            let CarritoId = await this.apiCarritos.obtenerCarritoId(id)
            res.send(CarritoId)
        }
        catch(error) {
            logger.error('error Obtener Carrito Id', error)
        }
    }

    eliminarCarritoId = async (req,res) => {
        try {
            let id = req.params.id
            let EliminarCarritoId = await this.apiCarritos.eliminarCarritoId(id)
            logger.warn(`se obtuvo el ${id} para eliminacion de carrito`)
            res.send(EliminarCarritoId)
        }
        catch(error) {
            logger.error('error eliminar Carrito Id', error)
        }
    }

    agregarCarrito = async (req,res)=>{
    try {
        const usuario = req.session.passport.user
        const elementos = await Users.findOne({_id:usuario})
        const {hora,title,cantidad} = req.body
        {hora,title,cantidad}
        await this.apiCarritos.agregarCarrito({title:title,cantidad:cantidad,hora:hora,email:elementos.email,direccion:elementos.direccion})
        res.render('carrito')
        } catch (error) {
        logger.error(error)
        }
    }
    modificarCarritoId = async(req,res)=>{
    try {
        let id = req.params.id
        const {email,direccion,hora} = req.body
        await this.apiCarritos.modificarCarritoId(id,{hora:hora,email:email,direccion:direccion})
        } catch (error) {
        logger.error(error)
        }
    }
    obtenerOrden = async(req,res)=>{
        try {
            const ordenCreada = await ordenesModel.find()
            res.render('ordenes', {
            ordenes: ordenCreada
            })
        } catch (error) {
            logger.error(error)
        }    
    }
} 
module.exports = ControladorCarritos