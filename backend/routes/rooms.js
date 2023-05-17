import express from "express";
import {
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getSingleRoom,
} from "../controllers/room.js";
import { verifyAdmin } from "../utilities/verifyToken.js";
const router = express.Router();

//get

router.get("/", getRoom);

//post

router.post("/:idHotel", verifyAdmin, createRoom);

//put

router.put("/:idRoom", verifyAdmin, updateRoom);

//delete

router.delete("/:idRoom/:idHotel", verifyAdmin, deleteRoom);

//findOne

router.get(":id", getSingleRoom);


export default router;
