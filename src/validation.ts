import { z } from "zod";

export const bookCreateSchema = z.object({
    title: z.string().min(1, "title is required"),
    author: z.string().min(1, "author is required"),
    year: z.number().int().gte(0).optional(),
    isbn: z.string().min(6).optional()
});

export const bookUpdateSchema = bookCreateSchema.partial();

export type BookCreateInput = z.infer<typeof bookCreateSchema>;
export type BookUpdateInput = z.infer<typeof bookUpdateSchema>;

export function validate<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = result.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join(", ");
    const err = new Error(message);
    (err as any).status = 400;
    throw err;
  }
  return result.data;
}


export function coerceNumbers<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = { ...obj };
  if (typeof out.year === "string" && out.year.trim() !== "") {
    const n = Number(out.year);
    if (!Number.isNaN(n)) out.year = n;
  }
  return out as T;
}