const PORT = 8080
const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')

const productos= [
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
      }

]



app.get('/productos',  (req,res) =>{
        
    res.render('inicio',  {productos})

})

app.post('/productos', (req,res) =>{

    productos.push(req.body)
    res.redirect('/productos')
})



const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en el 8080')
})
