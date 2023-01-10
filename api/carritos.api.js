const config = require("../config.js")
const CarritoFactoryDAO = require("../model/DAOs/carritosFactory.js")
class ApiCarritos {

    constructor() {
        this.carritoDAO = CarritoFactoryDAO.get(config.TIPO_PERSISTENCIA)
    }
    async obtenerCarritos() { 
        return await this.carritoDAO.obtenerCarritos()
    }
    async obtenerCarritoId(id) { 
        return await this.carritoDAO.obtenerCarritoId(id)
    }
    async eliminarCarritoId(id){
        return await this.carritoDAO.eliminarCarritoId(id)
    }
    async agregarCarrito({title:title,cantidad:cantidad,hora,email,direccion}){
        return await this.carritoDAO.agregarCarrito({title:title,cantidad:cantidad,hora:hora,email:email,direccion:direccion})
    }
    async modificarCarritoId(id,{hora:hora,email:email,direccion:direccion}){
        return await this.carritoDAO.modificarCarritoId(id,{hora:hora,email:email,direccion:direccion})
    }
  
}
module.exports = ApiCarritos