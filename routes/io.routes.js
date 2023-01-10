const ApiProductos = require("../api/productos.api.js")
const ApiMensajes = require("../api/mensajes.api.js")
const ApiCarritos = require("../api/carritos.api.js")
const ordenesModel = require("../model/models/ordenes.model.js")
const carrito = require("../model/models/carrito.model.js")
const logger = require("../utils/loggers/logger.js")
const enviarMailOrden = require("../utils/middlewares/midlewares.js")
const alert = require("alert")
 async function configurarSocket(socket,io) {
    logger.error("SocketOn")
    logger.warn("SocketOn")
    const prods2 =  new ApiProductos
    const mensaje3 = []
    const prods = await prods2.obtenerProductos()
    logger.info(prods)
    const mensaje = {
        mensajee: "todo ok",
        prods,
        mensaje3, 
    }
    socket.emit("mensaje-servidor", mensaje)
    socket.emit("mensaje-servidor2", prods)
    socket.on("mensaje-nuevo", (mensajeChat) => {
        mensaje3.push(mensajeChat)
        logger.info(mensajeChat)
        const mensajesMongo = new ApiMensajes()
        mensajesMongo.agregarMensaje(mensajeChat)
        io.sockets.emit("mensaje-servidor", mensaje)
    })
    socket.on("producto-nuevo", (productos) => {
        prods.push(productos)
        prods2.agregarProducto(productos)
        io.sockets.emit("mensaje-servidor", mensaje)
    })

socket.on ("carrito22-servidor",async(orden)=>{
    const elementosCarrito1 = new ApiCarritos
    const  resultado = await elementosCarrito1.obtenerCarritos()
    socket.emit("orden-servidor",resultado)
})
socket.on("borrar-orden",async(orden)=>{
     await ordenesModel.deleteMany({email:orden})
     alert("orden borrada")
})

socket.on("emitir-orden",async(orden)=>{
    const carritocreado = await carrito.findOne({"email":orden})

    const ordenCreada = await ordenesModel.findOne({"email":orden})
    function insertarOrden(hora,orden,estado,items) {
        if (ordenCreada !== null) {
            alert(`orden ya creada con id ${ordenCreada._id}`)
            logger.info("orden ya generada")
        }else{
            ordenesModel.insertMany({hora:hora,email:orden,estado:estado,items:items})
            alert(`nueva orden creada con exito en mongoDB`)
        }
    }
    let estadoActual = "generada"
    insertarOrden(carritocreado.hora,orden,estadoActual,carritocreado.items)
    enviarMailOrden(orden,carritocreado.items)
})
}
module.exports=configurarSocket