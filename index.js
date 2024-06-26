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

//consultar estudiante por rut
const rut = async ({ rutEstudiante }) => {
  try {
    const res = await pool.query(`SELECT *  FROM users WHERE rut=$1 `, [
      rutEstudiante,
    ]);
    rutEstudiante === undefined
      ? console.log("Debes ingresar un rut")
      : res.rows[0] === undefined
      ? console.log("El rut:", rutEstudiante, "no existe en la base de datos")
      : console.log("Usuario consultado por rut:", res.rows[0]);
  } catch (e) {
    const error = errors(e.code, status, message);
    console.log("Codigo: ", error.code);
    console.log("Estado: ", error.status);
    console.log("Mensaje de Error: ", error.message);
  }
};
//consultar para eliminar un estudiante por rut
const eliminar = async ({ rutEstudiante }) => {
  try {
    const res = await pool.query(
      `DELETE  FROM users WHERE rut=$1 RETURNING * `,
      [rutEstudiante]
    );
    rutEstudiante === undefined
      ? console.log("Error: Debes ingresar un rut")
      : res.rowCount === 0
      ? console.log("Error: El rut ingresado no es válido")
      : console.log("Usuario eliminado:", res.rows[0]);
  } catch (e) {
    const error = errors(e.code, status, message);
    console.log("Codigo: ", error.code);
    console.log("Estado: ", error.status);
    console.log("Mensaje de Error: ", error.message);
  }
};

//editar informacion del estudiante
const editar = async ({ rutEstudiante, nombre, curso, nivel }) => {
  try {
    await pool.query(
      `UPDATE users  SET  nombre=$2, curso=$3 , nivel=$4 WHERE rut=$1 RETURNING *`,
      [rutEstudiante, nombre, curso, nivel]
    );
    console.log(`El estudiante con rut: ${rutEstudiante} editado  con éxito`);
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
    case "rut":
      rut({ rutEstudiante });
      break;
    case "eliminar":
      eliminar({ rutEstudiante });
      break;
    case "editar":
      editar({ nombre, rutEstudiante, curso, nivel });
      break;
    default:
      console.log("Funcion: " + funcion + "no es valida");
      break;
  }

  pool.end();
})();

// Para hacer la consulta de todos los usuarios
// node index consulta

//Para agregar un usuario
//node index nuevo "14.222.433-2" "Carolina Perez" "guitarra" "5"
//node index nuevo "18.645.341-8" "Geraldine Becerra" "Trompeta" "1"

//Para consultar por rut
//node index "14.222.433-2"

//Para eliminar  un estudiante
//node index "14.222.433-2"

//Para editar un estudiante
//node index editar '14.222.433-2', 'Geraldine Carolina', 'Trompeta', '2'
