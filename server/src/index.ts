import express, { Express } from "express";
import connectDb from "./database/db";
import cors from "cors";

const app: Express = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDb()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  });
