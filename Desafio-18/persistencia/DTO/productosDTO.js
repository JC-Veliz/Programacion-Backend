const createTableProductosDTO = () => {
    return (table) => {
        table.increments('id')
        table.string('title')
        table.string('price')
        table.string('thumbnail')
    }
}

module.exports = createTableProductosDTO