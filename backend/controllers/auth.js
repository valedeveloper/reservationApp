import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utilities/error.js";

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
    if (!getUser)
      return next(createError(404, "El Usuario y/o Contraseña es incorrecto"));
    if (!validatePassword)
      return next(createError(404, "El Usuario y/o Contraseña es incorrecto"));

    const { password, isAdmin, ...otherDetails } = getUser._doc;
    res.status(200).json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
