# 📘 Books API (TypeScript + Express + Prisma + Zod + SQLite)

Una API CRUD para gestionar libros, construida en **TypeScript** con **Express**, **Prisma**, **Zod** y **SQLite** (sin dependencias externas ni Docker). Ideal para desarrollo o práctica.

---

## 🚀 Requisitos
- Node.js **18+**
- npm o pnpm

---

## 📦 Instalación

```bash
# 1. Clona el repositorio
git clone <url-del-repo>
cd books-api-sqlite

# 2. Instala dependencias
npm install

# 3. Inicializa Prisma y crea la base SQLite
npx prisma init --datasource-provider sqlite
npm run prisma:migrate
npm run prisma:generate

# 4. (Opcional) Ejecuta el seed de prueba
npm run seed
```

## ⚙️ Configuración
Crea un archivo `.env` en la raíz del proyecto:

```ini
PORT=3000
DATABASE_URL="file:./dev.db"
```
Prisma creará automáticamente el archivo `dev.db`.

---

## 🏃‍♂️ Ejecutar el servidor

### Modo desarrollo (hot-reload con tsx)
```bash
npm run dev
```

### Modo producción
```bash
npm run build
npm start
```

El servidor se ejecutará en:

```
http://localhost:3000
```

---

## 🔍 Endpoints principales

| Método | Ruta              | Descripción                                              |
|--------|-------------------|---------------------------------------------------------|
| GET    | /api/books        | Lista todos los libros (opcionalmente con ?search, ?take, ?skip) |
| GET    | /api/books/:id    | Obtiene un libro por ID                                  |
| POST   | /api/books        | Crea un nuevo libro                                      |
| PUT    | /api/books/:id    | Reemplaza completamente un libro                         |
| PATCH  | /api/books/:id    | Actualiza parcialmente un libro                          |
| DELETE | /api/books/:id    | Elimina un libro                                         |

---

## 🧪 Pruebas con cURL

### Crear libro
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Domain-Driven Design","author":"Eric Evans","year":2003,"isbn":"9780321125217"}'
```

### Listar libros
```bash
curl http://localhost:3000/api/books
```

### Buscar libros
```bash
curl "http://localhost:3000/api/books?search=design"
```

### Obtener por ID
```bash
curl http://localhost:3000/api/books/1
```

### Actualizar (PUT)
```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"DDD (Updated)","author":"Eric Evans","year":2004,"isbn":"9780321125217"}'
```

### Actualizar parcial (PATCH)
```bash
curl -X PATCH http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"year":2005}'
```

### Eliminar libro
```bash
curl -X DELETE http://localhost:3000/api/books/1
```

---

## 🧰 Estructura del proyecto

```bash
books-api-sqlite/
├─ src/
│  ├─ index.ts               # App principal
│  ├─ books.router.ts        # Rutas CRUD
│  ├─ validation.ts          # Validación con Zod
│  └─ middleware/
│     └─ error-handler.ts    # Manejo centralizado de errores
├─ prisma/
│  ├─ schema.prisma          # Modelo de datos
│  └─ seed.ts                # Datos de ejemplo
├─ .env                      # Configuración
├─ tsconfig.json             # Configuración TypeScript
├─ package.json              # Dependencias y scripts
└─ dev.db                    # Base de datos SQLite
```

---

## 💡 Notas
- SQLite no requiere Docker ni instalación de servidor.
- Zod valida datos antes de insertarlos en la base.
- Prisma maneja el ORM y las migraciones.
- Puedes cambiar fácilmente a PostgreSQL o MySQL editando `provider` y `DATABASE_URL` en `schema.prisma`.
