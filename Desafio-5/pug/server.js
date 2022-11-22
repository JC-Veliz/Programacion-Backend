const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.set('views', './views')
app.set('view engine', 'pug')

const productos =[ 
    {
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
      },
      {
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2
      },
      {
        title: "Globo Terraqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3
      },     
      {
        title: "Celular Samsung Galxy S87",
        price: 50000,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/apple-products-2026/512/iPhone_X_home-screen-512.png",
        id: 4
      }

]


app.get('/productos', (req,res) =>{
        
    res.render('prod', {productos})

})

app.post('/productos', (req,res) =>{

    productos.push(req.body)
    res.redirect('/productos')
})





const server = app.listen(8080, () => {
    console.log('Servidor escuchando en el 8080')
})
