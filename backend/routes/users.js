import express from "express";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../utilities/verifyToken.js";

const router = express.Router();
import {
  updateUser,
  deleteUser,
  getUser,
  getSingleUser,
} from "../controllers/user.js";

router.get("/checkauthorized", verifyToken, (req, res) => {
  res.send("Hola, token verificado"); //Esto es midleware, el tercer paràmetro siempre es el next()
});

router.get("/checkuser/:id", verifyUser, (req, res) => {
  res.send("Hola, eres usuario"); //Esto es midleware, el tercer paràmetro siempre es el next()
});
router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
  res.send("Eres admin. ¡Bienvenido!");
});
//put
router.put("/:id", verifyUser, updateUser);

//delete

router.delete("/:id", verifyUser, deleteUser);

//get
router.get("/", verifyAdmin, getUser);

//get only
router.get("/:id", getSingleUser);

export default router;
