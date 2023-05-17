import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utilities/error.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    //Generar contraseña
    //Creo una variable
    const salt = await bcrypt.genSaltSync(10);
    //Apartir de la contraseña que creò el usuario, esta librerìa la tasnsfotma
    const hashedPasswaord = await bcrypt.hashSync(req.body.password, salt);

    const user = new User({ ...req.body, password: hashedPasswaord }); //Traigo el modelo, lo instancio.
    const userSave = await user.save(); //Lo llamo para acceder a sus métodos
    res.status(201).json(userSave); //Lo envío como objeto json
    console.log(userSave);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const getUser = await User.findOne({ username });
    const validatePassword = bcrypt.compare(
      req.body.password,
      getUser.password
    ); //Comparar la contraseña que llega con la que tenfo en la base de datos.
    if (!getUser) return next(createError(404, "No se encuentra el usuario"));
    if (!validatePassword)
      return next(createError(401, "El Usuario y/o Contraseña es incorrecto")); //Recordemos que el next, es para seguir al otro midlwarees el que captura los errores. En nuestro caso le estamos pasando los mensjae y ese midlware lo va a mostrar

    const token = jwt.sign(
      { id: getUser._id, isAdmin: getUser.isAdmin },
      process.env.JWT
    ); //Creaciòn del token, recibiendo por paràmetro la info del usuario y una clase secreta
    const { password, isAdmin, ...otherDetails } = getUser._doc; //Esta es una forma de sacar los "items"que queremos mostrar. En este caso sacarmos el passwordyel isAdmin. yel spredoperator, hace referencia a los otros detalles que faltan
    res
      .cookie("access_token", token, {
        httpOnly: true, //Solo puede ser accedida a través del protocolo HTTP
      })
      .status(200)
      .json({ ...otherDetails }); //Esos detalles serán enviados como respuesta.
  } catch (error) {
    next(error);
  }
};
