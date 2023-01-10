const ApiMensajes = require("../api/mensajes.api.js")
const Users = require("../model/models/usuario.model.js")
const logger=require("../utils/loggers/logger.js")
class ControladorMensjes {

    constructor() {
        this.apiMensajes = new ApiMensajes()
    }

    obtenerMensajes = async (req,res) => {
        try {
            let mensajes = await this.apiMensajes.obtenerMensajes()
            logger.info(mensajes)
        res.render('mensajes', {
            mensajes:mensajes
        })
        }
        catch(error) {
            logger.error('error Productos', error)
        }
    }

    obtenerMensajesEmail = async (req,res) => {
        try {
            let email = req.params.email
            logger.info(`se obuto el ${email} `)
            let mensajes = await this.apiMensajes.obtenerMensajesEmail(email)
            res.render('mensajes', {
                mensajes:mensajes
            })
            }
        catch(error) {
            logger.error('error Obtener Datos Id', error)
        }
    }
    
    agregarMensaje = async (req,res)=>{
    try {
        const usuario = req.session.passport.user
        const elementos = await Users.findOne({_id:usuario})
        const email = elementos.email
        const {mensaje,hora} = req.body
        {mensaje,hora}
        await this.apiMensajes.agregarMensaje({email:email,mensaje:mensaje,hora:hora})
    } catch (error) {
        logger.error(error)
    }
    }
} 
module.exports = ControladorMensjes