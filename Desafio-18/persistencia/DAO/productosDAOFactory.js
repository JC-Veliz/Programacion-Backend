const ClientSQL = require('./productosDAO')
const { option } = require('../../options/mysqlconnection')

const opcion = process.argv[2] || 'Mem'

let dao
switch (opcion) {
    case 'Mem':
        dao = new ClientSQL(option)
        dao.init()
        break
    case 'Mongo':
        dao = require('./productosMongoDAO')
        dao.init()
        break
    case 'SQLLITE':
        dao = new ClientSQL(option)
        dao.init()
        break
    default:
        dao = new ClientSQL(option)
        dao.init()
        break
}

module.exports = class productosDAOFactory {
    static getDAO() {
        return dao
    }
}