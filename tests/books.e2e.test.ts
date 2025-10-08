import request from "supertest";
import { app } from "../src/app.ts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Be sure the test database exists and has the schema (like test:setup)
  await prisma.book.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Books API", () => {
  let createdId: number;

  it("POST /api/books creates a book", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({
        title: "Clean Code",
        author: "Robert C. Martin",
        year: 2008,
        isbn: "9780132350884"
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe("Clean Code");
    createdId = res.body.id;
  });

  it("GET /api/books lists books", async () => {
    const res = await request(app).get("/api/books").expect(200);
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.total).toBeGreaterThanOrEqual(2);
  });

  it("GET /api/books/:id returns the book", async () => {
    const res = await request(app).get(`/api/books/${createdId}`).expect(200);
    expect(res.body.id).toBe(createdId);
    expect(res.body.author).toBe("Robert C. Martin");
  });

  it("PATCH /api/books/:id updates partially", async () => {
    const res = await request(app)
      .patch(`/api/books/${createdId}`)
      .send({ year: 2009 })
      .expect(200);
    expect(res.body.year).toBe(2009);
  });

  it("PUT /api/books/:id replaces the book", async () => {
    const res = await request(app)
      .put(`/api/books/${createdId}`)
      .send({
        title: "Clean Code (Updated)",
        author: "Robert C. Martin",
        year: 2010,
        isbn: "9780132350884"
      })
      .expect(200);
    expect(res.body.title).toBe("Clean Code (Updated)");
  });

  it("DELETE /api/books/:id deletes the book", async () => {
    await request(app).delete(`/api/books/${createdId}`).expect(204);
    await request(app).get(`/api/books/${createdId}`).expect(404);
  });
});
