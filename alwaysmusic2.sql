-- Crear la base de datos empresa
CREATE DATABASE alwaysmusic2;

-- Conectar a la base de datos
\c users;

-- Crear la tabla usuarios
CREATE TABLE users (
    rut VARCHAR(30) PRIMARY KEY NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    curso VARCHAR(30) NOT NULL,
    nivel VARCHAR(30) NOT NULL
);
