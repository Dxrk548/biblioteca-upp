import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

let db;

async function main() {
  try {
    db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "bibliotecadb"
    });
    console.log("Conexión a la base de datos exitosa");
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err);
    process.exit(1);
  }

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const [rows] = await db.execute(
        "SELECT * FROM usuarios WHERE usuario = ? OR correo = ?",
        [username, username]
      );

      if (rows.length === 0) return res.status(401).json({ ok: false, message: "Usuario no encontrado" });

      const user = rows[0];
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ ok: false, message: "Contraseña incorrecta" });

      res.json({ ok: true, token: "fake-jwt-token", user: { id: user.id_usuario, nombre: user.nombre, correo: user.correo, rol: user.rol } });
    } catch (error) {
      res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
  });

  app.post("/api/register", async (req, res) => {
    const { nombre, correo, usuario, password } = req.body;
    if (!nombre || !correo || !usuario || !password) return res.status(400).json({ ok: false, message: "Todos los campos son obligatorios" });

    try {
      const [rows] = await db.execute("SELECT * FROM usuarios WHERE usuario = ? OR correo = ?", [usuario, correo]);
      if (rows.length > 0) return res.status(409).json({ ok: false, message: "Usuario o correo ya registrado" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.execute(
        "INSERT INTO usuarios (id_usuario, nombre, correo, usuario, password, rol) VALUES (NULL, ?, ?, ?, ?, ?)",
        [nombre, correo, usuario, hashedPassword, "usuario"]
      );

      res.json({ ok: true, message: "Usuario registrado correctamente", id: result.insertId });
    } catch (error) {
      res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
  });

    // SOLICITAR LIBRO
app.post("/api/prestamos/solicitar", async (req, res) => {
  const { id_usuario, id_libro } = req.body;

  if (!id_usuario || !id_libro) {
    return res.status(400).json({ ok: false, message: "Faltan datos" });
  }

  try {
    // Verificar que el libro existe y está disponible
    const [libro] = await db.execute(
      "SELECT estado FROM libros WHERE id_libro = ?",
      [id_libro]
    );

    if (libro.length === 0)
      return res.status(404).json({ ok: false, message: "El libro no existe" });

    if (libro[0].estado !== "disponible")
      return res.status(400).json({ ok: false, message: "Libro no disponible" });

    // Insertar préstamo
    await db.execute(
      `INSERT INTO prestamos 
       (id_libro, id_usuario, fecha_prestamo, fecha_devolucion, estado)
       VALUES (?, ?, NOW(), NULL, 'prestado')`,
      [id_libro, id_usuario]
    );

    // Marcar libro como prestado
    await db.execute(
      "UPDATE libros SET estado = 'prestado' WHERE id_libro = ?",
      [id_libro]
    );

    res.json({ ok: true, message: "Libro solicitado con éxito" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Error al solicitar libro" });
  }
});


    // OBTENER TODOS LOS LIBROS (CATÁLOGO)
app.get("/api/libros", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM libros");
    res.json({ ok: true, libros: rows });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al obtener los libros" });
  }
});


// BUSCAR LIBROS
app.get("/api/libros/buscar", async (req, res) => {
  const { q } = req.query;

  try {
    const [rows] = await db.execute(
      `SELECT * FROM libros
       WHERE titulo LIKE ? OR autor LIKE ? OR genero LIKE ?`,
      [`%${q}%`, `%${q}%`, `%${q}%`]
    );

    res.json({ ok: true, resultados: rows });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al buscar libros" });
  }
});


  app.get("/api/prestamos/:id_usuario", async (req, res) => {
    const { id_usuario } = req.params;
    try {
      const [rows] = await db.execute(
        `SELECT p.id_prestamo, p.fecha_prestamo, p.fecha_devolucion, p.estado,
                l.id_libro, l.titulo, l.autor
         FROM prestamos p
         INNER JOIN libros l ON p.id_libro = l.id_libro
         WHERE p.id_usuario = ?`,
        [id_usuario]
      );
      res.json({ ok: true, prestamos: rows });
    } catch (error) {
      res.status(500).json({ ok: false, message: "Error al obtener los préstamos" });
    }
  });

  app.get("/", (req, res) => res.send("API Biblioteca con BD funcionando"));

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Backend escuchando en http://localhost:${port}`));
}

main();
