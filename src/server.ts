console.log("Hello from server.ts"); // Test
import  { app } from "./app";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/carapi") // eller MongoDB Atlas URI
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("DB connection error:", err));

  
app.listen(8080, () => console.log("Running server on http://localhost:8080"));