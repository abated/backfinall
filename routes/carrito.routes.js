const {Router} = require("express")
const ControladorCarritos = require("../controllers/carrito.controllers.js")
class routerCarritos {
    constructor() {
        this.controladoresCarritos = new ControladorCarritos()
        this.router = Router()
    }

    start() {
        this.router.get('/', this.controladoresCarritos.obtenerCarritos)
        this.router.get('/:id', this.controladoresCarritos.obtenerCarritoId)
        this.router.delete('/:id',this.controladoresCarritos.eliminarCarritoId)
        this.router.put('/:id',this.controladoresCarritos.modificarCarritoId)
        this.router.post('/',this.controladoresCarritos.agregarCarrito)
        this.router.get("/ordenes/orden",this.controladoresCarritos.obtenerOrden)
        return this.router
    }
}
module.exports = routerCarritos