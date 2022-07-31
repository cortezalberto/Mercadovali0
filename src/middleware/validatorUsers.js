const { body } = require("express-validator")

const path = require("path")

const validacion = [
    body('name').notEmpty().withMessage("Usamos tu nombre para identificar tus pedidos.").bail()
    .isLength({min: 4}).withMessage('Debes escribir un nombre de usuario con más de 2 caracteres'),
   
	body('email').notEmpty().withMessage("Tienes que escribir tu correo."),
   
	body('password').notEmpty().isLength({min: 8}).withMessage('Debes escribir una contraseña con más de 8 caracteres'),
    
	body('telefono').notEmpty().withMessage("tienes que escribir tu números de telefono"),
    
	body('persona').notEmpty().withMessage("Tienes que elegir una categoria"),
   
	body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	})
]
module.exports = validacion