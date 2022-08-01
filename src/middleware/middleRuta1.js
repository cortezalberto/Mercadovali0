function Ru1(req,res, next) {
    console.log(" Soy un Middleware de Ruta : Ruta 1"); 
 
  next()   
 }
 
 module.exports = Ru1