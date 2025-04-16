import express from "express";
import { getAllCars } from "../controllers/carController"

const router = express.Router();

router.get("/", getAllCars);
// router.get("/", getCarById);
// router.post("/", addNewCar);
// router.put("/", updateCar);
// router.delete("/", deleteCar);

export default router;