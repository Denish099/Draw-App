import express from "express";
import authRoutes from "./auth/auth-routes";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json({ limit: "5mb" }));

app.use("api/v1/auth", authRoutes);

app.listen(3010);
