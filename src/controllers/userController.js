
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const jsonDB = require("../model/jsonDatabase");
const usersModel = jsonDB("users");

const userController = {
  login: (req, res) => {
    return res.render("users/login");
  },

  loginproceso: (req, res) => {
    // 1. Verifico que el mail exita en mi base de datos
    // Busco por el criterio de campo y comparao con el email que viene del formulario
    let userToLogin = usersModel.findByField("email", req.body.email);
    // Si coincide el mail , compruebo si la password coincide
    if (userToLogin) {
      let passwordOk = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      )
    // si todo está bien, guardo ese usuario en la Session  pero por seguridad...
    // elimito del objeto literal las password
      if (passwordOk) {
        delete userToLogin.password;
        delete userToLogin.confirmarPassword
      // a partir de req.session se pueden crear cualquier atributo
        req.session.userLoged = userToLogin

        console.log(req.session)

        if (req.body.recordarme) {
          res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60 ) * 10 });
        }

        return res.redirect("/");
      }

      return res.render("users/login", {
        errors: {
          email: {
            msg: "Las credenciales son invalidas",
          },
        },
      });
    }

    return res.render("users/login", {
      errors: {
        email: {
          msg: "Este correo no esta registrado",
        },
      },
    });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userEmail");
    return res.redirect("/");
  },

  register: (req, res) => {
    return res.render("users/register");
  },
  
  processRegister: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    const newUsuario = {
      nombre: req.body.name,
      apellido: req.body.lastName,
      email: req.body.email,
      telefono: req.body.telefono,
      password: bcrypt.hashSync(req.body.password, 10),    
      categoria: req.body.persona,
      confirmarPassword: req.body.confirmarPassword,
      avatar: req.file.filename,
    };
    newUsuario.categoria.trim();
    usersModel.create(newUsuario);
    res.redirect("/");
  },
};

module.exports = userController;
