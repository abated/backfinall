const {Router} = require("express")
const ControladorMensajes = require("../controllers/mensajes.controllers.js")
class routerMensajes {
    constructor() {
        this.controladoresMensajes = new ControladorMensajes()
        this.router = Router()
    }

    start() {
        this.router.get('/', this.controladoresMensajes.obtenerMensajes)
        this.router.get('/:email', this.controladoresMensajes.obtenerMensajesEmail)
        this.router.post('/', this.controladoresMensajes.agregarMensaje)
  
        return this.router
    }
}
module.exports = routerMensajes