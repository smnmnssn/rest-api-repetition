import mongoose from "mongoose";

export interface CarType {
  id: string;
  brand: string;
  model: string;
  yearRange: string;
  bodyType: string;
  horsepower: string;
  torque: string;
  transmission: string;
  drivetrain: string;
  fuelEconomy: string;
  doors: string;
  price: string;
  engine: string;
  cylinders: string;
  imageUrl: string;
}

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  yearRange: { type: String, required: true },
  bodyType: { type: String, required: true },
  horsepower: { type: String, required: true },
  torque: { type: String, required: true },
  transmission: { type: String, required: true },
  drivetrain: { type: String, required: true },
  fuelEconomy: { type: String, required: true },
  doors: { type: String, required: true },
  price: { type: String, required: true },
  engine: { type: String, required: true },
  cylinders: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export const Car = mongoose.model("Car", carSchema, "cars");
