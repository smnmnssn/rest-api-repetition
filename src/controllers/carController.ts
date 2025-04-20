import { Request, Response } from "express";
import { loadCars } from "../data/carData";
// Här lägger du funktionerna för GET, POST, PUT, DELETE.

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
    res.status(404).json( {message: "Car not found!"} );
  }

  return res.status(200).json(car);
};
