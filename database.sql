
/*
EN CASO DE QUERER REALIZAR LAS MIGRACIONES DESDE CERO, DEBE ELIMINAR LAS CARPETAS:
-config
-migrations
-models
-seeders

luego ejecutar en consola los comandos siguientes:

EJECUTAR EN ORDEN

*/

1- init sequelize---------------

        npx sequelize-cli init

/* antes de realizar las migraciones debe configurar los archivos*/
## `src/config.ts` y en `config/config.json`;
## `debe ser cambiado el ` user `,` password `y` el nombre de database  en ambos archivos;

2- table for token configuration and storage----------

    npx sequelize-cli model:generate --name configurations --attributes token:string,key:string

------------------2 tartists table---------------------------

    npx sequelize-cli model:generate --name artists --attributes name:string,artistId:string,popularity:integer,genres:string,totalFallowers:integer,images:text,uri:string

3- table of the ambunes----------------------

    npx sequelize-cli model:generate --name albums --attributes name:string,artistId:string,albumId:string,albumGroup:string,albumType:string,artists:text,totalTracks:integer,releaseDate:string,images:text,uri:string

4 - table song--------------------------

    npx sequelize-cli model:generate --name songs --attributes name:string,artistId:string,songId:string,albumId:string,discNumber:integer,durationMs:integer,explicit:boolean,trackNumber:integer,type:string,isLocal:boolean,uri:string,images:text

/*LA MIGRACION SE REALIZARA DE FORMA AUTOMATICA AL EJECUTAR*/ "npm start" /*si desea iniciar la migracion de forma manual ejecute:*/

    npx sequelize-cli db:migrate

/*para deshacer las migraciones ejecute el siguiente comando 1 vez por cada tabla migrada. */

npx sequelize-cli db:migrate:undo