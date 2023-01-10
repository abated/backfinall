const express = require("express")
const {createTransport} = require("nodemailer")
const {Router}  = express
const routerUsuarios = Router()
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const Users = require("../model/models/usuario.model.js")
const bcrypt = require("bcrypt")
const logger = require("../utils/loggers/logger.js")
const config = require("../config")

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    Users.findOne({ 'username': username }, function (err, user) {
        const { email,nombre,direccion,edad,telefono,avatar } = req.body
        if (err) {
            logger.error('Error in SignUp: ' + err);
            logger.error(err)
        
          return done(err);
        }
        if (user) {
            logger.info("usuario ya existe")
          return done(null, false)
        }
    let newUser = {
        username,
        password: createHash(password),
        email,
        nombre,
        direccion,
        edad,
        telefono,
        avatar
    }
const transporter = createTransport({
   service: 'gmail',
   port: 587,
   auth: {
       user: config.usuarionodemail,
       pass: config.passnodemailer
   }
});

    Users.create(newUser, (err, userWithId) => {
        if (err) {
            logger.error('Error in Saving user: ' + err)
          return done(err);
        }
    
        logger.info(user)
      logger.info('User Registration succesful')

        const mailOptions = {
            from: 'Servidor Node.js',
            to: "dario_156a@hotmail.com",
            subject: 'Nuevo Registro',
            html: `El usuario${newUser.username} de ${newUser.edad} anios de edad se ha registrado`,
            attachments:[{
        
               path:"https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?w=2000"
            }
            ]
         }
        transporter.sendMail(mailOptions)
        return done(null, userWithId);
      });
    });
  })
 )
 function createHash(password) {
    return bcrypt.hashSync(
              password,
              bcrypt.genSaltSync(10),
              null);
  }


passport.use('login', new LocalStrategy(
    (username, password, done) => {
       Users.findOne({ username }, (err, user) => {
      
        if (err)
          return done(err);
   
        if (!user) {
          logger.error('User Not Found with username ' + username)
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
            logger.error("Invalid Password")
          return done(null, false);
        }
        return done(null, user);
    });
    
})
   );

routerUsuarios.get("/singup",(req,res)=>{
    res.render('signup')
})

routerUsuarios.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
       let user = req.user
        res.render('index')
    } else {
        let user = req.user
        res.render('login')
    }
})
routerUsuarios.post('/login', passport.authenticate('login',{
    successRedirect: 'api/productos',
    failureRedirect: '/faillogin',
}),(req, res) => {
  var user = req.user
})

routerUsuarios.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})
routerUsuarios.post('/signup', passport.authenticate('signup',{
    successRedirect: '/iniciar',
    failureRedirect: '/failsignup',
}),(req, res) => {
    const { username, password } = req.body
})

routerUsuarios.get("/signup",(req,res)=>{
    res.render('signup')
})
routerUsuarios.get("/failsignup",(req,res)=>{
    res.render('failsignup')
})
routerUsuarios.get("/iniciar",(req,res)=>{
    res.render('iniciar')
})
routerUsuarios.get("/faillogin",(req,res)=>{
    res.render('faillogin')
})

routerUsuarios.get('/info', (req, res) => {
    const numCPUs = require('os').cpus().length
res.render("info",{
    cwd:process.cwd(),
    plataforma:process.platform,
    node:process.version,
    memoria:process.memoryUsage().rss,
    idDelProceso:process.pid,
    execPath:process.execPath,
    argumentos:process.argv[2],
    procesadores:numCPUs
})
})

passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    Users.find({id},done)
})

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}
module.exports = routerUsuarios
