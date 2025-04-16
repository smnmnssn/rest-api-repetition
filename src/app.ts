import express from "express";
import carRoutes from "./routes/carRoutes"

export const app = express();
app.use(express.json());

app.use("/api/cars", carRoutes);