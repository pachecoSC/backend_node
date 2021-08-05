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
