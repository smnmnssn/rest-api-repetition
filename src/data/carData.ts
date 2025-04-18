import fs from "fs";
import path from "path";
import { Car } from "../models/Car";

const DB_PATH = path.join(__dirname, "db.json");

export async function loadCars(): Promise<Car[]> {
  try {
    const data = await fs.promises.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log("Could not load cars");
    return [];
  }
}
