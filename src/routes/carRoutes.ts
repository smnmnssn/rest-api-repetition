import express from "express";
import {
  addNewCar,
  getAllCars,
  getCarById,
  getCarsByBodyType,
  getCarsByBrand,
  updateCar,
  deleteCar,
} from "../controllers/carController";

const router = express.Router();

// GET-routes
router.get("/", getAllCars);
router.get("/brand/:brand", getCarsByBrand);
router.get("/bodytype/:bodytype", getCarsByBodyType);
router.get("/:id", getCarById);

// POST-routes
router.post("/", addNewCar);

// PUT-routes & DELETE-routes
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);


export default router;