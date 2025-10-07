import "dotenv/config";
import express from "express";
import cors from "cors";
import { booksRouter } from "./books.router.ts";
import { errorHandler } from "./middleware/error-handler.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.get("/health", (_req, res) => res.json({ ok: true }));

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Books API (TS + SQLite) listening on http://localhost:${PORT}`);
});