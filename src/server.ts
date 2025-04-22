console.log("Hello from server.ts"); // Test
import mongoose from "mongoose";
import { app } from "./app";

mongoose
  .connect(
    "mongodb+srv://simonmansson:rpbekZKFgMo1Semm@clustercars.xvbrg5x.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCars",
    {
      dbName: "carapi",
    }
  )
  // eller MongoDB Atlas URI
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("DB connection error:", err));

app.listen(8080, () => console.log("Running server on http://localhost:8080"));
