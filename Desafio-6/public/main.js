//CLIENTE
const socket = io()

socket.on('mensajes', mensajes => {
  
  if ((mensajes.length >= 1)) {
    html = mensajes.map(msj => {
      return `<div class="container mt-3">                  
                  <strong style="color:blue">${msj.nombre}</strong>
                  [<span style="color:brown">${msj.fyh}</span>]
                  <em style="color:green">: ${msj.mensaje}</em>
                  
              </div>`
    }).join(" ")
  }
  
  document.getElementById("message").innerHTML = html
})

socket.on('productos', produc => {

  if (produc.length >= 1) {
    let html2 = produc.map(prod => {
      return `<tr>                
                <td>${prod.title}</td>
                <td>${prod.price}</td>
                <td><img style="width: 80px;" src="${prod.thumbnail}", alt="sin imagen"></td>
              </tr>`                  
    }).join(" ")
    
    html =`
    <h1 style="color:crimson; text-align: center">Historial</h1>
      <table class="table table-dark">
        <tr style="color: yellow;"> <th>Titulo</th> <th>Precio</th> <th>Imagen</th></tr>
        ${html2}    
      </table>` 
  
  }
  document.getElementById("product").innerHTML = html
})

//Funcion guardar mensajes
//Toma los valores de los imput, los guarda y los envia al servidor
function addMessage() {
  const message = {
    email: document.getElementById("username").value,
    text: document.getElementById("text").value
  }
      
    socket.emit('new-msj', message)
    
  
  return false   
}

//Funcion guardar productos
//Toma los valores de los imput, los guarda y los envia al servidor
function addProduct() {
  const producto = {
      titulo: document.getElementById("titulo").value,
      price: document.getElementById("precio").value,
      thumbnail: document.getElementById("imagen").value
  }
     
    socket.emit('new-product', producto)
    
  
  return false 
}


