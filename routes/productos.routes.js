const {Router} = require("express")
const ControladorProductos = require("../controllers/producto.controllers.js")
const checkAuth = require("../utils/middlewares/check.js")

class routerProductos {
    constructor() {
        this.controladoresProductos = new ControladorProductos()
        this.router = Router()
    }

    start() {
        this.router.get('/',checkAuth,this.controladoresProductos.obtenerProductos)
        this.router.get('/category/:category', this.controladoresProductos.obtenerProductosCategory)
        this.router.get('/:id', this.controladoresProductos.obtenerProductosId)
        this.router.delete('/:id',this.controladoresProductos.eliminarProductoId)
        this.router.post('/',this.controladoresProductos.agregarProducto)
        this.router.put('/:id',this.controladoresProductos.actualizarProducto)
        return this.router
    }
}
module.exports = routerProductos