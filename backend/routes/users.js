import express from "express";
import User from "../models/User.js";
const router = express.Router();

//post
router.post("/register", async (req, res) => {
  const { username, email, password, country, city, phone, img, isAdmin } =
    req.body;

  try {
    //Generar contraseña
    //Creo una variable
    const salt = await bcrypt.genSalt(10);
    //Apartir de la contraseña que creò el usuario, esta librerìa la tasnsfotma
    const hashedPasswaord = await bcrypt.hash(password, salt);

    const user = new User(
      username,
      email,
      hashedPasswaord,
      country,
      city,
      phone,
      img,
      isAdmin
    ); //Traigo el modelo, lo instancio.
    const userSave = await user.save(); //Lo llamo para acceder a sus métodos
    res.status(200).json(userSave); //Lo envío como objeto json
    console.log(userSave);
  } catch (error) {
    res.status(500).json(error);
  }
});

//put
router.put("/:id", async (req, res) => {
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
    res.status(500).json(error);
  }
});

//delete

router.delete("/:id", async (req, res) => {
  const idUser = req.params.id;
  try {
    await User.findByIdAndDelete(idUser);
    res.status(200).json(`Usuario:${idUser} eliminado con èxito`);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get
router.get("/", async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get only
router.get("/:id", async (req, res) => {
  const idUser = req.params.id;
  try {
    const getUser = await User.findById(idUser);
    if (!getUser) {
      return res.status(404).json(`No se encuentra el usuario: ${idUser}`);
    }
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.get("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const getUser = await User.findOne(username);
    const validatePassword = bcrypt.compare(password, userLogin.password); //Comparar la contraseña que llega con la que tenfo en la base de datos.
    !getUser && res.status(404).json("El Usuario y/o Contraseña es incorrecto");
    !validatePassword && res.status(404).json("El Usuario y/o Contraseña es incorrecto");
    res.status(200).json(getUser._id, getUser.username);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
