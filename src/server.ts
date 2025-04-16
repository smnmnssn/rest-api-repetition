console.log("Hello from server.ts"); // Test
import  { app } from "./app";

app.listen(8080, () => console.log("Running server on http://localhost:8080"));