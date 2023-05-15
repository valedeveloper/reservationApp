import express from "express";
import RoomModel from "../models/Room.js";
const router = express.Router();

//get

router.get("/", async (req, res) => {
  try {
    const getRooms = await RoomModel.find();
    res.status(200).json(getRooms);
  } catch (error) {
    res.status(500).json(error);
  }
});

//post

router.post("/", async (req, res) => {
  const room = new RoomModel(req.body);
  try {
    const saveRoom = await room.save();
    res.status(200).json(saveRoom);
  } catch (error) {
    res.status(500).json(error);
  }
});

//put

router.put("/:id", async (req, res) => {
  const idRoom = req.params.id;
  try {
    const updateRoom = await RoomModel.findByIdAndUpdate(
      idRoom,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete

router.delete("/:id", async (req, res) => {
  const idRoom = req.params.id;

  try {
    await RoomModel.findByIdAndDelete(idRoom);
    res.status(200).json(`Se ha eliminado la habitación ${idRoom}`);
  } catch (error) {
    res.status(500).json(error);
  }
});

//findOne

router.get("/:id", async (req, res) => {
  const idRoom = req.params.id;

  try {
    const singleRoom = await RoomModel.findById(idRoom);
    res.status(200).json(singleRoom);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
