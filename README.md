CONSIDERACIONES PARA API-SPOTIFY

## ejecutar el comando `npm i` para instalar todas las dependencias del proyecto

## CONFIGURACION

## `entrar en la carpeta src y editar un archivo` con nombre config.ts.

# agregar el `client_id` y la `client_secret`.

# A continuacion el modelo del `config`

config = {
spotify: {
client_id: "{`CLIENT ID SPOTIFY`}",
client_secret: "{`CLIENT SECRET SPOTIFY`}",
},
app: {
port: 3011,
name: "api-spotify",
},
mysql: {
host: "localhost",
port: 3306,
user: "{`USER DATABASE`}",
password:"{`PASSWORD DATABASE`}",
database: "spotify",
dialect: "mysql",
pool: {
max: 5,
min: 0,
acquire: 30000,
idle: 10000,
},
},
};

## DATABASE:

## `crear una base de datos con el nombre spotify.`

# EJECUTE: `create database if not exists spotify`;

# `user:` admin, `password:` admin

#### `en caso de usar otro nombre de` user `y otra` password; debe configurarlo en:

## `src/config.ts` y en `config/config.json`;

## `debe ser cambiado el ` user `y` password en ambos archivos;

## MIGRACIONES:

## `La migracion se ejecutara automaticamente ejecutando:` npm start;

puede revisar el archivo database.sql. encontrara mas informacion sobre las migraciones.

## `para correr la api` EJECUTE:

## `npm run dev` || `npm start`

## RUTAS

## `comience accediendo a recursos por` ID
