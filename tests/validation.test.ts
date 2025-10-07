import { bookCreateSchema } from "../src/validation.ts";

describe("Zod validation", () => {
  it("fail if title is missing", () => {
    const result = bookCreateSchema.safeParse({ author: "X" });
    expect(result.success).toBe(false);
  });

  it("pass with valid data", () => {
    const result = bookCreateSchema.safeParse({
      title: "Pragmatic Programmer",
      author: "Hunt",
      year: 1999
    });
    expect(result.success).toBe(true);
  });
});
