const express = require("express")
const { Server: ServerHttp } = require('http')
const app = express()
const { Server: ServerIo } = require('socket.io')
const serverHttp = new ServerHttp(app)
const io = new ServerIo(serverHttp)
const cors = require("cors")
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const  config = require("./config.js")
if (config.NODE_ENV === 'development') {
    app.use(cors())
}
//SESION
const session = require("express-session")
const passport = require("passport")


app.use(session({
    secret: 'keyboard cat',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 100000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
   }));

app.use(passport.initialize())
app.use(passport.session())
app.get("/",(req,res)=>{
    if (req.isAuthenticated()) {
        res.redirect("api/productos")
    }else{
        res.redirect("/login")

    }
})
//HandleBars
const handlebars = require("express-handlebars")
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
          },
        defaultLayout: '',
        layoutsDir: __dirname+"/views/",
        partialsDir:__dirname+"/views/partials"
    })
)
app.set('view engine', 'hbs')
app.set('views', './views')
//router productos
const routerProductos = require("./routes/productos.routes.js")
const routerProductoss =  new routerProductos()
app.use('/api/productos', routerProductoss.start())
//router de login
const routerUsuarios = require("./routes/usuarios.routes.js")
app.use(routerUsuarios)

//router mensajes
const routerMensajes = require("./routes/mensajes.routes.js")
const routerMensajess = new routerMensajes()
app.use('/chat', routerMensajess.start())

//router carrito
const routerCarritos = require("./routes/carrito.routes.js")
const routerCarritoss = new routerCarritos()
app.use("/api/carrito",routerCarritoss.start())

const configurarSocket = require("./routes/io.routes.js")
io.on('connection', async socket => {
    configurarSocket(socket, io)
})

const port = config.PORT || 8000

serverHttp.listen(port, () => {
    console.log('Server is running on port '+port)
})

module.exports=app
