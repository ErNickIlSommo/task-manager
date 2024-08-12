import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";

const app = express();

app.use(json());
app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log(`App connected to database`);
//     app.listen(PORT, (req, res, next) => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((error) => console.error(error));
