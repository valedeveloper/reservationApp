import express from "express";
import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getSingleHotel,
  countByCity,
  countByType,
  getHotelOne,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utilities/verifyToken.js";
const router = express.Router();

//get
router.get("/", getHotels);

//post
router.post("/", verifyAdmin, createHotel);

//put
router.put("/:id", verifyAdmin, updateHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);


router.get("/find/:id",getHotelOne)
//get query

router.get("/find", getSingleHotel);
//countByCity

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);


export default router;
