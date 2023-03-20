const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const { home, socket } = require('./routes/operations.js')

const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

app.use('/', home)

//socket
socket(io)

// listen
const PORT = 8080
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})