const pool = require("./conexionDB.js");
const errors = require("./errores.js");

// variables globales de index.js
let status = "";
let message = "";

const argumentos = process.argv.slice(2);

const funcion = argumentos[0];
const rutEstudiante = argumentos[1];
const nombre = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];

//consulta los estudiantes registrados
const consulta = async () => {
  try {
    const res = await pool.query({
      rowMode: "array",
      text: "SELECT * FROM users",
    });
    console.log("Usuarios registrados:", res.rows);
  } catch (e) {
    const error = errors(e.code, status, message);
    console.log("Codigo: ", error.code);
    console.log("Estado: ", error.status);
    console.log("Mensaje: ", error.message);
  }
};

//agrega un nuevo estudiante con el rut como llave primaria
const nuevo = async ({ rutEstudiante, nombre, curso, nivel }) => {
  try {
    const res = await pool.query(
      `INSERT INTO users (rut,nombre,curso,nivel) values ($1,$2,$3,$4)  RETURNING *`,
      [rutEstudiante, nombre, curso, nivel]
    );

    console.log(`Usuario ${nombre} agregado con éxito`);
    console.log("Usuario Agregado: ", res.rows[0]);
  } catch (e) {
    const error = errors(e.code, status, message);
    console.log("Codigo: ", error.code);
    console.log("Estado: ", error.status);
    console.log("Mensaje de Error: ", error.message);
  }
};

(async () => {
  // recibir funciones y campos de la linea de comando
  switch (funcion) {
    case "consulta":
      consulta();
      break;
    case "nuevo":
      nuevo({ rutEstudiante, nombre, curso, nivel });
      break;
  }

  pool.end();
})();

// Para hacer la consulta de todos los usuarios
// node index consulta

//Para agregar un usuario
//node index nuevo "14.222.433-2" "manchita" "guitarra" "5"
