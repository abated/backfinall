const dotenv = require("dotenv")
const path = require("path")
dotenv.config({ 
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env') 
})
// Cambiar modos
//$env:NODE_ENV="production"
//$env:NODE_ENV="develoment"
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'MONGO',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8000,
    TIPO_PERSISTENCIA:'MONGO',
    MONGO_CONNECT:"mongodb+srv://dario:1164945700@cluster0.vqbfuks.mongodb.net/?retryWrites=true&w=majority",
    usuarionodemail:"dario.tasa@gmail.com",
    passnodemailer:"ttdkjczkisftsslv"
 
}