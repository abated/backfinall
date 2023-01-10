const server = io().connect()
function formatDate() {
    let date_ob = new Date(); 
    let date = ("0" + date_ob.getDate()).slice(-2); 
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2); 
    let year = date_ob.getFullYear(); 
    let hours = date_ob.getHours(); 
    let minutes = date_ob.getMinutes(); 
    let seconds = date_ob.getSeconds(); 
    return(year + "/" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds);
}

const render = (productos) => {
    let listado = document.getElementById("listado")
    let html = productos.map(prod => {
        return `
 
        <form action="/api/carrito" method="POST">
        <li>
        <span class="nombre" name="title">
        ${prod.title}
        </span>
        <span class="nombre" name="category">
        ${prod.category}
        </span>
        <span class="hora" name="price">
        [${prod.price}]:
        <input type="hidden" name="title" value="${prod.title}">
        <input type="hidden" name="hora" value="${formatDate()}">
        <input type="hidden" name="cantidad" value="1">
        </span>
        <span class="mensaje" name="thumbnail">
        <img src=" ${prod.thumbnail}" alt="">
        </span>
        <button id="btn-${prod._id}" type="submit">Agregar Carrito</button>
        </li>
        </form>
       `
    })
    listado.innerHTML = html.join(" ")
}
const render2 = (productos) => {
    let listado = document.getElementById("mensajee")
    let html2 = productos.map(prod => {
        return `
        <li>
        <span class="nombre">
        ${prod.email}
        </span>
        <span class="hora">
        [${prod.hora}]:
        </span>
        <span class="mensaje">
        ${prod.mensaje}
        </span>
    </li>
       `
    })
    listado.innerHTML = html2.join(" ")
}
const addUser =(evento3) =>{
    const nombre1 = document.querySelector("#usuario").value
    server.emit("mensaje-nuevo2", nombre1)
    return false
}

const addMensaje = (evento2) => {
    const email = document.querySelector(".emaill").id
    const nombre = document.querySelector("#nombre").value
    const edad = document.querySelector("#edad").value
    const alias = document.querySelector("#alias").value
    const avatar = document.querySelector("#avatar").value
    const mensaje = document.querySelector("#mensaje").value
    const hora = formatDate()
    const productos2 = { nombre,email,edad,alias,avatar, mensaje,hora }
    console.log(email)
    server.emit("mensaje-nuevo", productos2)
    return false
}

const addProduct = (evento) => {
    const nombre = document.querySelector("#nombre").value
    const category = document.querySelector("#category").value
    const precio = document.querySelector("#precio").value
    const thumbnail = document.querySelector("#thumbnail").value
    const productos = { title: nombre,category:category, price: precio,thumbnail }
    server.emit("producto-nuevo", productos)
    return false
}

server.on("mensaje-servidor", mensaje => {
    render(mensaje.prods)
    render2(mensaje.mensaje3)

})
server.on("mensaje-servidor2", mensaje => {
    mensaje.forEach((producto)=>{
        
        document.getElementById(`btn-${producto._id}`).addEventListener("click",function(){   
            console.log(`EL PRODUCTO CON EL ID ${producto._id}`)
            server.emit("producto-nuevo3",producto)      
           
        })
    })
})

