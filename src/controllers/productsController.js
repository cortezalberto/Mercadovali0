
const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('products')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { validationResult } = require("express-validator");


const controller = {


    detail: (req, res) => {
        const product = productModel.find(req.params.id)
        console.log("------------ESTOY EN DETAIL----------------------")
        console.log(product)
        console.log(product.image[0])
        // COn este veo las otras fotos por eso el índice empieza en UNO Esto NO SIRVE !!!
        console.log("VEO LAS SIGUIENTES FOTOS")
        for (let i = 1; i < (product.image).length; i++) {
            console.log(product.image[i])

        }
        res.render('detail', {
            product,
            toThousand
        })
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('product-create-form')
    },


    // Create -  Method to store

    store: (req, res) => {
        // Comienzo a validar
        /*
                const resultadosValidaciones = validationResult(req);
                console.log("antes del RESULT")
                console.log(resultadosValidaciones)
                console.log("despues del RESULT")
                console.log(resultadosValidaciones.errors)
    	
                if (!resultadosValidaciones.isEmpty()) {
                    console.log("----- ojo HAY ERRORESsssssssss -----------------")
                } else {
                    console.log("--no hay ERRORESnnnnnnnnnnnn ---------------------------")
                }
        */

        // Acá se trata como un array de files

        console.log("-----LLEGO ESTA FOTO --------")
        console.log(req.files[0].filename)
       

        const resultadosValidaciones = validationResult(req);

        if (!resultadosValidaciones.isEmpty())
            console.log("-------- my body -------------------")
        console.log(req.body);
        {
            return res.render('product-create-form', {
                errors: resultadosValidaciones.mapped(),
                datosRecienCargados: req.body

            })
        }




        // Acá se trata como un array de files
        let imagenes = []
        // leo secuencialmente el array de fotos y las cargo en el array de imágenes
        //  puede ser que venga una sóla foto
        for (let i = 0; i < req.files.length; i++) {
            imagenes.push(req.files[i].filename)
        }



        // Atrapo todos los campos del formulario

        const newProduct = {
            ...req.body,
            // Si no mando imágenes pongo na por defecto
            // image:req.files != undefined?imagenes:"default.jpg"
            image: req.files.length >= 1 ? imagenes : ["default-image.png"]
        }
        productModel.create(newProduct)
        console.log('cree un nuevo producto')
        res.redirect('/')
    },


    // Update - Form to edit


    edit: (req, res) => {
        console.log('ESTOY USANDO EL EDIT DEL GENERICO')
        let productToEdit = productModel.find(req.params.id)
        console.log(productToEdit.image)
        res.render('product-edit-form', { productToEdit })
    },

    // Update - Method to update



    update: (req, res) => {
        let productToEdit = productModel.find(req.params.id);

        let imagenes = [];
        // leo secuencialmente el array de fotos y las cargo en el array de imágenes
        //  puede ser que venga una sóla foto
        for (let i = 0; i < req.files.length; i++) {
            imagenes.push(req.files[i].filename)
        }

        productToEdit = {

            id: productToEdit.id,
            ...req.body,
            // Si se suben imagenes se pone como valor el array imagenes y sino se queda el que ya estaba antes
            image: req.files.length >= 1 ? imagenes : productToEdit.image

        }

        productModel.update(productToEdit)
        res.redirect("/");

    },


    destroy: function (req, res) {
        productModel.delete(req.params.id);
        res.redirect("/");
    }



};



module.exports = controller;