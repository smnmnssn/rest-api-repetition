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
  brand: String,
  model: String,
  yearRange: String,
  bodyType: String,
  horsepower: String,
  torque: String,
  transmission: String,
  drivetrain: String,
  fuelEconomy: String,
  doors: String,
  price: String,
  engine: String,
  cylinders: String,
  imageUrl: String,
}, { timestamps: true });

export const Car = mongoose.model("Car", carSchema);
