import path from "path";
import { Car } from "../models/Car";

// Database user password: rpbekZKFgMo1Semm.
var mongo = require("mongodb");

const DB_PATH = path.join(__dirname, "db.json");
const UNSPLASH_ACCESS_KEY = "Aag1r1viaviOvDkjZ64uGMk1cBX5Fl4LPFEbVdL7d7s";


export async function loadImagesAndSaveFromMongo() {
  const cars = await Car.find();

  const updated = await Promise.all(
    cars.slice(0, 10).map(async (car) => {
      const query = `${car.brand} ${car.model} ${car.bodyType}`;
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&orientation=landscape&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        const imageUrl =
          data.results?.[0]?.urls?.regular ??
          "https://via.placeholder.com/400x300?text=No+Image";

        car.imageUrl = imageUrl;
        await car.save(); // 💾 spara ändring i MongoDB
      } catch (error) {
        console.error("Fel vid hämtning av bild:", error);
        car.imageUrl = "https://via.placeholder.com/400x300?text=Error";
        await car.save(); // 💾 spara ändå
      }

      return car;
    })
  );

  console.log(`✅ Uppdaterade ${updated.length} bilar med bilder`);
}

