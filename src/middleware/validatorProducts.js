const { body } = require("express-validator")

const path = require("path")

const validacion = [
    body('name').notEmpty().withMessage("No puede estar el campo vacio").bail()
    .isLength({min: 4}).withMessage('Debes escribir un nombre de producto con más de 4 caracteres'),
   
	body('price').notEmpty().withMessage("No puede estar el campo vacio"),
	body("category").notEmpty().withMessage("Debe seleccionar una categoria"),

	body('description').notEmpty().withMessage('Debe escribir una descripcion.').bail()
	.isLength({min:4}).withMessage('Debe escribir como minimo 4 letras o caracteres.'),

	body("image").custom((value, {req}) => {
        if(req.files.length == 0)
        {
            throw new Error("Amigo, Debes subir al menos una imagen:")
        }

		
        else {
		let extensionesValidas = [".png", ".jpg", ".jpeg"]
        let fileExtension = ""
        let contadorDeErrores = 0
        for (let i = 0; i < req.files.length; i++) {
            fileExtension = path.extname(req.files[i].originalname)
            if(!extensionesValidas.includes(fileExtension))
            {
                contadorDeErrores++
            }
        }
        if(contadorDeErrores>0)
        {
            throw new Error("Los formatos de imagen validos son .png y jpg")
        }
        else
        {
            return true
        }}
    }),
	
]
module.exports = validacion