
# Seek and Sell / Busca y Vende

Project created for the backend with NodeJS module of KeepCoding Web Development Academy, it consists in a basic React frontend app with an express backend app which allow us to create and view announcements.

Proyecto creado para el modulo de desarrollo backend con NodeJS de la academia de desarrollo web de KeepCoding, consiste en una aplicación basica frontend de React con una aplicación backend de express que nos permite crear y visualizar anuncios


## Backend Deployment / Despliegue Backend

This project have two apps so it needs two deployments

Este proyecto tiene dos aplicaciones entonces necesitaremos de dos despliegues

First at the root folder the first package.json is the backend one so we need to run the first commands


Primero en el directorio raiz encontraremos el primer package.json en el cual ejecutaremos los primeros comandos
```bash
  npm install
```

Then to start the server we run 

Luego para iniciar el servidor

```bash
  npm run dev
```

We need to configurate a few environment variables to ensure our app running well

Necesitaremos configurar unas cuantas variables de entorno para asegurarnos de que nuestra app corra bien

These are 4, you can find them with examples of how to fill them in the .env file:
`PORT ` its the express app port were you want your server to run, `MONGO_PORT` is the port of the MongoDB that are going to support our app, then `MONGO_DB_NAME` is the name of the database and finally `BACK_HOST` is the host of our backend app. Now we are ready to continue


Estas son 4, puedes encontralas con ejemplos de como llenaralas en el archivo .env: `PORT ` es el puerto en el que buscamos que nuestra app de express se ejecute, `MONGO_PORT` es el puerto de la base de datos MongoDB que soportara nuestra app, luego, `MONGO_DB_NAME` es el nombre de la base de datos y finalmente `BACK_HOST` es el host de nuestra aplicacion backend. Ahora estamos listos para continuar
## Frontend Deployment / Despliegue Frontend
Now we can continue to our /frontend folder

Ahora podemos continuar con nuestra carpeta /frontend


Here the procedure is very similar to backend one

Aqui el proceso es muy parecido al del backend

```bash
  npm install
```

Then start the server with 

Luego iniciamos el servidor con

```bash
  npm start
```

And finally we have to configure the environment variables, in this case is only one, `REACT_APP_BACKEND_HOST` that have to match with our backend URL


Y finalmente configuramos las variables de entorno, en este caso solo es una, `REACT_APP_BACKEND_HOST` que tiene que coincidir con el URL de nuestro backend
If we follow this steps we should be ready to go!

## Documentation / Documentación

First we need to initialize our database, in the root folder you can find a postman collection to import all the request that the project involves, within there you will find the ResetDatabase request, if we execute this we will initialize our database with two examples, then we can proceed to our front page to generate a few new announcements.
Then we have the GetAnnouncements request, we can see there a lot of query params that we can use to filter our queries as much as we want, then we have the PostAnnouncement request, we use it to generate new announcements with a multipart/form-data payload and finally the GetTags request that allows us to known all the present tags at the database


Lo primero es inicializar nuestra base de datos, en el directorio raiz encontraras una coleccion de Postman para importar todos los request que componen el proyecto, ahi encontraras el request ResetDatabase, si ejecutamos este nos inicializara nuestra base de datos con dos ejemplos, luego podemos proceder a nuestra pagina del front para generar unos cuantos nuevos anuncions. Luego tenemos el request GetAnnouncements en el cual podemos visualizar una gran cantidad de query params que podemos usar para modificar nuestros queries tanto como queramos, luego tenemos el request PostAnnouncement el cual usamos para generar nuevos anuncios usando un payload multipart/form-data y finalmente GetTags el cual nos permitirá visualizar todas las tags presentes en nuestra base de datos

That's pretty much all, feel free to contact me if you have any doubt. Thank you for reading.

Eso es practicamente todo, por favor contactame en caso de necesitarlo si tienes alguna duda. Muchas gracias por leer!
