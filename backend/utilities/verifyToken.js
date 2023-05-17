import { createError } from "../utilities/error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; //capturo la cookie con nombre "access_token" que enviè a la hora de hacer el login
  if (!token) return next(createError(401, "Usted no está autorizado porque no tiene token")); //Si dentro del body, no viene una cookie quiere decir qu ese usiuario no està autorizado

  //Aquí se va a verificar que el token que viene desde el body es el mismo que tenemos en la variable de entrono que nosotores hemos creado.
  jwt.verify(token, process.env.JWT, (err, user) => {
    //Por paràmetro entra el token que viene en l body, el de a variable de entonro nuestra y uina funciòn que vamos a controlar para ver si vienen errores y las respuestas.
    if (err) return next(createError(403, "Su cookie no es válida")); //Si viene un error, esto quiere decir que no coinciden el token que entra con la nuestra, lo que quiere decir que ese usuario no tiene permisos suficientes
    req.user = user;
    console.log(user);
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, "Tú no estás autorizado"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res,next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Tú no eres admin"));
    }
  });
};
