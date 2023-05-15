import express from "express";
const router = express.Router();
import {
  updateUser,
  deleteUser,
  getUser,
  getSingleUser,
} from "../controllers/user.js";



//put
router.put("/:id", updateUser);

//delete

router.delete("/:id", deleteUser);

//get
router.get("/", getUser);

//get only
router.get("/:id", getSingleUser);



export default router;
