//CLIENTE
const socket = io()

//SCHEMA
const authorSchema = new normalizr.schema.Entity("author",{},{idAttribute: "email"});
              
const messageSchema = new normalizr.schema.Entity("message", {author: authorSchema });
    
const messagesSchema = new normalizr.schema.Entity("messages", {messages: [messageSchema] });



socket.on('mensajes', mensajes => {

  let mensajeNorm = mensajes.dataNormalized

  let dataDenormalizada = normalizr.denormalize(mensajeNorm.result, messagesSchema, mensajeNorm.entities)
   
  let html = ""
  if ((dataDenormalizada.messages.length >= 1)) {
    html = dataDenormalizada.messages.map(msj => {
      return `<div class="container mt-3 style=text-align: center">                  
                  <strong style="color:blue">${msj.author.nombre}</strong>
                  [<span style="color:brown">${msj.timestamp}</span>]
                  <em style="color:green">: ${msj.text}</em>
                  
              </div>`
    }).join(" ")
  }
  document.getElementById("message").innerHTML = html

  let p = `<h1 style="color:crimson; text-align: center;">Compresion: %${mensajes.porcentageCompression}</h1>`

  document.getElementById("compresion").innerHTML = p
})


socket.on('faker', produc => {  
  if (produc.length >= 1) {
    let html2 = produc.map(prod => {
      return `<tr> 
                <td>${prod.id}</td>               
                <td>${prod.nombre}</td>
                <td>${prod.descripcion}</td>
                <td>${prod.codigo}</td>
                <td>${prod.precio}</td>                
                <td><img style="width: 80px;" src="${prod.foto}", alt="sin imagen"></td>
                <td>${prod.stock}</td>                
              </tr>`                  
    }).join(" ")
    
    html =`
    <h1 style="color:crimson; text-align: center"> 5 Productos Random</h1>
      <table class="table table-dark">
        <tr style="color: yellow;"> <th>ID</th><th>Titulo</th> <th>Descripcion</th> <th>Codigo</th> <th>Precio</th> <th>Imagen</th> <th>Stock</th></tr>
        ${html2}    
      </table>` 
  
  }
  document.getElementById("product").innerHTML = html
})

// //Funcion guardar mensajes
// //Toma los valores de los imput, los guarda y los envia al servidor
function addMessage() {
  const message = {

    author: {
      email: document.getElementById("email").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("texto").value,
    timestamp: new Date().toLocaleString(),
    
  }

    socket.emit('new-msj', message)

    return false
  
}






