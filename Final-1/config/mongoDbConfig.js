const mongoose = require('mongoose');

const connect = async () => {
    
    try {
        const URL = process.env.MONGO
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