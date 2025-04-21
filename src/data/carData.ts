import fs from "fs/promises";
import path from "path";
import { Car } from "../models/Car";

const DB_PATH = path.join(__dirname, "db.json");
const UNSPLASH_ACCESS_KEY = "Aag1r1viaviOvDkjZ64uGMk1cBX5Fl4LPFEbVdL7d7s";

export async function loadCars(): Promise<Car[]> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log("Could not load cars");
    return [];
  }
}

export async function loadImagesAndSave() {
  const cars = await loadCars();
  await fs.copyFile(DB_PATH, DB_PATH.replace(".json", ".backup.json"));

  const updatedCars = await Promise.all(
    cars.map(async (car, index) => {
      if (index >= 5) return car; // Hoppa över efter 5 requests per timme
  
      const query = `${car.brand} ${car.model} ${car.bodyType}`;
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&orientation=landscape&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        car.imageUrl =
          data.results?.[0]?.urls?.regular ??
          "https://via.placeholder.com/400x300?text=No+Image";
      } catch {
        car.imageUrl = "https://via.placeholder.com/400x300?text=Error";
      }
  
      return car;
    })
  );
  

  await saveCars(updatedCars);
  console.log("Uppdaterade bilar med bilder sparade!");

}

export async function saveCars(cars: Car[]): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(cars, null, 2));
  } catch (error) {
    console.log("Failed to save cars");
  }
}

// Testkör bara om filen körs direkt
if (require.main === module) {
  loadImagesAndSave();
}
