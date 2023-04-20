const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api en Express con Swagger",
            description: "CRUD de Productos y Carritos"
        }
    },

    apis: ['./docs/**/*.yaml']
}

const swaggerSpecs = swaggerJsdoc(options)

module.exports = { swaggerSpecs }

