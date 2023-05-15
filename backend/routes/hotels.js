import express from "express";
import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getSingleHotel,
} from "../controllers/hotel.js";
const router = express.Router();

//get
router.get("/", getHotels);

//post
router.post("/", createHotel);

//put
router.put("/:id", updateHotel);

//delete
router.delete("/:id", deleteHotel);

//getOne
router.get("/:id", getSingleHotel);

export default router;
