const ClientSQLLite = require('./mensajesDAO')
const { optionLite } = require('../../options/myslLiteconnection')

const opcion = process.argv[2] || 'Mem'

let dao
switch (opcion) {
    case 'Mem':
        dao = new ClientSQLLite(optionLite)
        dao.init()
        break
    case 'Mongo':
        dao = require('./mensajesMongoDAO')
        dao.init()
        break
    case 'SQLLITE':
        dao = new ClientSQLLite(optionLite)
        dao.init()
        break
    default:
        dao = new ClientSQLLite(optionLite)
        dao.init()
        break
}

module.exports = class mensajesDAOFactory {
    static getDAO() {
        return dao
    }
}