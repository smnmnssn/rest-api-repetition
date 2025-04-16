import { Request, Response } from "express";
import { Car } from "../models/Car";


// Här lägger du funktionerna för GET, POST, PUT, DELETE.

let cars: Car[] = [
    {
      id: "1",
      brand: "Volvo",
      model: "XC60",
      year: 2020,
      type: "SUV",
    },
  ];
  
// GET endpoint to fetch all cars in Cars 
export const getAllCars = (req: Request, res: Response) => {
    res.status(200).json(cars);
}