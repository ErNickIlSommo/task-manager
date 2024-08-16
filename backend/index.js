import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import session from "express-session";

// Routes
import userRoutes from "./routes/user.js";
import folderRoutes from "./routes/folder.js";
import taskRoutes from "./routes/task.js";
import authRoutes from "./routes/auth.js";

import { isAuth } from "./middleware/is-auth.js";

const app = express();

app.use(json());
app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 18000000 },
  })
);

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use("/", (req, res, next) => {
  const sessionData = req.session;
  console.log("Session data:");
  console.log(sessionData);
  next();
});

app.use("/api/v1/auth", authRoutes);
app.use(isAuth);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/folder", folderRoutes);
app.use("/api/v1/task", taskRoutes);
app.all("*", (req, res, next) => {
  return res.status(404).json({ code: 404, message: "Page not found" });
});

// app.use((req, res, next) => {
//   return res.status(404).json({
//     error: "404",
//     message: "Page not found",
//   });
// });

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App connected to database`);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
