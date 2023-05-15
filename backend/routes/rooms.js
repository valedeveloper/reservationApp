import express from "express";
import {
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getSingleRoom,
} from "../controllers/room.js";
const router = express.Router();

//get

router.get("/", getRoom);

//post

router.post("/", createRoom);

//put

router.put("/:id", updateRoom);

//delete

router.delete("/:id", deleteRoom);

//findOne

router.get("/:id", getSingleRoom);

export default router;
