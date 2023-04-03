import { buildSchema } from "graphql";

export const schemaProducto = buildSchema(`
    type Producto {
       id: ID!,
       title: String,
       price: Float,
       thumb: String,
    }

    input ProductoInput {
        title: String,
        price: Float,
        thumb: String,
    }

    type Query {
        getProductos: [Producto],
        getProducto(id: ID!): Producto,
    }

    type Mutation {
        postProducto(data: ProductoInput): Producto
        updateProducto(id: ID!, data: ProductoInput): Producto
        deleteProducto(id: ID!): String
    }
`)