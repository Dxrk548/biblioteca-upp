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
