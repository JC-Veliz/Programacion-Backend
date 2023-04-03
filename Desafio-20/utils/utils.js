import { faker } from "@faker-js/faker";
import { normalize, denormalize, schema } from "normalizr";
faker.locale = "es";

function generarProducto() {
  return {
    titulo: faker.commerce.product(),
    precio: faker.commerce.price(),
    imagen: faker.image.animals(),
  };
}

const normalizar = (data) => {
  const authorSchema = new schema.Entity("author", {}, { idAttribute: "id" });

  const mensajeSchema = new schema.Entity(
    "mensaje",
    {
      author: authorSchema,
    },
    { idAttribute: "_id" }
  );

  const mensajesSchema = new schema.Entity("mensajes", {
    mensajes: [mensajeSchema],
  });

  const mensajesNorm = normalize(data, mensajesSchema);

  return mensajesNorm;
};

export { generarProducto, normalizar };
