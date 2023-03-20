const createTableMensajeDTO = () => {
    return (table) => {
        table.increments('id')
        table.string('author')
        table.string('text')
        table.time('date')
    }
}

module.exports = createTableMensajeDTO

   