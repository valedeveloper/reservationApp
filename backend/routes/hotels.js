import express from "express";
import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getSingleHotel,
  countByCity,
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

//getOne
router.get("find/:id", getSingleHotel);

//countByCity

router.get("/countByCity", countByCity);


export default router;
