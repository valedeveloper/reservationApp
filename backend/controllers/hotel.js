import HotelModel from "../models/Hotel.js";

export const getHotels = async (req, res,next) => {
  try {
    const getHotels = await HotelModel.find();
    res.status(200).json(getHotels);
  } catch (error) {
    next(error);
  }
};

export const createHotel = async (req, res,next) => {
  const hotel = new HotelModel(req.body);
  try {
    const saveHotel = await hotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res,next) => {
  const idHotel = req.params.id;
  try {
    const updateHotel = await HotelModel.findByIdAndUpdate(
      idHotel,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res,next) => {
  const idHotel = req.params.id;

  try {
    await HotelModel.findByIdAndDelete(idHotel);
    res.status(200).json(`Se ha eliminado el hotel: ${idHotel}`);
  } catch (error) {
    next(error);
  }
};

export const getSingleHotel = async (req, res,next) => {
  const idHotel = req.params.id;
  try {
    const singleHotel = await HotelModel.findById("hola");
    res.status(200).json(singleHotel);
  } catch (error) {
    next(error);
  }
};
export const countByCity =  async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
         return HotelModel.countDocuments({ city: city });
        // return HotelModel.find({city:city}).length //Busque en el modelo y encuentre esta city y la cuenta
      })
    );
    res.status(200).json({ list });
  } catch (error) {
    next(error);
  }
};
