import express from "express";
import HotelModel from "../models/Hotel.js";

export const getHotels = async (req, res) => {
  try {
    const getHotels = await HotelModel.find();
    res.status(200).json(getHotels);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createHotel = async (req, res) => {
  const hotel = new HotelModel(req.body);
  try {
    const saveHotel = await hotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateHotel = async (req, res) => {
  const idHotel = req.params.id;
  try {
    const updateHotel = await HotelModel.findByIdAndUpdate(
      idHotel,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteHotel = async (req, res) => {
  const idHotel = req.params.id;

  try {
    await HotelModel.findByIdAndDelete(idHotel);
    res.status(200).json(`Se ha eliminado el hotel: ${idHotel}`);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSingleHotel = async (req, res) => {
  const idHotel = req.params.id;
  try {
    const singleHotel = await HotelModel.findById(idHotel);
    res.status(200).json(singleHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
