import HotelModel from "../models/Hotel.js";

export const getHotels = async (req, res, next) => {
  try {
    const getHotels = await HotelModel.find();
    res.status(200).json(getHotels);
  } catch (error) {
    next(error);
  }
};

export const getHotelOne = async (req, res, next) => {
  const id=req.params.id
  try {
    const getHotel = await HotelModel.findById(id); //Se pasa solo el id, no en obj
    res.status(200).json(getHotel);
  } catch (error) {
    next(error);
  }
};

export const createHotel = async (req, res, next) => {
  const hotel = new HotelModel(req.body);
  try {
    const saveHotel = await hotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
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

export const deleteHotel = async (req, res, next) => {
  const idHotel = req.params.id;

  try {
    await HotelModel.findByIdAndDelete(idHotel);
    res.status(200).json(`Se ha eliminado el hotel: ${idHotel}`);
  } catch (error) {
    next(error);
  }
};

export const getSingleHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await HotelModel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res) => {
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

export const countByType = async (req, res, next) => {
  try {
    const countHotel = await HotelModel.countDocuments({ type: "Hotel" });
    const countApartament = await HotelModel.countDocuments({
      type: "Apartament",
    });
    const countResort = await HotelModel.countDocuments({ type: "Resort" });
    const countVilla = await HotelModel.countDocuments({ type: "Villa" });

    res.status(200).json([
      {
        type: "Hotels",
        count: countHotel,
      },
      {
        type: "Apartaments",
        count: countApartament,
      },
      {
        type: "Resorts",
        count: countResort,
      },
      {
        type: "Villas",
        count: countVilla,
      },
    ]);
  } catch (error) {
    next(error);
  }
};
