import { Request, Response } from "express";
import { loadCars, saveCars } from "../data/carData";
import { Car } from "../models/Car";
// Här lägger du funktionerna för GET, POST, PUT, DELETE.

let cars: Car[] = [];

// GET endpoint för att hämta alla bilar.
export const getAllCars = async (req: Request, res: Response) => {
  const cars = await loadCars();
  res.status(200).json(cars);
};

// GET endpoint för att hämta specifik bil.
export const getCarById = async (req: Request, res: Response) => {
  const cars = await loadCars();
  const { id } = req.params;
  const car = cars.find((c) => c.id === id);

  if (!car) {
    res.status(404).json({ message: "Car not found!" });
  }

  return res.status(200).json(car);
};

// POST endpoint för att lägga till bil.
export const addNewCar = async (req: Request, res: Response) => {
  const cars = await loadCars();
  const { brand, model, year, type } = req.body;

  try {
    if (
      !brand ||
      typeof brand !== "string" ||
      !model ||
      typeof model !== "string" ||
      !year ||
      typeof year !== "number" ||
      !type ||
      typeof type !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Invalid data, check all fields and try again" });
    }

    const newCar: Car = {
      id: String(Date.now()),
      brand,
      model,
      year,
      type,
    };

    cars.push(newCar);
    await saveCars(cars);
    res.status(201).json(newCar);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, check fields and try again" });
  }
};

// PUT endpoint för att uppdatera/ändra en bil
export const updateCar = async (req: Request, res: Response) => {
  const cars = await loadCars();
  const { id } = req.params;
  const { brand, model, year, type } = req.body;

  try {
    if (
      !brand ||
      typeof brand !== "string" ||
      !model ||
      typeof model !== "string" ||
      !year ||
      typeof year !== "number" ||
      !type ||
      typeof type !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Invalid data, check all fields and try again" });
    }

    const index = cars.findIndex((c) => (c.id === id));

    if (index === -1) {
      return res.status(404).json({ message: "Car not found!" });
    }

    const updatedCar: Car = {
      id,
      brand,
      model,
      year,
      type
    };

    cars[index] = updatedCar;
    await saveCars(cars);
    return res.status(200).json(updatedCar);

    } catch (error) {
    res.status(500).json({ message: "Something went wrong, check fields and try again" })
  }
} 
