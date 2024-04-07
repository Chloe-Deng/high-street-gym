import cors from "cors";
import express from "express";
import classController from "./controllers/classController.js";
import userController from "./controllers/userController.js";
import postController from "./controllers/postController.js";
import bookingController from "./controllers/bookingController.js";

const port = 8080;
const app = express();

app.use(
  cors({
    // Allow all origins
    origin: true,
  }),
);

app.use(express.json());

app.use("/classes", classController);
app.use("/users", userController);
app.use("/posts", postController);
app.use("/bookings", bookingController);

// Start listening for API requests
app.listen(port, () =>
  console.log(`Express started on http://localhost:${port}`),
);
