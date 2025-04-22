// scripts/importToMongo.ts
import fs from "fs/promises";
import mongoose from "mongoose";
import { Car } from "../models/Car";

interface Car {
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

async function runImport() {
  try {
    await mongoose.connect(
      "mongodb+srv://simonmansson:rpbekZKFgMo1Semm@clustercars.xvbrg5x.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCars",
      { dbName: "carapi" }
    );
    console.log("✅ Connected to MongoDB");

    const data = await fs.readFile("./src/data/db.json", "utf-8");
    const cars: Car[] = JSON.parse(data);

    // Lägg till id om det saknas
    const carsWithId = cars.map((car) => ({
      ...car,
      id: car.id ?? String(Date.now() + Math.random()), // fallback-id
    }));

    await Car.insertMany(carsWithId);
    console.log(`✅ Imported ${carsWithId.length} cars to MongoDB`);
    process.exit();
  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  }
}

runImport();
