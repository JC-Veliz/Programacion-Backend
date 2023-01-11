const {connect} = require('../config/mongoDbConfig.js');
const {normalize, schema, denormalize } = require ('normalizr')



class ContenedorMensajesNormalizados{
    constructor(){
        this.mensajes = [];      
    }
    
    async normalizeMessages(data) {   
        
        
        await connect()
        
        try{       
        
            const mensajes = {
                id: 'backendCoder09',
                messages: data
              };          
                           
                          
                           
              //SCHEMAS
              
              const authorSchema = new schema.Entity("author",{},{idAttribute: "email"});
              
              const messageSchema = new schema.Entity("message", {
                author: authorSchema
              });
              
              const messagesSchema = new schema.Entity("messages", {
                messages: [messageSchema]
              });
              
              const messagesNorm = normalize( mensajes,messagesSchema);

              const original = JSON.stringify(mensajes).length
              const normalized = JSON.stringify(messagesNorm).length
            
              

            const valueToReturn = {
                dataNormalized: messagesNorm,
                dataDenormalized: denormalize(messagesNorm.result, messagesSchema, messagesNorm.entities),
                porcentageCompression: (100 - (JSON.stringify(messagesNorm).length * 100 / JSON.stringify(mensajes).length)).toFixed(2),
                Normalized: normalized,
                Original: original
            }
            return valueToReturn

        }catch (error){

            console.log(error)
        }
        
    }

}

module.exports = ContenedorMensajesNormalizados;