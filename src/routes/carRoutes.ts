import express from "express";
import {
  addNewCar,
  getAllCars,
  getCarById,
  getCarsByBodyType,
  getCarsByBrand,
  updateCar,
} from "../controllers/carController";

const router = express.Router();

router.get("/", getAllCars);
router.get("/brand/:brand", getCarsByBrand);
router.get("/bodytype/:bodytype", getCarsByBodyType);
router.get("/:id", getCarById);
router.put("/:id", updateCar);
router.post("/", addNewCar);
// router.delete("/", deleteCar);

export default router;
