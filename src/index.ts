import { app } from "./app.ts";

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Books API (TS + SQLite) listening on http://localhost:${PORT}`);
});