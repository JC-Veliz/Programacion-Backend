const socket = io();

//DENORMALIZR
const authorSchema = new normalizr.schema.Entity(
  "author",
  {},
  { idAttribute: "id" }
);

const mensajeSchema = new normalizr.schema.Entity(
  "mensaje",
  {
    author: authorSchema,
  },
  { idAttribute: "_id" }
);

const mensajesSchema = new normalizr.schema.Entity("mensajes", {
  mensajes: [mensajeSchema],
});

//MENSAJES

const email = document.querySelector("#email");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const edad = document.querySelector("#edad");
const alias = document.querySelector("#alias");
const avatar = document.querySelector("#avatar");
const mensaje = document.querySelector("#mensaje");
const titulo = document.querySelector("#tituloChat");

const regexEmail =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

document.querySelector("#enviarMensaje").addEventListener("click", (e) => {
  e.preventDefault();

  if (email.value !== "" && regexEmail.test(email.value)) {
    socket.emit("mimensaje", {
      email: email.value,
      nombre: nombre.value,
      apellido: apellido.value,
      edad: edad.value,
      alias: alias.value,
      avatar: avatar.value,
      mensaje: mensaje.value,
      fyh: new Date().toLocaleString(),
    });
    console.log("env");
  } else {
    alert("Email invalido");
  }

  email.value = "";
  nombre.value = "";
  apellido.value = "";
  edad.value = "";
  alias.value = "";
  avatar.value = "";
  mensaje.value = "";
});

socket.on("mensajes", (data) => {
  let mensajesNormSize = JSON.stringify(data).length;

  let mensajesD = normalizr.denormalize(
    data.result,
    mensajesSchema,
    data.entities
  );

  let mensajesDeNormSize = JSON.stringify(mensajesD).length;

  titulo.innerText = `Chat: porcentaje de compresión ${
    (mensajesNormSize * 100) / mensajesDeNormSize - 100
  }%`;

  console.log(mensajesD);
  const mensajesHTML = mensajesD.mensajes
    .map(
      (msj) =>
        `<strong style="color:blue">${msj.author.id}</strong> [<span style="color:red">${msj.fyh}</span>]: <span style="color:green">${msj.text}</span>`
    )
    .join("<br>");

  document.querySelector("#p").innerHTML = mensajesHTML;
});
