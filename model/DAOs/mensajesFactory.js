
const MensajesDBMongoDAO = require("../DAOs/mensajesDBMongo.js")
class MensajesFactoryDAO {

    static get(tipo) {
        switch (tipo) {
           
            case 'MONGO':
                return new MensajesDBMongoDAO()
            default:
                return new MensajesDBMongoDAO()
        }
    }
}   

module.exports = MensajesFactoryDAO