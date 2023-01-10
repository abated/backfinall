const {createTransport} = require("nodemailer")
const config = require("../../config.js")
const TEST_MAIL = 'dario.tasa@gmail.com'
const transporter = createTransport({
   service: 'gmail',
   port: 587,
   auth: {
       user: TEST_MAIL,
       pass: config.passnodemailer
   }
});
function enviarMailOrden(email,orden) {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: "dario_156a@hotmail.com",
        subject: 'Nueva ORDEN',
        html: `orden de compra del email ${email}, compro ${orden.map(orden =>{
         return ` item:${orden.title}, cantidad:${orden.cantidad}`
     })}`,
        attachments:[{
    
           path:"https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?w=2000"
        }
        ]
     }
     transporter.sendMail(mailOptions)
}



module.exports= enviarMailOrden