const mongoose = require('mongoose');

const connect = async () => {
    
    try {
        const URL = "mongodb+srv://coderhouse:coderhouse@juan.cqacvqt.mongodb.net/ecommerce?retryWrites=true&w=majority"
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("conectados correctamente")

    } catch (error) {
        console.log("error al conectarse a la base de datos", error)
    }
}

module.exports = { connect };