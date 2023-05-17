import HotelModel from "../models/Hotel.js";
import RoomModel from "../models/Room.js";

export const getRoom = async (req, res, next) => {
  try {
    const getRooms = await RoomModel.find();
    res.status(200).json(getRooms);
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (req, res, next) => {
  const idHotel = req.params.idHotel;
  const room = new RoomModel(req.body);
  try {
    const saveRoom = await room.save();
    try {
      await HotelModel.findByIdAndUpdate(idHotel, {
        $push: {
          //Método de mongo para agregar un nuevo dato
          rooms: saveRoom._id,
        },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  const idRoom = req.params.idRoom;
  try {
    const updateRoom = await RoomModel.findByIdAndUpdate(
      idRoom,
      { $set: req.body }, //Que se modifique con lo que viene desde el bogy
      { new: true } //Para que el dato que se muestre sea el corregido
    );

    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const idRoom = req.params.idRoom;
  const idHotel = req.params.idHotel;

  try {
    await RoomModel.findByIdAndDelete(idRoom);
    try {
      await HotelModel.findByIdAndUpdate(idHotel, {
        $pull: { rooms: idRoom },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(`Se ha eliminado la habitación ${idRoom}`);
  } catch (error) {
    next(error);
  }
};

export const getSingleRoom = async (req, res, next) => {
  const idRoom = req.params.id;

  try {
    const singleRoom = await RoomModel.findById(idRoom);
    res.status(200).json(singleRoom);
  } catch (error) {
    next(error);
  }
};
