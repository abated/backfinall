const config = require("../config.js")
const MensajeFactoryDAO = require("../model/DAOs/mensajesFactory.js")
class ApiMensajes {
    constructor() {
        this.mensajeDAO = MensajeFactoryDAO.get(config.TIPO_PERSISTENCIA)
    }
    async obtenerMensajes() { 
        return await this.mensajeDAO.obtenerMensajes()
    }
    async obtenerMensajesEmail(email) { 
        return await this.mensajeDAO.obtenerMensajesEmail(email)
    }
    async agregarMensaje({email:email,mensaje:mensaje,hora:hora}){
        return await this.mensajeDAO.agregarMensaje({email:email,mensaje:mensaje,hora:hora})
    }
}
module.exports = ApiMensajes
