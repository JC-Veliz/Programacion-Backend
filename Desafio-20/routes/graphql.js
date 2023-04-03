import { graphqlHTTP } from "express-graphql";
import { schemaProducto } from "../models/Schemas/gql_productoSchema.js";
import ProductosRepo from "../repos/productosRepo.js";
const productosR = new ProductosRepo();

async function getProductos () {
    try {
        const productos = await productosR.getAll();
        return productos;
      } catch (error) {
        req.logError(error);
      }
}

async function getProducto ({id}) {
    try {
        const producto = await productosR.getById(id);
        console.log(producto);
        return producto;
      } catch (error) {
        req.logError(error);
      }
}

async function postProducto({data}) {
    const {title, price, thumb} = data;
    try {
        console.log(data);
        const newProduct = await productosR.save({title, price, thumb});
        console.log(newProduct);
        return newProduct;
      } catch (error) {
        req.logError(error);
      }
}

async function deleteProducto({id}) {
    try {
        const deleted = await productosR.deleteById(id);
        return deleted;
      } catch (error) {
        req.logError(error);
      }
}

async function updateProducto({id, data}) {
    const { title, price, thumb } = data;
    try {
        const updated = await productosR.update(id,{id, title, price, thumb});
        return updated;
      } catch (error) {
        req.logError(error);
      }
}

export const productos_r_gql = new graphqlHTTP({
    schema: schemaProducto,
    rootValue: {
      getProductos,
      getProducto,
      postProducto,
      updateProducto,
      deleteProducto,
    },
    graphiql: true,
})