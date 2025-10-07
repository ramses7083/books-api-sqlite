import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { bookCreateSchema, bookUpdateSchema, validate, coerceNumbers } from "./validation.ts";

const prisma = new PrismaClient();
const router = Router();

// GET /api/books?search=foo&take=20&skip=0
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query as { search?: string };
    const take = Math.min(Number(req.query.take ?? 50), 100);
    const skip = Number(req.query.skip ?? 0);

    const where = search
      ? {
        OR: [
          { title: { contains: search } },
          { author: { contains: search } },
          { isbn: { contains: search } }
        ]
      }
    : {};

    const [items, total] = await Promise.all([
      prisma.book.findMany({ where, orderBy: { id: "desc" }, take, skip }),
      prisma.book.count({ where })
    ]);

    res.json({ items, total, take, skip });
  } catch (err) { next(err); }
});

// GET /api/books/:id
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) { next(err); }
});

// POST /api/books
router.post("/", async (req, res, next) => {
  try {
    const data = validate(bookCreateSchema, coerceNumbers(req.body));
    const created = await prisma.book.create({ data });
    res.status(201).json(created);
  } catch (err: any) {
    if (err.code === "P2002") { err.status = 409; err.message = "ISBN already exists"; }
    next(err);
  }
});

// PUT /api/books/:id
router.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = validate(bookCreateSchema, coerceNumbers(req.body));
    const updated = await prisma.book.update({ where: { id }, data });
    res.json(updated);
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Book not found" });
    if (err.code === "P2002") { err.status = 409; err.message = "ISBN already exists"; }
    next(err);
  }
});

// PATCH /api/books/:id
router.patch("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = validate(bookUpdateSchema, coerceNumbers(req.body));
    if (Object.keys(data).length === 0) return res.status(400).json({ error: "No fields to update" });

    const updated = await prisma.book.update({ where: { id }, data });
    res.json(updated);
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Book not found" });
    if (err.code === "P2002") { err.status = 409; err.message = "ISBN already exists"; }
    next(err);
  }
});

// DELETE /api/books/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.book.delete({ where: { id } });
    res.status(204).send();
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Book not found" });
    next(err);
  }
});

export const booksRouter = router;