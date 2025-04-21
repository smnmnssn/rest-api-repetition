import express from "express";
import {
  addNewCar,
  getAllCars,
  getCarById,
  getCarsByBrand,
  updateCar,
} from "../controllers/carController";

const router = express.Router();

router.get("/", getAllCars);
router.get("/brand/:brand", getCarsByBrand);
router.get("/:id", getCarById);
router.post("/", addNewCar);
router.put("/:id", updateCar);
// router.delete("/", deleteCar);

export default router;
