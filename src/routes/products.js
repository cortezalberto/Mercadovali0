// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const upload = require('../middleware/middlemulter')
const validacion = require('../middleware/validatorProducts')
const mr1 = require('../middleware/middleRuta1')
const mr2 = require('../middleware/middleRuta2')

/*** GET ALL PRODUCTS ***/ 
//router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
// array() para subir muchos archivos
router.post('/', upload.array('image'), validacion , productsController.store);


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', mr1 , mr2 , productsController.edit); 
router.put('/edit/:id', upload.array('image'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
