import axios from 'axios'

/* 
get
http://localhost:8080/product/

getById
http://localhost:8080/product/:id

post
http://localhost:8080/product/

put
http://localhost:8080/product/:id

delete
http://localhost:8080/product/:id

de estas rutas ejecutar el metodo correspondiente de axios y mostrar en consola el resultado
*/

const url = 'http://localhost:8080/product/'
const admin = true;

const get = async () => {
  try {
    const response = await axios.get(url)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

const getById = async (id) => {
    try {
        const response = await axios.get(`${url}${id}`)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
    }

const post = async (data) => {
    if (admin) {
    try {
        const response = await axios.post(url, data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
    } else {
        console.log('No tiene permisos para realizar esta accion')
    }
    }

const put = async (id, data) => {
    if (admin) {
    try {
        const response = await axios.put(`${url}${id}`, data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
    } else {
        console.log('No tiene permisos para realizar esta accion')
    }
    }

const del = async (id) => {
    if (admin) {
    try {
        const response = await axios.delete(`${url}${id}`)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
    } else {
        console.log('No tiene permisos para realizar esta accion')
    }
    }

get()
//getById(1)
post({
	"title": "papa",
	"price": 100,
	"description": "producto de prueba",
	"code":  "222",
	"image": "imagen.jpg",
	"stock": 10,
	"timestamp": "today"
})
/* put(1, {
	"title": "producto 1 de prueba",
	"price": 100,
	"description": "producto 1 de prueba",
	"code":  "123",
	"image": "imagen.jpg",
	"stock": 10,
	"timestamp": "today"
}) */
//del(1)

export { get, getById, post, put, del }
