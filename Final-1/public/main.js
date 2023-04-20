//CLIENTE
const socket = io()

// SCHEMA Normalizer //
const authorSchema = new normalizr.schema.Entity("author",{},{idAttribute: "email"});
              
const messageSchema = new normalizr.schema.Entity("message", {author: authorSchema });
    
const messagesSchema = new normalizr.schema.Entity("messages", {messages: [messageSchema] });
//------------------//

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


socket.on('faker', product => {  
  if (product.length >= 1) {
    let html2 = product.map(prod => {
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
    <h1 style="color:crimson; text-align: center">Productos Random</h1>
      <table class="table table-dark">
        <tr style="color: yellow;"> <th>ID</th><th>Titulo</th> <th>Descripcion</th> <th>Codigo</th> <th>Precio</th> <th>Imagen</th> <th>Stock</th></tr>
        ${html2}    
      </table>` 
  
  }
  document.getElementById("product").innerHTML = html
})

socket.on('productos', produc => {
      
  if (produc.length >= 1) {
    let html2 = produc.map(produ => {
      return `<tr>                               
                <td>${produ.titulo}</td>
                <td>${produ.descripcion}</td>
                <td>${produ.codigo}</td>
                <td>${produ.precio}</td>                
                <td><img style="width: 80px;" src="${produ.foto}", alt="sin imagen"></td>
                <td>${produ.stock}</td>
                <td><button onclick="deleteProduct('${produ._id}')" class="btn btn-success mt-3 mb-5">Eliminar</button></td>            
              </tr>`                  
    }).join(" ")
    
    html =`
    <h1 style="color:crimson; text-align: center"> PRODUCTOS</h1>
      <table class="table table-dark">
        <tr style="color: yellow;"><th>titulo</th> <th>Descripcion</th> <th>Codigo</th> <th>Precio</th> <th>Imagen</th> <th>Stock</th></tr>
        ${html2}    
      </table>` 
  
  }
  document.getElementById("producto").innerHTML = html
})

//----------------Funcion guardar mensajes---------------------------//
// Toma los valores de los imput, los guarda y los envia al servidor //
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
//-------------------------------------------------------------------//

//---------------Funcion guardar productos --------------------------//
// Toma los valores de los imput, los guarda y los envia al servidor //
function addProduct() {
 
  const producto = {
      titulo: document.getElementById("titulo").value,
      descripcion: document.getElementById("descripcion").value,
      codigo: parseInt(document.getElementById("codigo").value),
      precio: parseInt(document.getElementById("precio").value),
      foto: document.getElementById("imagen").value,
      stock: parseInt(document.getElementById("stock").value),
  }
     
    socket.emit('new-product', producto)
    
  
  return false 
}

function deleteProduct(id){
  const productoEliminar = id
  console.log("productoeleimnar")
  console.log(productoEliminar)
  socket.emit('delete-producto', productoEliminar)
  return false

}
//--------------------------------------------------------------------//
