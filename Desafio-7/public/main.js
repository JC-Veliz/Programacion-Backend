//CLIENTE
const socket = io()

socket.on('mensajes', historial => {
  
  if ((historial.length >= 1)) {
    html = historial.map(msj => {
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
                <td>${prod.titulo}</td>
                <td>${prod.descripcion}</td>
                <td>${prod.codigo}</td>
                <td>${prod.precio}</td>                
                <td><img style="width: 80px;" src="${prod.foto}", alt="sin imagen"></td>
                <td>${prod.stock}</td>                
              </tr>`                  
    }).join(" ")
    
    html =`
    <h1 style="color:crimson; text-align: center">Historial</h1>
      <table class="table table-dark">
        <tr style="color: yellow;"> <th>Titulo</th> <th>Descripcion</th> <th>Codigo</th> <th>Precio</th> <th>Imagen</th> <th>Stock</th></tr>
        ${html2}    
      </table>` 
  
  }
  document.getElementById("product").innerHTML = html
})

// //Funcion guardar mensajes
// //Toma los valores de los imput, los guarda y los envia al servidor
function addMessage() {
  const message = {
    nombre: document.getElementById("nombre").value,
    fyh: new Date().toLocaleString(),
    mensaje: document.getElementById("mensaje").value
  }
      
    socket.emit('new-msj', message)
    
    return false
  
}

//Funcion guardar productos
//Toma los valores de los imput, los guarda y los envia al servidor
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


