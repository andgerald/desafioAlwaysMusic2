function errors(code, status, message) {
  switch (code) {
    case "23505":
      status = 400;
      message = "RUT ingresado ya existe";
      break;
    case "28P01":
      status = 400;
      message = "Usuario o clave incorrectos: ";
      break;
    case "42P01":
      status = 400;
      message = "No existe la tabla consultada ";
      break;
    case "3D000":
      status = 400;
      message = "La base de datos no existe";
      break;
    case "ENOTFOUND":
      status = 500;
      message = "Error en valor usado como localhost";
      break;
    case "ECONNREFUSED":
      status = 500;
      message = "Error en el puerto de conexion ";
      break;
    case "23502":
      status = 400;
      message = "Falta ingresar parametros en la consulta";
      break;
    default:
      status = 500;
      message = "Error generico del Servidor";
      break;
  }

  return { code, status, message };
}

module.exports = errors;
