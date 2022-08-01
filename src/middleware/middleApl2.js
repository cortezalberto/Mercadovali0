function Mapl2(req,res, next) {
    console.log(" Ejecuto un Middleware transversal a toda la aplicación: M2"); 
 
  next()   
 }
 
 module.exports = Mapl2