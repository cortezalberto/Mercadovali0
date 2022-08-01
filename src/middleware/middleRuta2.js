function Ru2(req,res, next) {
    console.log(" Soy un Middleware de Ruta : Ruta 2"); 
 
  next()   
 }
 
 module.exports = Ru2