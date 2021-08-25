# backend_node

proyecto backend con node js

para obtener el proyecto

> git clone https://github.com/pachecoSC/backend_node.git

luego para instalar las dependencias

> npm install

para probarlo tenemos que correr

> npm run dev

y en la url de chrome escribir --> http://localhost:3000/api/user

Nota: para obtener el json de manera mas sencilla se utiliza la siguiente pagina

- https://editor.swagger.io/

instalacion de libreria

> npm i swagger-ui-express

para visualizar la documentacion

- http://localhost:3000/api-docs/

para el tema de la id se va a utilizar nanoid ->trae id autonumerico que no se repiten

mysql.
se instalo libreria mysql para realizar la connexion aperia un error
'ER_NOT_SUPPORTED_AUTH_MODE'

se soluciona en el gestor de base de datos en este caso: mysql workbench

> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'

se agrego funcionalidad para probar microservicios
> npm run micro-serv

en la url estamos enviando el nombre de la tabla como params

----------------------------------------------------------
la api consta de 3 micro-servicios
----------------------------------------------------------
port  | descripcion
3000  | api
3001  | base de datos remota
3002  | servicio post
----------------------------------------------------------
instalacion de pm2 es una herramienta que gestiona los servicios en produccion

>pm2 start api/index.js --name api-principal
>pm2 start mysql/index.js --name api-mysql
>pm2 start post/index.js --name api-post

para obtener los logs de los servicios

> pm2 status
aparece la lista de todos procesos con su indice
>pm2 logs
aparece todos los logs, si queremos de uno en especifico tenemos que especificarlo

>pm2 logs 0
aparece todos los logs del proceso con indice 0

si queremos detener los procesos basta con poner el indice depues del comando
>pm2 stop 0

si quieres detener varios procesos se agregan los indices separados por un espacio
>pm2 stop 0 1 2

----------------------------------------------------------------------------------
se utiliza vercel para deployar la api
con el siguiente comando se inicializa el proyecto cabe mencionar que antes debes instalar vercel de manera global e iniciar sesion
>vercel

con el siguiente comando lo puedes deployar en produccion
>vercel --prod

para el deploy en local donde funciona la base de datos
>vercel dev

nota: es necesario que se deploye en local porque la base de datos a la que apunta no tiene salida a internet es por eso que desde el deploy en produccion no funciona.. para que funcione en produccion tenemos que ingresar los accesos a una base de datos remota