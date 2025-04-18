import { Request, Response } from "express";
import { Car } from "../models/Car";
import { loadCars } from "../data/carData";

// Här lägger du funktionerna för GET, POST, PUT, DELETE.

// GET endpoint to fetch all cars in Cars 
export const getAllCars = async (req: Request, res: Response) => {
    const cars = await loadCars();
    res.status(200).json(cars);
}