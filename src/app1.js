// ************ Require's ************

const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE


// ************ Middlewares - (don't touch) ************
//app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

const mainRouter = require('./routes/main'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products

app.use('/', mainRouter);
app.use('/products', productsRouter);



const port = 3000


app.listen(port, () => console.log(`aplicación funcionando ${port}!`))