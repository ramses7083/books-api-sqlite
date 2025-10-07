import "dotenv/config";
import express from "express";
import cors from "cors";
import { booksRouter } from "./books.router.ts";
import { errorHandler } from "./middleware/error-handler.ts";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.get("/health", (_req, res) => res.json({ ok: true }));

app.use(errorHandler);