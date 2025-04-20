import fs from "fs/promises";
import path from "path";
import { Car } from "../models/Car";

const DB_PATH = path.join(__dirname, "db.json");

export async function loadCars(): Promise<Car[]> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log("Could not load cars");
    return [];
  }
}

export async function saveCars(cars: Car[]): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(cars, null, 2));
  } catch (error) {
    console.log("Failed to save cars");
  }
}
