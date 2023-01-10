# finalbackend
Podemos iniciar el proyecto con el comando: nodemon server.js

la ruta http://localhost:8000/ nos llevara a un login y nos dirije hacia http://localhost:8000/api/productos en caso de logeo ok,
tambien un link para crear una cuenta nueva

dentro de api/productos tenemos un formulario para agregar productos
 y otro para agregar mensajes al chat,tambien un link al "chat general"
 tambien una opcion para "agregar carrito" 
las rutas http://localhost:8000/chat y http://localhost:8000/chat/:email donde email se puede pasar por parametro y recuperar chat del email especificado
el formulario de http://localhost:8000/api/productos directamente pushea el nuevo producto el cual se puede obtener por id o por parametro
http://localhost:8000/api/productos/:id 
o por categoria http://localhost:8000/api/productos/category/:category

El link "Ver productos en carrito" te lleva a los diferentes carritos creados de diferentes usuarios,
dentro podemos generar las ordenes de los carritos una sola vez bloqueados por un if para evitar generar ordenes repetidas

en el archivo config.js estan las credenciales de mongo y nodemailer, tambien dentro se encuentra las opciones para realizar modo production o revelopment
de todos modos hay creada una factory pero se utiliza solo mongoDb para todas las bases de datos
en el carrito se crea una logica para sumar cantidad si el producto es el mismo
rutas del carrito http://localhost:8000/api/carrito
http://localhost:8000/api/carrito/:id
etc







