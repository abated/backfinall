const server = io().connect()

const render3 = (productos) => {
    let listado = document.getElementById("orden")
    let html2 = productos.map(orden => {
        return `
        <li>
        <span class="nombre" id="${orden.email}">
        ${orden.email}
        </span>
        <span class="hora">
        [${orden.hora}]:
        </span>
        <span class="mensaje">
        ${orden.direccion}
        </span>
        ${orden.items.map(orden =>{
            return ` item:${orden.title}, cantidad:${orden.cantidad}`
        })}
        <button id="btn-${orden._id}" type="submit">Generar Orden</button>
        <button id="btn-borrar${orden._id}" type="submit">Borrar Orden</button>
        
    </li>
       `
    })
    listado.innerHTML = html2.join(" ")
}



  
function mandarCarrito(params) {
    server.emit("carrito22-servidor", mensaje => {
    })
    
}

server.on("orden-servidor", orden => {
    render3(orden)
    orden.forEach((producto)=>{
    
        document.getElementById(`btn-${producto._id}`).addEventListener("click",function(){ 
            console.log(`si ok ${producto.email}`)  
            server.emit("emitir-orden",producto.email)      
           
        })
    })
    orden.forEach((producto)=>{
    
        document.getElementById(`btn-borrar${producto._id}`).addEventListener("click",function(){ 
            console.log(`si ok ${producto._id}`)  
            server.emit("borrar-orden",producto.email) 
        })
    })
 
})



