function Mapl1(req,res, next) {
   console.log(" Ejecuto un Middleware transversal a tosa la aplicación: M1"); 

 next()   
}

module.exports = Mapl1