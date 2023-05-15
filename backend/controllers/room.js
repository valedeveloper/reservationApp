import RoomModel from "../models/Room.js";

export const getRoom = async (req, res,next) => {
  try {
    const getRooms = await RoomModel.find();
    res.status(200).json(getRooms);
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (req, res,next) => {
  const room = new RoomModel(req.body);
  try {
    const saveRoom = await room.save();
    res.status(200).json(saveRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res,next) => {
  const idRoom = req.params.id;
  try {
    const updateRoom = await RoomModel.findByIdAndUpdate(
      idRoom,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res,next) => {
  const idRoom = req.params.id;

  try {
    await RoomModel.findByIdAndDelete(idRoom);
    res.status(200).json(`Se ha eliminado la habitación ${idRoom}`);
  } catch (error) {
    next(error);
  }
};

export const getSingleRoom = async (req, res,next) => {
  const idRoom = req.params.id;

  try {
    const singleRoom = await RoomModel.findById(idRoom);
    res.status(200).json(singleRoom);
  } catch (error) {
    next(error);
  }
};
