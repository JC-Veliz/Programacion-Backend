//test con mocha supertest chai con axios
import axios from 'axios'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { get, getById, post, put, del } from './axios/axios.js'
import request from 'supertest'

/* const getAxios = () => axios.get('http://localhost:8080/product/')
const getByIdAxios = id => axios.get(`http://localhost:8080/product/${id}`)
const postAxios = product => axios.post('http://localhost:8080/product/', product)
const putAxios = (id, product) => axios.put(`http://localhost:8080/product/${id}`, product)
const delAxios = id => axios.delete(`http://localhost:8080/product/${id}`) */

const requestSupertest = request('http://localhost:8080')

describe('Test de rutas', () => {

    before(async () => { console.log('inicio de test Rutas') })

    it('GET /product/', async () => {
        const response = await requestSupertest.get('/product/')
        expect(response.status).to.equal(200)
    })
    it('GET /product/:id', async () => {
        const response = await requestSupertest.get('/product/6420f6caef4847be08abfb92')
        expect(response.status).to.equal(200)
    })
    it('POST /product/', async () => {
        const productTest = {
            "title": "producto x de prueba",
            "price": 300,
            "description": "producto x de prueba",
            "code":  "252",
            "image": "imagen.jpg",
            "stock": 10,
            "timestamp": "today"
        }
        const response = await requestSupertest.post('/product/').send(productTest)
        expect(response.status).to.equal(200)
    })
    it('PUT /product/:id', async () => {
        const productTest = {
            "title": "cebollas",
            "price": 300,
            "description": "producto 4 de prueba",
            "code":  "252",
            "image": "imagen.jpg",
            "stock": 10,
            "timestamp": "today"
        }
        const response = await requestSupertest.put('/product/6420f8468411d8a11917522e').send(productTest)
        expect(response.status).to.equal(200)
    })

    //COMENTADO PARA QUE NO BORRE PERO FUNCIONA OK
    /* it('DELETE /product/:id', async () => {
        const response = await requestSupertest.delete('/product/6420f6caef4847be08abfb92')
        expect(response.status).to.equal(200)
    }) */

    after(async () => { console.log('fin de test Rutas') })
})

describe('Test de producto con title tomate', () => {
    
        before(async () => { console.log('inicio de test producto con title tomate') })
    
        it('GET /product/', async () => {
            const response = await requestSupertest.get('/product/')
            expect(response.body[7].title).to.equal('tomate')

        })
    
        after(async () => { console.log('fin de test producto con title tomate') })
    })

describe('Test de producto con price 100', () => {
        
            before(async () => { console.log('inicio de test producto con price 100') })
        
            it('GET /product/', async () => {
                const response = await requestSupertest.get('/product/')
                
                expect(response.body[15].price).to.equal(100)
            })
        
            after(async () => { console.log('fin de test producto con price 100') })
})






