import { Request, Response } from "express";
import { Car, CarType } from "../models/Car";

// GET endpoint för att HÄMTA ALLA BILAR.
export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
};

// GET endpoint för att HÄMTA SPECIFIK BIL.
export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id); // OBS: direkt mot _id

    if (!car) {
      return res.status(404).json({ message: "Car not found!" });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving car" });
  }
};

//GET endpoint för att HÄMTA ALLA BILAR FRÅN SAMMA MÄRKE.
export const getCarsByBrand = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find({
      brand: new RegExp(`^${req.params.brand}$`, "i"),
    });

    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars found for this brand" });
    }

    return res.status(200).json(cars);
  } catch (error) {
    console.log("Error fetching cars by brand", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//GET endpoint för att HÄMTA ALLA BILAR MED SAMMA bodyType.
export const getCarsByBodyType = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find({
      bodyType: new RegExp(`^${req.params.bodyType}$`, "i"),
    });

    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }

    return res.status(200).json(cars);
  } catch (error) {
    console.log("Error fetching cars by bodyType", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST endpoint för att LÄGGA TILL BIL.
export const addNewCar = async (req: Request, res: Response) => {
  const carData: CarType = req.body;

  try {
    const newCar = await Car.create(carData);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: "Validation failed", error });
  }
};

// PUT endpoint för att UPPDATERA EN SPECIFIK BIL.
export const updateCar = async (req: Request, res: Response) => {
  try {
    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

//DELETE endpoint för att RADERA/TA BORT en bil.
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const toBeDeleted = await Car.findByIdAndDelete(req.params.id);

    if (!toBeDeleted) {
      return res
        .status(400)
        .json({ message: "Could not find and delete car by that id" });
    }
    
    console.log("🚀 Deleting...");
    res
      .status(200)
      .json({ message: "Car deleted successfully", car: toBeDeleted });
  } catch (error) {
    res.status(500).json({ message: "Error removing car" });
  }
};
