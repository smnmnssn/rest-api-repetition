import express from "express";
import {
  addNewCar,
  getAllCars,
  getCarById,
  updateCar
} from "../controllers/carController";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", addNewCar);
router.put("/:id", updateCar);
// router.delete("/", deleteCar);

export default router;
