//Silly, debug, verbose, info, Warn, error.

const winston = require('winston')

function loggerConsola(){

    return winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'info' }),
                        
        ]    
    
    })


}
function loggerWarn(){

    return winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'warn' }),
            new winston.transports.File({ filename: './loggs/warn.log',level: 'warn' })       
            
        ]    
    
    })


}

function loggerError(){

    return winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'error' }),
            new winston.transports.File({ filename: './loggs/error.log',level: 'error' })
            
        ]    
    
    })


}

let loggerC = loggerConsola()
let loggerW = loggerWarn()
let loggerE = loggerError()


module.exports = {loggerC, loggerW ,loggerE }