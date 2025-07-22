import express from "express";
import { PORT } from "./src/config/env.js";
import bootstrap from "./src/server.js";
const app = express();

bootstrap(express, app);
app.listen(PORT, () => {
  console.log(`Subscription Tracker API is running on port ${PORT} 🚀`);
});

