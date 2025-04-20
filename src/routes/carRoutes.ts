import express from "express";
import { getAllCars, getCarById } from "../controllers/carController"

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);
// router.post("/", addNewCar);
// router.put("/", updateCar);
// router.delete("/", deleteCar);

export default router;