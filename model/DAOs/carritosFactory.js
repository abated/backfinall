
const CarritosDBMongoDAO = require("../DAOs/carritosDBMongo.js")
class CarritoFactoryDAO {
    static get(tipo) {
        switch (tipo) {
           
            case 'MONGO':
                return new CarritosDBMongoDAO()
            default:
                return new CarritosDBMongoDAO()
        }
    }
}   

module.exports = CarritoFactoryDAO