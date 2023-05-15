import User from "../models/User.js";

export const createUser = async (req, res, next) => {
  try {
    //Generar contraseña
    //Creo una variable
    const salt = await bcrypt.genSaltSync(10);
    //Apartir de la contraseña que creò el usuario, esta librerìa la tasnsfotma
    const hashedPasswaord = await bcrypt.hashSync(req.body.password, salt);

    const user = new User({ ...req.body, password: hashedPasswaord }); //Traigo el modelo, lo instancio.
    const userSave = await user.save(); //Lo llamo para acceder a sus métodos
    res.status(200).json(userSave); //Lo envío como objeto json
    console.log(userSave);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const idUser = req.params.id;
  try {
    const userUpdate = await User.findByIdAndUpdate(
      idUser,
      {
        $set: req.body, //Lo modifico por lo que viene en el body
      },
      { new: true } //Mostrar el nuevo valor
    );
    res.status(200).json(userUpdate);
    console.log(userUpdate);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const idUser = req.params.id;
  try {
    await User.findByIdAndDelete(idUser);
    res.status(200).json(`Usuario:${idUser} eliminado con èxito`);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
  const idUser = req.params.id;
  try {
    const getUser = await User.findById(idUser);
    if (!getUser) {
      return res.status(404).json(`No se encuentra el usuario: ${idUser}`);
    }
    res.status(200).json(getUser);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const getUser = await User.findOne({ username });
    const validatePassword = bcrypt.compare(password, getUser.password); //Comparar la contraseña que llega con la que tenfo en la base de datos.
    if (!getUser)
      return next(createError(404, "El Usuario y/o Contraseña es incorrecto"));
    if (!validatePassword)
      return next(createError(404, "El Usuario y/o Contraseña es incorrecto"));
    res.status(200).json({ id: getUser._id, username: getUser.username }); //Tener en cuenta que cuando envìo màs de dos keys, se debe de enviar en forma de objeto
  } catch (error) {
    next(error);
  }
};
