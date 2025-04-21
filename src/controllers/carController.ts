import { Request, Response } from "express";
import { loadCars, saveCars } from "../data/carData";
import { Car } from "../models/Car";

// GET endpoint för att HÄMTA ALLA BILAR.
export const getAllCars = async (req: Request, res: Response) => {
  const cars = await loadCars();
  res.status(200).json(cars);
};

// GET endpoint för att HÄMTA SPECIFIK BIL.
export const getCarById = async (req: Request, res: Response) => {
  const cars = await loadCars();
  const { id } = req.params;
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return res.status(404).json({ message: "Car not found!" });
  }

  return res.status(200).json(car);
};

// POST endpoint för att LÄGGA TILL BIL.
export const addNewCar = async (req: Request, res: Response) => {
  const cars = await loadCars();
  const {
    brand,
    model,
    yearRange,
    bodyType,
    horsepower,
    torque,
    transmission,
    drivetrain,
    fuelEconomy,
    doors,
    price,
    engine,
    cylinders,
  } = req.body;

  try {
    if (
      !brand ||
      typeof brand !== "string" ||
      !model ||
      typeof model !== "string" ||
      !yearRange ||
      typeof yearRange !== "string" ||
      !bodyType ||
      typeof bodyType !== "string" ||
      !horsepower ||
      typeof horsepower !== "string" ||
      !torque ||
      typeof torque !== "string" ||
      !transmission ||
      typeof transmission !== "string" ||
      !drivetrain ||
      typeof drivetrain !== "string" ||
      !fuelEconomy ||
      typeof fuelEconomy !== "string" ||
      !doors ||
      typeof doors !== "string" ||
      !price ||
      typeof price !== "string" ||
      !engine ||
      typeof engine !== "string" ||
      !cylinders ||
      typeof cylinders !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Invalid data, check all fields and try again" });
    }

    const newCar: Car = {
      id: String(Date.now()),
      brand,
      model,
      yearRange,
      bodyType,
      horsepower,
      torque,
      transmission,
      drivetrain,
      fuelEconomy,
      doors,
      price,
      engine,
      cylinders,
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

// PUT endpoint för att UPPDATERA EN SPECIFIK BIL.
export const updateCar = async (req: Request, res: Response) => {
  const cars = await loadCars();
  const { id } = req.params;
  const {
    brand,
    model,
    yearRange,
    bodyType,
    horsepower,
    torque,
    transmission,
    drivetrain,
    fuelEconomy,
    doors,
    price,
    engine,
    cylinders,
  } = req.body;

  try {
    if (
      !brand ||
      typeof brand !== "string" ||
      !model ||
      typeof model !== "string" ||
      !yearRange ||
      typeof yearRange !== "string" ||
      !bodyType ||
      typeof bodyType !== "string" ||
      !horsepower ||
      typeof horsepower !== "string" ||
      !torque ||
      typeof torque !== "string" ||
      !transmission ||
      typeof transmission !== "string" ||
      !drivetrain ||
      typeof drivetrain !== "string" ||
      !fuelEconomy ||
      typeof fuelEconomy !== "string" ||
      !doors ||
      typeof doors !== "string" ||
      !price ||
      typeof price !== "string" ||
      !engine ||
      typeof engine !== "string" ||
      !cylinders ||
      typeof cylinders !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Invalid data, check all fields and try again" });
    }

    const index = cars.findIndex((c) => c.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Car not found!" });
    }

    const updatedCar: Car = {
      id,
      brand,
      model,
      yearRange,
      bodyType,
      horsepower,
      torque,
      transmission,
      drivetrain,
      fuelEconomy,
      doors,
      price,
      engine,
      cylinders,
    };

    cars[index] = updatedCar;
    await saveCars(cars);
    return res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, check fields and try again",
    });
  }
};
