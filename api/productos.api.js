
const config = require("../config.js")
const ProductoFactoryDAO = require("../model/DAOs/productosFactory.js")
class ApiProductos {

    constructor() {
        this.productoDAO = ProductoFactoryDAO.get(config.TIPO_PERSISTENCIA)
    }
    async obtenerProductos() { 
        return await this.productoDAO.obtenerProductos()
    }
    async obtenerProductosId(id) { 
        return await this.productoDAO.obtenerProductosId(id)
    }
    async obtenerProductosCategory(category) { 
        return await this.productoDAO.obtenerProductosCategory(category)
    }
    async eliminarProductoId(id){
        return await this.productoDAO.eliminarProductoId(id)
    }
    async agregarProducto({thumbnail:thumbnail,title:title,price:price,category:category}){
        return await this.productoDAO.agregarProducto({thumbnail:thumbnail,title:title,price:price,category:category})
    }
    async actualizarProducto(id,{thumbnail,title,price,category}) { 
        return await this.productoDAO.actualizarProducto(id,{thumbnail:thumbnail,title:title,price:price,category:category})
    }
}
module.exports = ApiProductos
