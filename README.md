# Docker
Ejemplos practicos
## Descargar una Imagen
> Descargara la version latest 
```bash
  docker pull hello-world
```

Sino se tiene la imagen traera la de internet de docker hub. Y la 2da vez que hagamos pull traera la que tiene en memoria.
> Las que son oficiales tienen un tag que indica **official image**

## Ejecutar una Imagen
```bash
  docker container run hello-world
```

Un contenedor es una instancia de una imagen ejecutandose en un ambiente aislado.
Cuando nosotros ejecutamos una imagen de esta manera se crea un nuevo contenedor.

## Listar contenedores
Los que estan corriendo
```bash
  docker container ls
```
Todos
```bash
  docker container ls -a
```
Se mostrara de la siguiente manera

| CONTAINER  ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES |
|--------|-------------|---------|------|-------|------|-------|
|bd0d159ac486|hello-world | "/hello"| 6 minutes ago |  Exited (0) 6 minutes ago  | | cranky_hodgkin |
|7513ff0eda4b  | hello-world  | "/hello"  | 14 minutes ago  | Exited (0) 14 minutes ago |   |         confident_pasteur|


## Borrar contenedores

Se puede eliminar colocando el container id o el name
```bash
  docker container rm bd0d159ac486
```

concatenando mas de uno basta colocando los primeros 3 digitos del container id
```bash
  docker container rm bd0 751
```

O para eliminar todos los contenedores detenidos
```bash
  docker container prune
``` 

## Listar imagenes
```bash
  docker image ls
```

|REPOSITORY |   TAG |      IMAGE ID    |   CREATED      |   SIZE|
|-----|----|--------|-----|-------|
|hello-world |  latest    |d2c94e258dcb |  12 months ago  | 13.3kB|

## Borrar imagenes
Se puede borrar usando el nombre en respository o el imageid
```bash
  docker image rm hello-world
```


# Si queremos ver ayuda acerca de un comando en especifico
```bash
  docker container --help
```

```bash
  docker images --help
```

# Publish and Detached
Probaremos descargando esta imagen pero de esta manera solo descargariamos la imagen y se ejecutaria pero no sabriamos en que puerto probarlo
```bash
  docker container run docker/getting-started
```
asi la solucion es
1. -d detached : Corre la imagen desenlazada de la consola donde se ejecutó el comando.
asi se montara la imagen y estara corriendo pero aun no sabemos el puerto
```bash
  docker container run -d docker/getting-started
```
Para detener esta imagen
```bash
  docker container stop <id, nombre, primaro3digitosdelID>  
```

Para correr esta imagen en el puerto:
2. -p 80:80 : Mapea el puerto 80 de nuestra computadora con el puerto 80 del contenedor

```bash
  docker container run -d -p 80:80 docker/getting-started
```

> Que psaria si tendriamos el puerto ya ocupado 
Facilmente podriamos cambiar el puerto de la siguiente manera.

| Puerto de mi equipo | Puerto expuesto en el contenedor |
| --- | --- |
|8080:| 80 |

```bash
  docker container run -d -p 8080:80 docker/getting-started
```

Para detener ya sabemos que es con la palabra clave **stop**
Si nosotros quisieramos levantar un contenedor que no hayamos eliminado aun lo unico que debemos hacer es cambiar el stop por **start**

```bash
  docker container start <id, nombre, primaro3digitosdelID>
```

# Para borrar de manera forzada un contenedor

Para eliminar un contenedor que este corriendo una imagen y no lo hayamos detenido.

```bash
  docker container rm -f <id, nombre, primaro3digitosdelID> o <ID1 ID2>
```

# Variables de entorno

Son variables que existen en el entorno y el contenedor.

Son importantes cuando nosotros necesitamos cierta informacion cuando queremos levantar un contendor.

Podemos mandarlas colocando *-e* o *--env*.
Un ejemplo seria de esta forma:
```bash
  docker run -d `
  --network todo-app --network-alias mysql `
  -v todo-mysql-data:/var/lib/mysql `
  -e MYSQL_ROOT_PASSWORD=secret `
  -e MYSQL_DATABASE=todos `
  mysql:8.0
```

## Si nosotros queremos descargar postgres
Lo descargaremos de docker hub [Imagen de docker](https://hub.docker.com/_/postgres)

Y para descargar en nuestra maquina sera con:
```bash
  docker pull postgres
```
por defecto descargara la latest

Ahora en la documentacion veremos como iniciar una instancia de postgres en nuestra maquina:

Sera con este comando:
```bash
docker container run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```
Al cual explicando:

|docker run| --name | some-postgres | -e POSTGRES_PASSWORD= | mysecretpassword | -d  | postgres |    
| --- | --- | --- | --- | --- | --- | --- |
| corre el contenedor | asigna el nombre a nuestra imagen |  nombre | nombre de la variable de entorno para el pass | password | Detached | nombre de la imagen |

Y esto ya estara corriendo postgres y lo podremos ver haciendo un **ls** a los contenedores

Como sabemos si nos queremos conectar con nuestro gestor de BD esto fallara ya que no estamos exponiendo algun puerto asi modificamos el comando a:

```bash
docker container rm -f <3digID>
docker container run --name some-postgres -dp 5433:5432 -e POSTGRES_PASSWORD=mysecretpassword postgres
```

Y asi exponemos el puerto 5432 de nuestro equipo y lo conectamos con el del contenedor.

## Como poedmos correr multiples instancias de postgres en una misma maquina

>Nota el ` nos sirve para hacer un salto de linea esto ya que estamos en windows con powershell
```bash
docker container run `
--name postgres-alpha `
-e POSTGRES_PASSWORD=mypass `
-dp 5433:5432 `
postgres
```
Y en windows se veria:
```bash
PS C:\WINDOWS\system32> docker container run `
>> --name postgres-alpha `
>> -e POSTGRES_PASSWORD=mypass `
>> -dp 5433:5432 `
>> postgres
```

Y para ejecutar la otra instancia seria:
```bash
docker container run `
--name postgres-beta `
-e POSTGRES_PASSWORD=mypass `
-dp 5434:5432 `
postgres:16.3-alpine3.20
```
## Logs del contenedor

Para ver los logs de nuestro contenedor
```bash
  docker container logs <container id o contenedor>
```
Para ver los logs de nuestro contenedor y darle seguimiento
```bash
  docker container logs -f <container id o contenedor>
  docker container logs --follow <container id o contenedor>
```

# Para correr una base de datos en mysql 
  
* Ejercicio
1. Montar la imagen de MariaDB con el tag jammy, publicar en el puerto 3306 del contenedor con el puerto 3306 de nuestro equipo, colocarle el nombre al contenedor de world-db (--name world-db) y definir las siguientes variables de entorno:

MARIADB_USER=example-user
MARIADB_PASSWORD=user-password
MARIADB_ROOT_PASSWORD=root-secret-password
MARIADB_DATABASE=world-db
Conectarse usando Table Plus a la base de datos con las credenciales del usuario (NO EL ROOT)

2. Conectarse a la base de datos world-db
3. Ejecutar el query de creación de tablas e inserción proporcionado **world.sql**
4. Revisar que efectivamente tengamos la data

```bash
docker container run `
-dp 3307:3306 `
--name world-db `
--env MARIADB_USER=example-user `
--env MARIADB_PASSWORD=user-password `
--env MARIADB_ROOT_PASSWORD=root-secret-password `
--env MARIADB_DATABASE=world-db `
mariadb:jammy
```

# Volumenes
Los volumenes nos ayudan a hacer la informacion persistente.
Aunque nosotros eliminemos el contenedor o la imagen la data al momento de volverlo a montar deberia poder recuperarse eso lo logramos con volumenes.
Hay de 3 tipos
1. Named Volumes <- Nosotros asignamos el nombre
2. Bind Volumes <- Sirve para hacer una conexion entre un filesistem del equipo con alguno del contenedor. Para no montar un equipo de linux y solo conectar nuestros archivos.
3. Anonymous Volumes <- Docker asigna el nombres

## En nuestro caso haremos el ejercicio con postgres con la version o el tag alpine
```bash
docker container run `
--name postgres-beta `
-e POSTGRES_PASSWORD=mypass `
-dp 5434:5432 `
postgres:16.3-alpine3.20
```

El script **SQL** que usaremos en la base de datos es:
```sql
CREATE DATABASE world_db;

-- Conectar a la base de datos world_db
\c world_db;

-- Crear la tabla country
CREATE TABLE country (
  Code CHAR(3) PRIMARY KEY,
  Name CHAR(52) NOT NULL,
  Continent VARCHAR(20) NOT NULL CHECK (Continent IN ('Asia', 'Europe', 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America')),
  Region CHAR(26) NOT NULL,
  SurfaceArea DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  IndepYear SMALLINT DEFAULT NULL,
  Population INT NOT NULL DEFAULT 0,
  LifeExpectancy DECIMAL(3,1) DEFAULT NULL,
  GNP DECIMAL(10,2) DEFAULT NULL,
  GNPOld DECIMAL(10,2) DEFAULT NULL,
  LocalName CHAR(45) NOT NULL,
  GovernmentForm CHAR(45) NOT NULL,
  HeadOfState CHAR(60) DEFAULT NULL,
  Capital INT DEFAULT NULL,
  Code2 CHAR(2) NOT NULL
);

-- Crear la tabla countrylanguage
CREATE TABLE countrylanguage (
  CountryCode CHAR(3) REFERENCES country(Code),
  Language CHAR(30) NOT NULL,
  IsOfficial BOOLEAN NOT NULL DEFAULT FALSE,
  Percentage DECIMAL(4,1) NOT NULL DEFAULT 0.0,
  PRIMARY KEY (CountryCode, Language)
);

-- Insertar datos en la tabla country
INSERT INTO country (Code, Name, Continent, Region, SurfaceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital, Code2)
VALUES
('USA', 'United States of America', 'North America', 'Northern America', 9372610.00, 1776, 331002651, 78.9, 21433226.00, 20611830.00, 'United States', 'Federal Republic', 'Joseph R. Biden', 1, 'US'),
('CAN', 'Canada', 'North America', 'Northern America', 9984670.00, 1867, 37742154, 82.3, 1647126.00, 1628706.00, 'Canada', 'Constitutional Monarchy', 'Justin Trudeau', 2, 'CA'),
('BRA', 'Brazil', 'South America', 'South America', 8515767.00, 1822, 212559417, 75.0, 1839758.00, 1796762.00, 'Brasil', 'Federal Republic', 'Jair Bolsonaro', 3, 'BR'),
('DEU', 'Germany', 'Europe', 'Western Europe', 357022.00, 1871, 83166711, 80.9, 3845630.00, 3775823.00, 'Deutschland', 'Federal Republic', 'Frank-Walter Steinmeier', 4, 'DE'),
('IND', 'India', 'Asia', 'Southern Asia', 3287263.00, 1947, 1380004385, 69.7, 2875142.00, 2713081.00, 'Bharat', 'Federal Republic', 'Ram Nath Kovind', 5, 'IN'),
('CHN', 'China', 'Asia', 'Eastern Asia', 9596961.00, -2070, 1444216107, 76.1, 14342903.00, 13608152.00, 'Zhongguo', 'Communist State', 'Xi Jinping', 6, 'CN'),
('RUS', 'Russia', 'Europe', 'Eastern Europe', 17098242.00, 1991, 145912025, 72.6, 1699876.00, 1577522.00, 'Rossiya', 'Federal Republic', 'Vladimir Putin', 7, 'RU'),
('JPN', 'Japan', 'Asia', 'Eastern Asia', 377975.00, -660, 126476461, 84.6, 5081770.00, 4954391.00, 'Nihon', 'Constitutional Monarchy', 'Naruhito', 8, 'JP'),
('AUS', 'Australia', 'Oceania', 'Australia and New Zealand', 7692024.00, 1901, 25499884, 82.8, 1392687.00, 1374216.00, 'Australia', 'Constitutional Monarchy', 'Scott Morrison', 9, 'AU'),
('ARG', 'Argentina', 'South America', 'South America', 2780400.00, 1816, 45195774, 76.7, 449675.00, 4385560.00, 'Argentina', 'Federal Republic', 'Alberto Fernández', 10, 'AR');

-- Insertar datos en la tabla countrylanguage
INSERT INTO countrylanguage (CountryCode, Language, IsOfficial, Percentage)
VALUES
('USA', 'English', TRUE, 78.2),
('CAN', 'English', TRUE, 56.9),
('CAN', 'French', TRUE, 21.3),
('BRA', 'Portuguese', TRUE, 98.0),
('DEU', 'German', TRUE, 95.0),
('IND', 'Hindi', TRUE, 44.0),
('IND', 'English', TRUE, 12.0),
('CHN', 'Mandarin', TRUE, 70.0),
('RUS', 'Russian', TRUE, 85.7),
('JPN', 'Japanese', TRUE, 99.0),
('AUS', 'English', TRUE, 72.7),
('ARG', 'Spanish', TRUE, 97.5);

-- Verificar los datos insertados
SELECT * FROM country;
SELECT * FROM countrylanguage;

```

Si nosotros eliminamos el contenedor con
```bash
  docker container rm -f <iddelcontendor>
```

Y luego volvemos a ejecutar para montar la imagen en un contenedor pues podremos ver que los datos nose mantienen.

## Para crear un volumen
Con esto creariamos un espacio en nuestra computadora que aguantara eliminaciones de contendores, reinicios, etc.
Es como crear un directorio en el cual almacenaremos la informacion.
```bash
  docker volume create world-db
```

## Para listar volumenes
```bash
  docker volume ls
```

## Para saber la informacion del volumen
```bash
  docker volume inspect <namevolume>
```

## Ahora para usar los volumenes modificaremos nuestro comando

```bash
docker container run `
--name postgres-beta `
-e POSTGRES_PASSWORD=mypass `
-dp 5434:5432 `
--volume <host>:<contenedor> ` <- con esta linea
postgres:16.3-alpine3.20
```

*¿Como sabemos donde esta grabando la base de datos?*
Para eso debemos recurrir a la documentacion de docker hub [docker hub postgres](https://hub.docker.com/_/postgres)
Y colocando *ctrl + f* buscamos */var/lib* y ahi podremos ver donde lo esta guardando.

> asi seria
```bash
docker container run `
--name postgres-beta `
-e POSTGRES_PASSWORD=mypass `
-e POSTGRES_DB=world-db `
-dp 5434:5432 `
--volume world-db:/var/lib/postgresql/data `
ó
-v world-db:/var/lib/postgresql/data `
postgres:16.3-alpine3.20
```
> El comando final seria
```bash
docker container run `
--name postgres-beta `
-e POSTGRES_PASSWORD=mypass `
-e POSTGRES_DB=world-db `
-dp 5434:5432 `
--volume world-db:/var/lib/postgresql/data `
postgres:16.3-alpine3.20
```

> -e POSTGRES_DB=world-db ` agregamos esa linea para que cree la base de datos en el mismo comando

**Y ahora si eliminamos el contenedor con rm -f y luego volvemos a ejecutar podremos ver que gracias al volumen la informacion persiste.**

# Para usar phpmyadmin en docker

Para eso debemos recurrir a la documentacion de docker hub [docker hub phpmyadmin](https://hub.docker.com/_/phpmyadmin)

> Algo que hay que hacer notar esque nose debe usar *--link* ya que podria estar deprecado pese a que nosotros lo veamos en docs

## Lo usaremos con un servidor arbitrario

```bash
  docker run `
  --name phpmyadmin `
  -d `
  -e PMA_ARBITRARY=1 `
  -p 8080:80 `
  phpmyadmin:5.2.0-apache
```

En esta caso hacemos correr el phpmyadmin si nosotros queremos conectar con una base de datos que ejecutemos de mysql nose conectara para eso necesitamos redes *network*.

Es como si la base de datos en mysql fuera un servidor a parte del phpmyadmin pese a que estan corriendo en la misma maquina.

> El nombres que demos a los contenedores nos servira como un dns para conectarnos sin ser expertos en redes

# Redes en Docker

## Regla de oro:
**Si dos o más contenedores están en la misma red, podrán hablar entre sí. Si no lo están, no podrán**

Si queremos ver una ayuda de los comandos que podemos usar

```bash
  docker network
```

## Listar redes

```bash
  docker network ls
```
Por defecto nos devuelve las por defecto:
1. bridge
2. host  
3. null

|NETWORK ID     |NAME      |DRIVER    |SCOPE|
| --- | --- | --- | --- |
|c753a783d1d0   |bridge    |bridge    |local|
|1299d4c0d30a   |host      |host      |local|
|1ff8dba1744f   |none      |null      |local| 

## Para crear una nueva red

```bash
  docker network create <nombrered>
  docker network create worl-app
```

## Si queremos conectar los diferentes servidores a la red 

```bash
  docker network connect world-app <nameRed | idContenedor>
```

Asi el comando seria:

```bash
  docker network connect world-app b98
  docker network connect world-app a7a
```

Como podemos ver que esta configurado:

```bash
  docker network inspect world-app
```

Y ya solo seria probar y estaran conectadas podremos entrar a la base de datos mysql con phpmyadmin.

## Si nosotros queremos asignar la red en la inicializacion del contenedor

> La red debe estar creada

```bash
  docker run `
  --name phpmyadmin `
  -d `
  -e PMA_ARBITRARY=1 `
  -p 8080:80 `
  --network world-app ` <- esta linea
  phpmyadmin:5.2.0-apache
```

# Bind Volumes

Para este caso usaremos **node** descargando la imagen de docker hub [docker hub node](https://hub.docker.com/_/node).

Basicamente nos permite enlazar el contenedor que estamos ejecutando en docker con una aplicacion que tenemos en nuestra computadora.

En este caso estamos dentro de la carpeta de nuestra app que es un proyecto para leer datos de un json de un pokemon ditto.

El comando que usariamos seria el siguiente:
> Debemos estar con el powershell o el cmd de nuestra computadora ubicados en el origen del proyecto. ejem: PS C:\WINDOWS\system32> cd D:\ESTUDIO\PRACTICAS\DOCKER\clases\app-node-ditto PS D:\ESTUDIO\PRACTICAS\DOCKER\clases\app-node-ditto>
```bash
  docker container run `
  --name postback-app `
  -w /app ` <- este es el working directory le indicamos sobre que carpeta vamos a trabajar (cd app)
  -p 80:3000 ` <- 80 localhost : 3000 lo que expone nuestra app del back
  -v "$(pwd)":/app ` <- para hacer el bind volume (pwd print working directory el directorio actual) : (/app para enlazar con la app)
  node:16-alpine3.16 ` <- la imagen que vamos a usar
  sh -c "npm install && npm run dev" <- ejecutar estos comandos luego de que la imagen se monto y se levanto 
```

El comando final seria:
```bash
  docker container run `
  --name ditto-routing-app `
  -w /app `
  -p 8082:1234 `
  -v "$(pwd):/app" `
  node:20-alpine3.20 `
  sh -c "npm install && npm run dev:2"
```

Lo que estamos logrando es levantar nuestro aplicacion en el puerto 8082 de nuestra computadora y en el contenedor se esta exponiendo en el puerto 1234 que es de la app **pero lo interesante** es nosotros logramos hacer la instalacion del *node_modules* dentro de la carpeta de nuestra computadora desde el contenedor.

De esta manera estariamos enlazando nuestra carpeta local con la del contenedor y podemos ver mas adelante con la terminal interactiva que incluso podemos editar los archivos desde el contenedor y ver los cambios reflejados de manera local.

## Terminal interactiva 

Los pasos que realizaremos es:

Dejar corriendo nuestro contenedor de node con el comando de arriba y darle seguimiento al contenedor para ver los logs con el siguiente comando

```bash
  docker container logs -f <idContiainer|nameContainer>
```

Ahora para ejecutar la **terminal interactiva** lo que tenemos que saber es que:

```bash
  docker exec -it <idContiainer|nameContainer> <executable>
  /* Dependiendo de lo que nosotros estemos ejecutando podremos ejecutar una de las 2 opciones */
  docker exec -it web bash <- esto
  docker exec -it web /bin/sh <- o esto pero usualmente este es comun
```

Bueno ahora con el ejercicio ejecutando el siguiente comando:
```bash
  docker exec -it ditto-routing-app /bin/sh 
```

Con esto lograremos entrar a la powershell de nuestra maquina en el contenedor asi lo que veremos es:
```bash
PS C:\WINDOWS\system32> docker exec -it ditto-routing-app /bin/sh
/app # ls
1.http.js          2.routing.js       ditto.json         imagen.png         node_modules       package-lock.json  package.json       text.txt
/app #
```

Y si nosotros salimos con *cd..* podremos ver la estructura de archivos de *Alpine Linux*

```bash
/app # cd ..
/ # ls
app    bin    dev    etc    home   lib    media  mnt    opt    proc   root   run    sbin   srv    sys    tmp    usr    var
```

Y ya bueno para editar el contenido que es lo que queremos hacer, cambiaremos el contenido. Recordar que con *cat* podemos ver contenido del archivo y con *vi* podremos editarlo.

> Para editar colocamos *i* insert y para salir presionamos *esc* luego *:q* quit y para salir y guardar *:wq* write and quit.

Asi el comando seria una vez que estemos dentro de app

```bash
  cat <archivo> <- para ver
  vi <archivo> <- para editar
```

Una vez guardado los cambios podriamos ver casi de manera instantanea que ya estan reflejados si volvemos a haer un get post put o delete en este caso get.

Para salir de la terminal interactiva escribir **exit**.

# DOCKER COMPOSE

Docker compose + docker compose.yml es el archivo que lee por defecto docker compose haha. En pocas palabras es un archivo que nosotros vamos a poder utilizar y llamar para construir todo nuestro set de contenedores que ejecutan o nos permiten desarollar una nueva aplicacion.

*Continuaremos con esta seccion mas adelante*

Para resolver el siguiente [ejercicio](https://gist.github.com/Klerith/8cfc637868212cfb888333ecaa6080e1)

Debemos de crear el volumen para postgres lo haremos con el siguiente comando:
```bash
  docker volume create postgres-db
``` 

Para montar la imagen de **postgres** en un contenedor:
```bash
docker container run `
--name postgres-db `
-e POSTGRES_PASSWORD=123456 `
-d `
-p 5433:5432 `
-v postgres-db:/var/lib/postgresql/data `
postgres:16.3-alpine3.20
``` 

Ahora para montar **pgadmin**:

Usaremos estos enlaces:
[Pagina de PGADMIN](https://hub.docker.com/r/dpage/pgadmin4)
[Version PGADMIN](https://hub.docker.com/layers/dpage/pgadmin4/8.9/images/sha256-9b00231257bc623100e79b54e500b273edeed336f156fdc37b9a4c9dc490eed1?context=explore)

```bash
docker container run `
--name pgAdmin `
-e PGADMIN_DEFAULT_PASSWORD=260298 `
-e PGADMIN_DEFAULT_EMAIL=igna@gmail.com `
-dp 8083:80 `
dpage/pgadmin4:8.9
``` 

Y en las credenciales del *pgadmin* son:

GENERAL:
nameserver: <elnombrequequieras>

CONNECTION:
|HOST     |PORT      |USERNAME    |PASSWORD|
| --- | --- | --- | --- |
|postgres-db   |5432    |postgres    |123456|

> Aqui colocamos el puerto *5432* ya que es el puerto de postgres en si y NO del que esta mapeado con nuestro host(maquina).

Pero no funcionara porque falta *crear la red*.

```bash
  docker network create postgres-net
``` 

```bash
  docker network connect postgres-net postgres-db
  docker network connect postgres-net pgAdmin
```

```bash
  docker network inspect postgres-net
``` 

Ahora probamos y **SI funcionara** la conexion. 🚀🚀🚀🚀

## Ahora ya volviendo con docker compose

Docker Compose es una herramienta que se desarrolló para ayudar a definir y compartir aplicaciones de varios contenedores. 

Como nosotros podriamos resumir todas estas tareas.
Para eso crearemos una carpeta *compose-postgres-pgadmin* y añadimos un archivo *docker-compose.yml*.

Para ver las ayudas en los comandos usamos:
```bash
  docker compose --help
``` 

Para poder levantar el archivo yaml que hayamos creado
> Debemos estar en el directorio donde tenemos el archivo *yml*
```bash
  docker compose up
``` 

Para poder eliminar los contenedores que hayamos creado con el compose
> Debemos estar en el directorio donde tenemos el archivo *yml*
```bash
  docker compose down
``` 

## Ejercicio de crear un docker yaml

Creando un archivo *docker-compose.yml* con el siguiente contenido:

* Crear un contenedor para la base de datos en monogodb
* Crear un contenedor para mongo express y conectarlo a la base de datos
* Crear un contenedor para un proyecto de nestjs del siguiente [repositorio](https://hub.docker.com/r/klerith/pokemon-nest-app)
* Modificar las variables de entorno 

> El contenedor del repositorio es una imagen ya configurada para que nosotros lo podamos usar sin tener que configurar nada.


```bash
MONGO_USERNAME=strider
MONGO_PASSWORD=123456789
MONGO_DB_NAME=pokemonDB
``` 

```bash
version: '3'

services:
  db:
    container_name: ${MONGO_DB_NAME}
    image: mongo:6.0
    volumes:
      - poke-vol:/data/db
    # ports:
    #   - 27017:27017
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    command: ['--auth']
  
  mongo-express:
    depends_on:
      - db
    image: mongo-express:1.0.0-alpha.4
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: ${MONGO_USERNAME}
      ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_PASSWORD}
      ME_CONFIG_MONGODB_SERVER: ${MONGO_DB_NAME}
    ports:
      - 8080:8081
    restart: always

  poke-app:
    depends_on:
      - db
      - mongo-express
    image: klerith/pokemon-nest-app:1.0.0
    ports:
      - 3000:3000
    environment:
      MONGODB: mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB_NAME}:27017
      DB_NAME: ${MONGO_DB_NAME}
    restart: always

volumes:
  poke-vol:
    external: false
``` 

### Cosas interesantes
* command: ['--auth'] -> Esto nos permite iniciar el contenedor con el flag de autenticacion por eso pasamos el nombre de usuario y la contraseña
* restart: always -> Esto nos permite reiniciar el contenedor si falla
* volumes: -> Esto nos permite crear un volumen para el contenedor
* environment: -> Esto nos permite pasar variables de entorno a nuestro contenedor
* ports: -> Esto nos permite mapear puertos de nuestra computadora con los del contenedor
* depends_on: -> Esto nos permite que el contenedor dependa de otro contenedor

MONGODB: mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB_NAME}:27017 -> Esto nos permite pasar la url de nuestra base de datos
```bash
  MONGODB: mongodb://<ignacio>:<123456>@<nombrecontenedorbasededatos>:27017
``` 


# DOCKER FILE

Es el proceso de tomar un codigo fuente y generar una imagen lista para ejecutar en un contenedor.

Para lograr esto debemos crear un archivo llamado Dockerfile en el directorio de nuestro proyecto.

El ejemplo que usaremos es el siguiente:
En el cual estamos usando una imagen de node y alpine para crear una imagen que ejecute el archivo app.js
```bash
FROM node:20.18-alpine3.19
# /app esta version de linux viene con el directorio /app

# ⬇️ | cd /app | este comando cambia el directorio de trabajo /app
WORKDIR /app

# Como copiamos el app.js y el package.json
# COPY source destination
#COPY app.js packege.json /app/ <- esto hubieramos puesto sino colocamos WORKDIR /app
COPY app.js package.json ./

# Como instalamos las dependencias
RUN npm install

# Como ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]
``` 

## Para poder ejecutar el archivo Dockerfile y ejecutar la constraccion seria
> Debemos estar en el directorio donde tenemos el archivo *Dockerfile*

```bash
  # el tag es un identificador que nos ayuda a identificar la imagen
  # el . es el directorio donde esta el archivo Dockerfile
  docker build -t cron-ticker .
  docker build --tag cron-ticker .
```

En nuestro archivo dockerfile. Todo lo que no editemos entonces estara en cache y no se volvera a descargar o ejecutar nuevamente es por eso que veremos los mensajes como *CACHED [2/4]* en la consola al momento de ejecutar.

Esto quiere decir que se ejecuto el paso [2/4] de nuestro Dockerfile desde el cache.

Eso lo podremos ver si constantemente ejecutamos el comando *docker build -t cron-ticker .* se ira creando una nueva imagen pero mas rapido y sino cambiamos el **tag** de la imagen todas las nuevas imagenes que se creen seran:

> cron-ticker:latest

Si nosotros queremos asignar un tag a nuestra imagen podemos hacerlo con el comando:  

```bash
  docker build --tag cron-ticker:1.0.0 .
```

Ahora como se queda en cache los pasos al crear la imagen podemos editar nuestro archivo dockerfile de la siguiente manera:

```bash
# PASO 1
FROM node:20.18-alpine3.19
# /app esta version de linux viene con el directorio /app

# PASO 2
# ⬇️ | cd /app | este comando cambia el directorio de trabajo /app
WORKDIR /app

# PASO 3
# Copiamos el package.json
# COPY source destination
# COPY app.js package.json /app/ <- esto hubieramos puesto sino colocamos WORKDIR /app
COPY package.json ./

# PASO 4
# Instalamos las dependencias
RUN npm install

# PASO 5
# Copiamos el archivo app.js
COPY app.js ./

# Ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]

```

De esta manera solo cuando cambiemos las dependencias se ejecutara los pasos 3 y 4
Y solo cuando cambiemos el archivo app.js se ejecutara el paso 5
Asi con estos cambios optimizamos el tiempo de ejecucion de nuestra aplicacion.

## Ahora como podremos renombrar una imagen

Para renombrar una imagen podemos hacerlo con el comando:

```bash
  docker image tag <nombreimagen:tagAntiguo> <nombreimagen:tagNuevo>
```

> Nota: Si esque no especificamos el tag de la imagen se asignara el tag latest

Veamos un ejemplo:
Si nosotros tenemos las siguientes imagenes:
```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image ls -a
REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
cron-ticker   1.0.0     dc1f6fc72b7d   22 minutes ago   133MB
cron-ticker   latest    eae13ba2cda5   32 minutes ago   133MB
```

Si queremos renombrar la imagen *cron-ticker:latest* a *cron-ticker:beta* podemos hacerlo de la siguiente manera:

Por ejemplo:
```bash
  docker image tag cron-ticker cron-ticker:beta
```
Y ahora tendremos 

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image tag cron-ticker cron-ticker:beta
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image ls -a
REPOSITORY    TAG       IMAGE ID       CREATED      SIZE
cron-ticker   1.0.0     dc1f6fc72b7d   3 days ago   133MB
cron-ticker   beta      eae13ba2cda5   3 days ago   133MB
cron-ticker   latest    eae13ba2cda5   3 days ago   133MB
```
> Nota: Algo que podremos ver es que al hacer esta tecnica los IMAGE ID son los mismos osea que apuntan a la misma imagen

## Como podemos subir una imagen a un repositorio

Lo primero que debemos hacer es crearnos una cuenta en [hub.docker.com](https://hub.docker.com/)

Posterior a eso debemos crearnos un respositorio en el cual subiremos nuestra imagen.

Para subir una imagen a un repositorio podemos hacerlo con el comando:

Si nosotros quisieramos subir el latest
```bash
  # Debemos crear una copia de la imagen pero con el tag de nuestro usuario/repositorio:tag
  docker image tag <nombreimagenlocal:tag> <usuario>/<repositorio>:<tag>
  docker image tag cron-ticker:latest nirojas1/cron-ticker-nr:latest
  # O es los mismo que poner
  docker image tag cron-ticker nirojas1/cron-ticker-nr

  # Y luego subimos la imagen
  docker image push <nombreimagen:tag>
  docker image push nirojas1/cron-ticker-nr:latest

  # O es lo mismo			
  docker image push nirojas1/cron-ticker-nr
```

### Nos faltaba logearnos 

Para hacerlo lo hacemos con el comando:
```bash
  docker login <- para autenticarnos
  docker logout <- para cerrar la sesion

  # Luego nos pedira el usuario y contraseña
  # Y tambien podremos crear un token de acceso para mas seguridad 
  # Y ya volvemos a intentar subir la imagen
```

> UN TIP: SI quieremos purgar todas las imagenes lo hacemos con el comando:
```bash
  docker image prune -a
```

## Como añadimos testing a nuestra imagen

Recordando teniamos el siguiente archivo *Dockerfile*

```bash
FROM node:20.18-alpine3.19
# /app esta version de linux viene con el directorio /app

# ⬇️ | cd /app | este comando cambia el directorio de trabajo /app
WORKDIR /app

# Como copiamos el app.js y el package.json
# COPY source destination
# COPY app.js package.json /app/ <- esto hubieramos puesto sino colocamos WORKDIR /app
COPY package.json ./

# Como instalamos las dependencias
RUN npm install

# Movemos aqui el copiado del archivo app.js
COPY app.js ./

# Como ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]
```

En el cual es una aplicacion que imprime en consola cada 5 segundos el numero de veces que se ejecuta. Esto con la libreria *node-cron*.

Para el testing instalaremos *jest* y lo hacemos con el siguiente comando:

```bash
npm i jest --save-dev
```

Creamos nuestro archivo de test y modificamos nuestro Dockerfile para que ejecute el test

```bash
FROM node:20.18-alpine3.19
# /app esta version de linux viene con el directorio /app

# ⬇️ | cd /app | este comando cambia el directorio de trabajo /app
WORKDIR /app

# Como copiamos el app.js y el package.json
# COPY source destination
# COPY app.js package.json /app/ <- esto hubieramos puesto sino colocamos WORKDIR /app
COPY package.json ./

# Como instalamos las dependencias
RUN npm install

# Copia todo lo del directorio actual al directorio de trabajo
COPY . .

# Realizar testing
RUN npm run test

# Como ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]

```

Ahora hacemos la construccion de nuestra imagen con:
```bash
docker build -t cron-ticker:mapache .
```
> Aqui tendremos un problema con el espacio ya que estamos copiando todo dentro de nuestro directorio actual

Si ejecutamos el comando:

```bash
  docker image ls

  PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image ls
  REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
  cron-ticker   mapache   5b8ebaaa8fef   2 minutes ago   265MB
```

Y luego ejecutamos la imagen con el comando:

```bash
docker container run -d cron-ticker:mapache

PS D:\ESTUDIO\PRACTICAS\DOCKER> docker container run -d cron-ticker:mapache
25dc0b9062f65a5773dc65c8f89b99a12b240ceb655ff3c2528ad8fbb157fbad

PS D:\ESTUDIO\PRACTICAS\DOCKER> docker container ls
CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS     NAMES
25dc0b9062f6   cron-ticker:mapache   "docker-entrypoint.s…"   3 minutes ago   Up 3 minutes             priceless_blackburn   
PS D:\ESTUDIO\PRACTICAS\DOCKER>
```

Y luego ejecutamos el comando para examinarlo:
```bash
exec -> ejecutar
-it -> interactive terminal
/bin/sh -> Como trabajamos con la version alpine usamos el shell 


docker exec -it <idContenedor> sh

docker exec -it 25d /bin/sh
De esta manera entraremos en el contenedor y podemos ver el directorio de trabajo si colocamos **ls**
> Nos salimos con **exit**

/app # ls
Dockerfile         package.json
app.js             tasks
node_modules       tests
package-lock.json
/app # 

```

Podemos notar que existen muchos directorios y archivos que no necesitamos para nuestro proyecto en produccion.

Archivos como ser:
1. Dockerfile
2. Dependencias en node_modules
3. los tests
...

Lo ideal seria ejecutar el test y borrar los directorios que no necesitamos.

## Dockerignore

Tenemos un archivo llamado **.dockerignore** en el cual podemos especificar los directorios que no queremos copiar en nuestra imagen.
Para ello creamos un archivo llamado **.dockerignore** en el cual colocamos los directorios que no queremos copiar con el siguiente contenido.

```bash
node_modules/

DockerFIle

.git
.gitignore
.dockerignore
```
Reducimos el espacio en disco de nuestra imagen de 265MB a 242MB no es mucho pero algo es algo.
> Nota: Aun si hacemos correr la imagen en un contenedor veremos que en los node_modules tenemos dependencias de jest que esas no las necesitamos para produccion y tambien aun tenemos los archivos de test etc

Lo que podriamos hacer es eliminar las dependencias innecesarias y archivos innecesarios de nuestra imagen.

Asi el dockerfile quedaria de la siguiente manera:
```bash
FROM node:20.18-alpine3.19
# /app esta version de linux viene con el directorio /app

# ⬇️ | cd /app | este comando cambia el directorio de trabajo /app
WORKDIR /app

# Como copiamos el app.js y el package.json
# COPY source destination
# COPY app.js package.json /app/ <- esto hubieramos puesto sino colocamos WORKDIR /app
COPY package.json ./

# Como instalamos las dependencias
RUN npm install

# Copia todo lo del directorio actual al directorio de trabajo
COPY . .

# Realizar testing
RUN npm run test

# Eliminar dependencias y archivos innecesarios
RUN rm -rf tests && rm -rf node_modules

# Instalamos unicamente las dependencias de produccion
RUN npm install --prod


# Como ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]
```

Y si luego corremos la imagen en un contenedor y vemos los archivos podremos ver que si tenemos menos dependencias y archivos no necesarios.

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker exec -it 48e /bin/sh
/app # ls
Dockerfile         app.js             node_modules       package-lock.json  package.json       tasks
/app # cd node_modules/
/app/node_modules # ls
@ampproject  @bcoe        @jest        @sinclair    @types      
```

Pero si vemos el espacio en disco ocupara mas que la anterior esto es porque tiene mas layers que ejecutar.

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image ls
REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
cron-ticker   pantera   56321fcd4445   45 seconds ago   243MB
cron-ticker   latest    7429ae57a4aa   24 hours ago     242MB
cron-ticker   mapache   7429ae57a4aa   24 hours ago     242MB
``` 
> Mas adelante veremos como podemos hacer que nuestra imagen sea más pequeña y optimizarla

## Ejercicio subir imagen a docker hub

1. Subir una imagen cualquiera al repositorio de docker hub
2. Subir la ultima imagen como latest

Tenemos las siguientes imagenes
```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image ls    
REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
cron-ticker   pantera   56321fcd4445   13 minutes ago   243MB
cron-ticker   latest    7429ae57a4aa   24 hours ago     242MB
cron-ticker   mapache   7429ae57a4aa   24 hours ago     242MB
```

Subiremos primero la imagen *cron-ticker:mapache* lo que tenemos que hacer es renombrarla con nuestro username

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image tag cron-ticker:mapache edwardrg/cron-ticker:mapache
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image ls
REPOSITORY             TAG       IMAGE ID       CREATED          SIZE
cron-ticker            pantera   56321fcd4445   16 minutes ago   243MB
edwardrg/cron-ticker   mapache   7429ae57a4aa   24 hours ago     242MB
cron-ticker            latest    7429ae57a4aa   24 hours ago     242MB
cron-ticker            mapache   7429ae57a4aa   24 hours ago     242MB
``` 

Nos saldra acceso denegado porque no nos autenticamos

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: edwardrg
Password:
Login Succeeded

Logging in with your password grants your terminal complete access to your account.
For better security, log in with a limited-privilege personal access token. Learn more at https://docs.docker.com/go/access-tokens/  
``` 

Y ya hacemos el push y estara subida en nuestro repositorio

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image push edwardrg/cron-ticker:mapache
The push refers to repository [docker.io/edwardrg/cron-ticker]
5210f74abc60: Pushed
aaf4b539380d: Pushed
322502f46e5a: Pushed
23785082b76c: Pushed
df416bcb18b0: Pushed
85547fed3bc5: Mounted from library/node
66d247e9f489: Mounted from library/node
fc228dab618f: Mounted from library/node
ba79b2c01278: Mounted from library/node
mapache: digest: sha256:e3b13d0843b3e0ffeb5d805bc72901a6197df631eea8396f9efc44d15554ab58 size: 2200
``` 

### Ahora que pasa si queremos subir la ultima imagen como latest 
De momento tenemos

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image ls
REPOSITORY             TAG       IMAGE ID       CREATED          SIZE
cron-ticker            pantera   56321fcd4445   30 minutes ago   243MB
edwardrg/cron-ticker   mapache   7429ae57a4aa   24 hours ago     242MB <- Esta subida 
cron-ticker            latest    7429ae57a4aa   24 hours ago     242MB
cron-ticker            mapache   7429ae57a4aa   24 hours ago     242MB
``` 

Renombramos la ultima imagen y lo podemos hacer con *:latest* o dejandolo solo *cron-ticker*

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image tag cron-ticker:pantera edwardrg/cron-ticker:latest 
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image ls
REPOSITORY             TAG       IMAGE ID       CREATED          SIZE
edwardrg/cron-ticker   latest    56321fcd4445   35 minutes ago   243MB
cron-ticker            pantera   56321fcd4445   35 minutes ago   243MB
edwardrg/cron-ticker   mapache   7429ae57a4aa   25 hours ago     242MB
cron-ticker            latest    7429ae57a4aa   25 hours ago     242MB
cron-ticker            mapache   7429ae57a4aa   25 hours ago     242MB
``` 

Ahora subimos la imagen a docker hub

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker image push edwardrg/cron-ticker      
Using default tag: latest
The push refers to repository [docker.io/edwardrg/cron-ticker]
001f4eb1025a: Pushed
b13b462f1465: Pushed
3b1eceb10617: Pushed
02cf018178ca: Pushed
322502f46e5a: Layer already exists
23785082b76c: Layer already exists
df416bcb18b0: Layer already exists
85547fed3bc5: Layer already exists
66d247e9f489: Layer already exists
fc228dab618f: Layer already exists
ba79b2c01278: Layer already exists
latest: digest: sha256:e7761161c830b37376a572eb5dccf69f159be98d6cc08a2828a53ee9a9ea36fe size: 2616
``` 

## Arquitectura de imagenes

Si nosotros observamos la imagen que acabamos de subir podemos ver que tiene una arquitectura de imagen específica.
Asi la imagen en nuestra cuenta de [docker hub](https://hub.docker.com/r/edwardrg/cron-ticker/tags) se vera de la siguiente manera:

> Nota: Por defecto construye la imagen en una arquitectura que soporte nuestro equipo. Si fuera mac podria ser una linux/arm64 por ejemplo.

| Digest | OS/ARCH | Compressed size |
| --- | --- | --- |
| e7761161c830 | linux/amd64 | 70.98 MB |

Asi podemos ver que la imagen soporta la arquitectura de amd64 y el sistema operativo linux.

Como podemos forzar una arquitectura de imagen es con el comando y modificaremos el Dockerfile:

```bash
FROM --platform=linux/amd64 node:20.18-alpine3.19 <- Modificamos esta linea
# /app esta version de linux viene con el directorio /app

# ⬇️ | cd /app | este comando cambia el directorio de trabajo /app
WORKDIR /app

# Como copiamos el app.js y el package.json
# COPY source destination
# COPY app.js package.json /app/ <- esto hubieramos puesto sino colocamos WORKDIR /app
COPY package.json ./

# Como instalamos las dependencias
RUN npm install

# Copia todo lo del directorio actual al directorio de trabajo
COPY . .

# Realizar testing
RUN npm run test

# Eliminar dependencias y archivos innecesarios
RUN rm -rf tests && rm -rf node_modules

# Instalamos unicamente las dependencias de produccion
RUN npm install --prod


# Como ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]
```

Pero si empujamos esta imagen a nuestro docker hub solo se subiria una imagen especifica. 

Para solucionar esto podemos seguir la guia que nos ofrece docker hub [building-multi-platform-images](https://docs.docker.com/build/building/multi-platform/#getting-started)

Siguiendo a pie lo que nos dice la documentacion es:

Debemos crear un constructor personalizado que utilice un controlador que sea multiplataforma. Para ello usamos el comando:

```bash
 docker buildx create `
  --name container-builder `
  --driver docker-container `
  --bootstrap --use
```
Explicando este comando:

* docker buildx create: Inicia el proceso de creación de un nuevo builder.
* --name container-builder: Asigna el nombre "container-builder" a la nueva instancia del builder, lo que facilita su identificación y gestión.
* --driver docker-container: Especifica que el driver a utilizar será docker-container, lo que significa que el daemon de BuildKit se ejecutará dentro de un contenedor Docker. Esto permite una mayor flexibilidad y aislamiento en comparación con el driver por defecto.
* --bootstrap: Inicializa el builder inmediatamente después de su creación. Esto implica que se descargan las imágenes necesarias y se preparan los recursos para comenzar a construir imágenes.
* --use: Establece esta nueva instancia como la instancia activa, lo que significa que cualquier comando posterior relacionado con la construcción de imágenes utilizará este builder por defecto.

> Nota. Para eliminar un builder con: docker buildx rm container-builder

Primero veremos los builders que tenemos
 
```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker buildx ls
NAME/NODE       DRIVER/ENDPOINT STATUS  BUILDKIT                              PLATFORMS
default *       docker
  default       default         running v0.11.7-0.20230525183624-798ad6b0ce9f linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6
desktop-linux   docker
  desktop-linux desktop-linux   running v0.11.7-0.20230525183624-798ad6b0ce9f linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6

``` 

Ahora ejecutando el comando de creacion de un nuevo builder

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker buildx create ` 
>> --name container-builder ` 
>> --driver docker-container ` 
>> --bootstrap --use
[+] Building 17.2s (1/1) FINISHED
 => [internal] booting buildkit                                                                                                          17.1s
 => => pulling image moby/buildkit:buildx-stable-1                                                                                       15.3s
 => => creating container buildx_buildkit_container-builder0                                                                              1.8s
container-builder
``` 

Ahora si volvemos a listar

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker buildx ls
NAME/NODE            DRIVER/ENDPOINT                STATUS  BUILDKIT                              PLATFORMS
container-builder *  docker-container
  container-builder0 npipe:////./pipe/docker_engine running v0.18.2                               linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
default              docker
  default            default                        running v0.11.7-0.20230525183624-798ad6b0ce9f linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6
desktop-linux        docker
  desktop-linux      desktop-linux                  running v0.11.7-0.20230525183624-798ad6b0ce9f linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6
``` 

Si nose cambio el uso se cambia el uso con el siguiente comando:

```bash
docker buildx use container-builder
``` 

Se puede inspeccionar el builder con el comando:
Se vera todas las plataformas con las que este builder trabajara
```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER> docker buildx inspect
Name:          container-builder
Driver:        docker-container
Last Activity: 2025-01-06 00:00:29 +0000 UTC

Nodes:
Name:      container-builder0
Endpoint:  npipe:////./pipe/docker_engine
Status:    running
Buildkit:  v0.18.2
Platforms: linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
PS D:\ESTUDIO\PRACTICAS\DOCKER> 
``` 

Ahora cambiaremos nuestro dockerfile para que reciba una variable de entorno que nos indique la o las plataformas que estamos construyendo.

```bash
# FROM node:20.18-alpine3.19
# FROM --platform=linux/amd64 node:20.18-alpine3.19
FROM --platform=$BUILDPLATFORM node:20.18-alpine3.19
# /app esta version de linux viene con el directorio /app

# ⬇️ | cd /app | este comando cambia el directorio de trabajo /app
WORKDIR /app

# Como copiamos el app.js y el package.json
# COPY source destination
# COPY app.js package.json /app/ <- esto hubieramos puesto sino colocamos WORKDIR /app
COPY package.json ./

# Como instalamos las dependencias
RUN npm install

# Copia todo lo del directorio actual al directorio de trabajo
COPY . .

# Realizar testing
RUN npm run test

# Eliminar dependencias y archivos innecesarios
RUN rm -rf tests && rm -rf node_modules

# Instalamos unicamente las dependencias de produccion
RUN npm install --prod


# Como ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]

``` 

Ahora para construir la imagen solo tenemos que ejecutar el comando:

> Nota. Podemos añadir mas plataformas separadas por comas
```bash
docker buildx build --platform linux/amd64,linux/arm64 `
-t edwardrg/cron-ticker:latest --push .
``` 

Ahora ejecutando el comando veremos los siguientes resultados:

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER\clases\dockerfile\cron-ticker> docker buildx build --platform linux/amd64,linux/arm64 `
>> -t edwardrg/cron-ticker:latest --push .
[+] Building 50.4s (15/15) FINISHED
 => [internal] load build definition from Dockerfile                                                                                                                                   0.1s
 => => transferring dockerfile: 959B                                                                                                                                                   0.0s
 => [linux/amd64 internal] load metadata for docker.io/library/node:20.18-alpine3.19                                                                                                   2.3s
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                                            0.0s
 => [internal] load .dockerignore                                                                                                                                                      0.0s
 => => transferring context: 104B                                                                                                                                                      0.0s
 => [linux/amd64 1/8] FROM docker.io/library/node:20.18-alpine3.19@sha256:1cc9088b0fbcb2009a8fc2cb57916cd129cd5e32b3c75fb12bb24bac76917a96                                             7.6s
 => => resolve docker.io/library/node:20.18-alpine3.19@sha256:1cc9088b0fbcb2009a8fc2cb57916cd129cd5e32b3c75fb12bb24bac76917a96                                                         0.0s
 => => sha256:24ccc27c613d79e23ab0d19893d0505ba531b266e6b6c56267c0635c5ae8410e 1.39MB / 1.39MB                                                                                         1.6s
 => => sha256:c53026b414f8e18bfde927049ab4a6e1ec606161d8f06145728f87b6a2334050 445B / 445B                                                                                             0.5s
 => => sha256:b508a0a802cc38d079a5055ea5b2663aa750189a5a59534c154b6e89bf0697c5 42.63MB / 42.63MB                                                                                       5.6s
 => => sha256:a7cd7d9a21440da0d765f2989d75f069adf9b3463a765421a0590bca720920d4 3.42MB / 3.42MB                                                                                         1.6s
 => => extracting sha256:a7cd7d9a21440da0d765f2989d75f069adf9b3463a765421a0590bca720920d4                                                                                              0.2s
 => => extracting sha256:b508a0a802cc38d079a5055ea5b2663aa750189a5a59534c154b6e89bf0697c5                                                                                              1.7s
 => => extracting sha256:24ccc27c613d79e23ab0d19893d0505ba531b266e6b6c56267c0635c5ae8410e                                                                                              0.1s
 => => extracting sha256:c53026b414f8e18bfde927049ab4a6e1ec606161d8f06145728f87b6a2334050                                                                                              0.0s
 => [internal] load build context                                                                                                                                                      0.1s
 => => transferring context: 127.82kB                                                                                                                                                  0.0s
 => [linux/amd64 2/8] WORKDIR /app                                                                                                                                                     0.1s
 => [linux/amd64 3/8] COPY package.json ./                                                                                                                                             0.0s
 => [linux/amd64 4/8] RUN npm install                                                                                                                                                 19.8s
 => [linux/amd64 5/8] COPY . .                                                                                                                                                         0.1s
 => [linux/amd64 6/8] RUN npm run test                                                                                                                                                 2.0s
 => [linux/amd64 7/8] RUN rm -rf tests && rm -rf node_modules                                                                                                                          0.8s
 => [linux/amd64 8/8] RUN npm install --prod                                                                                                                                           1.1s
 => exporting to image                                                                                                                                                                16.2s
 => => exporting layers                                                                                                                                                                3.0s
 => => exporting manifest sha256:ceab6379b208947d79522a7d4135fe2be72d539367a40609f9b63561cc2d764a                                                                                      0.0s
 => => exporting config sha256:73613bec3e372e944b39566073211ad259a06a8982f838f459db5803177714a1                                                                                        0.0s
 => => exporting attestation manifest sha256:cf02a940ca77210e3dff4197770cb5b098da9935ced5da96edb03a90111890c3                                                                          0.0s
 => => exporting manifest sha256:1df0e3e2b61c92795141020fae319dc2cecce2eb47076831208d4524b7d78c3f                                                                                      0.0s
 => => exporting config sha256:9ab30894c96dd673deb12f53b852df6df0b5e2c59cdfd337fedd7cb7fb26fd80                                                                                        0.0s
 => => exporting attestation manifest sha256:58971e64ddbe26681ab3d587c85476851df712486bcb36e5a479f3a8a98c5257                                                                          0.0s
 => => exporting manifest list sha256:f737223e88a34ebc0170860a96a0f649b8247325b8c45ad22a5960fec8171862                                                                                 0.0s
 => => pushing layers                                                                                                                                                                 10.9s
 => => pushing manifest for docker.io/edwardrg/cron-ticker:latest@sha256:f737223e88a34ebc0170860a96a0f649b8247325b8c45ad22a5960fec8171862                                              2.2s
 => [auth] edwardrg/cron-ticker:pull,push token for registry-1.docker.io  
``` 

Y en el navegador en nuestro docker hub veremos que se ha creado la imagen con las nuevas arquitecturas. [repository docker hub](https://hub.docker.com/r/edwardrg/cron-ticker/tags)

| Digest	| OS/ARCH | Compressed size |
| --- | --- | --- |
| ceab6379b208 | linux/amd64 | 70.99 MB |
| 1df0e3e2b61c | linux/arm64 | 70.99 MB |


## COSAS IMPORTANTES
Como usaremos el builder que creamos solo para subir imagenes a nuestro docker hub hariamos uso de la siguiente estrategia:
### Uso del Builder Predeterminado
Si solo deseas construir imágenes para tu máquina personal, puedes hacer lo siguiente:
```bash
docker buildx stop container-builder
docker buildx use default
docker build -t cron-ticker .
```
***explicacion***
* docker buildx stop container-builder: Detiene el builder multiplaforma, liberando recursos.
* docker buildx use default: Cambia al builder predeterminado, que es suficiente para construir imágenes solo para tu plataforma.
* docker build -t cron-ticker .: Construye la imagen utilizando el builder predeterminado.

### Uso del Builder Multiplaforma
Si en algún momento necesitas usar el builder multiplaforma, puedes hacerlo así:
```bash
docker buildx start container-builder
docker buildx use container-builder
docker buildx build -t cron-ticker .

```

***explicacion***
* docker buildx start container-builder: Inicia el builder multiplaforma.
* docker buildx use container-builder: Cambia al builder multiplaforma.
* docker buildx build -t cron-ticker .: Construye la imagen utilizando el builder multiplaforma.

> Nota: Para ver la informacion de la imagen en que plataformas se esta construyendo podemos hacer lo siguiente:
```bash
docker buildx imagetools inspect edwardrg/cron-ticker:gato
```


# MULTISTATE

Multistate en docker es un concepto que nos permite crear una imagen que se pueda ejecutar en diferentes estados.
Podria darse una analogia de crear una imagen por cada estado de una aplicacion y que esta tenga la posibilidad de comunicarse con los otros estados.

Recordando teniamos el siguiente Dockerfile

```bash
# FROM node:20.18-alpine3.19
# FROM --platform=linux/amd64 node:20.18-alpine3.19
FROM --platform=$BUILDPLATFORM node:20.18-alpine3.19
# /app esta version de linux viene con el directorio /app

# ⬇️ | cd /app | este comando cambia el directorio de trabajo /app
WORKDIR /app

# Como copiamos el app.js y el package.json
# COPY source destination
# COPY app.js package.json /app/ <- esto hubieramos puesto sino colocamos WORKDIR /app
COPY package.json ./

# Como instalamos las dependencias
RUN npm install

# Copia todo lo del directorio actual al directorio de trabajo
COPY . .

# Realizar testing
RUN npm run test

# Eliminar dependencias y archivos innecesarios
RUN rm -rf tests && rm -rf node_modules

# Instalamos unicamente las dependencias de produccion
RUN npm install --prod


# Como ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]
``` 

Ahora modificaremos el Dockerfile de la siguiente manera:
Comenzamos:

1. Primera Etapa
```bash
FROM node:20.18-alpine3.19 AS dependencies
# FROM --platform=linux/amd64 node:20.18-alpine3.19
# FROM --platform=$BUILDPLATFORM node:20.18-alpine3.19
# /app esta version de linux viene con el directorio /app

# ⬇️ | cd /app | este comando cambia el directorio de trabajo /app
WORKDIR /app

# Como copiamos el app.js y el package.json
# COPY source destination
# COPY app.js package.json /app/ <- esto hubieramos puesto sino colocamos WORKDIR /app
COPY package.json ./

# Como instalamos las dependencias
RUN npm install
``` 

El *AS dependencies* nos permite crear una imagen con el nombre *dependencies* con node y linux alpine que le indicamos que contenga solo las dependencias de nuestro proyecto.

2. Segunda Etapa
3. Tercera Etapa
4. Cuarta Etapa

Todas estas etapas estan descritas en el Dockerfile y se puede observar la reutilizacion de etapas anteriores asi mismo la nueva imagen que se creara sera con un peso menor.

```bash
# Primera Etapa
# Dependencias de desarrollo
FROM node:20.18-alpine3.19 AS dependencies
WORKDIR /app
COPY package.json ./
RUN npm install




# Segunda Etapa
# Build y Test
FROM node:20.18-alpine3.19 AS tester-builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run test
# RUN npm run build <- Como no tenemos ese paso lo comentamos




# Tercera Etapa
# Dependencias de produccion. Almacenamos en una imagen separada dependencias solo de produccion
FROM node:20.18-alpine3.19 AS dependencies-prod
WORKDIR /app
COPY package.json ./
RUN npm install --prod



# Cuarta Etapa
# Ejecutar la app
FROM node:20.18-alpine3.19 AS runner
WORKDIR /app
COPY --from=dependencies-prod /app/node_modules ./node_modules
COPY app.js ./
COPY tasks ./tasks



# Como ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]
``` 

El peso seria 

|REPOSITORY             |TAG               |IMAGE ID       |CREATED       |SIZE |
| --- | --- | --- | --- | --- |
|edwardrg/cron-ticker   |latest            |2e050d7ad9bc   |2 days ago    |133MB |

Y para subir a nuestro docker hub haremos lo siguiente y ahi podremos ver que la imagen comprimida pesa aun menos.

```bash
PS D:\ESTUDIO\PRACTICAS\DOCKER\clases\dockerfile\multistate> docker image ls
REPOSITORY             TAG               IMAGE ID       CREATED       SIZE
edwardrg/cron-ticker   latest            2e050d7ad9bc   2 days ago    133MB
moby/buildkit          buildx-stable-1   a72f628fa83e   7 weeks ago   206MB
PS D:\ESTUDIO\PRACTICAS\DOCKER\clases\dockerfile\multistate> docker image tag edwardrg/cron-ticker:latest edwardrg/cron-ticker:oso 
PS D:\ESTUDIO\PRACTICAS\DOCKER\clases\dockerfile\multistate> docker image ls
REPOSITORY             TAG               IMAGE ID       CREATED       SIZE
edwardrg/cron-ticker   latest            2e050d7ad9bc   2 days ago    133MB
edwardrg/cron-ticker   oso               2e050d7ad9bc   2 days ago    133MB
moby/buildkit          buildx-stable-1   a72f628fa83e   7 weeks ago   206MB
PS D:\ESTUDIO\PRACTICAS\DOCKER\clases\dockerfile\multistate> docker image push edwardrg/cron-ticker:oso
The push refers to repository [docker.io/edwardrg/cron-ticker]
b3f5528e69bd: Pushed
16cc1f16b0b6: Pushed
96c775a9c89c: Pushed
df416bcb18b0: Layer already exists
85547fed3bc5: Layer already exists
66d247e9f489: Layer already exists
fc228dab618f: Layer already exists
ba79b2c01278: Layer already exists
oso: digest: sha256:b8f9eccfc4c573e25bd6795d5f2c68f1c7e1524ea66e02773f5d22c832177c11 size: 1987
``` 

Aqui podremos ver que la imagen se ha subido a nuestro docker hub y que el peso es menor [link](https://hub.docker.com/repository/docker/edwardrg/cron-ticker/tags/oso/sha256:b8f9eccfc4c573e25bd6795d5f2c68f1c7e1524ea66e02773f5d22c832177c11).

> Nota: Como vimos en esta parte --platform=$BUILDPLATFORM usa la plataforma que nosotros mandemos por parametro pero si usamos builx no es necesario colocar eso en cada state ya que tomara lo que pongamos en el comando de ejecucion. Como puede ser: docker buildx build --platform linux/amd64,linux/arm64 -t edwardrg/cron-ticker:latest --push .

# Pasando a la siguiente seccion
Nos clonamos un proyecto de nestjs y lo vamos a ejecutar con docker
para ello el proyecto ya tenia una configuracion en su docker compose yaml
en la cual levantaba una base de datos de postgres y exponia el puerto 5432
```bash
version: '3'

services:
  
  db:
    image: postgres:16.3-alpine3.20
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: ${DB_NAME}
    volumes:
      - postgres-db:/var/lib/postgresql/data


volumes:
  postgres-db:
    external: false
``` 

Nosotros en este caso integraremos la aplicacion realizada con nestjs en el mismo docker compose para que podamos usarlas con el mismo contenedor.

Asi lo que nos creamos fue un archivo Dockerfile que se encarga de construir la imagen que vamos a usar.

Aqui hay que notar varios puntos:
1. Estamos usando multi stages para construir la imagen
2. Hay que hacer enfasis en la primera parte que es un stage para dev
3. Este stage nos servira para construir nuestra imagen en modo desarrollo
4. Nos servira este stage ya que lo especificaremos en el docker compose que veremos mas adelante asi el docker compose solo ejecutara este stage ya que esta haciendo referencia en el target
5. Los siguientes stages nos sirven para construir la imagen en modo produccion

Dockerfile
```bash

# Que pasa si queremos un stage para desarrollo
FROM node:19-alpine3.15 as dev
WORKDIR /app
# COPY package.json package.json
COPY package.json ./
RUN npm install --ignore-scripts --frozen-lockfile
CMD ["npm", "run", "start:dev"]


FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --ignore-scripts --frozen-lockfile


FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN yarn test
RUN npm run build

FROM node:19-alpine3.15 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --prod --ignore-scripts --frozen-lockfile


FROM node:19-alpine3.15 as prod
EXPOSE 3000
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node","dist/main.js"]
``` 

Docker compose
Cosas importantes:
1. El build es la parte que nos permitira construir la imagen
2. el context es donde esta el directorio que contiene el dockerfile
3. dockerfile: Dockerfile <- aqui podemos indicar el nombre del dockerfile que vamos a usar facilmente podriamos asignar otro nombre como Dockerfile.dev y luego indicarlo
4. target: dev <- indicamos el target que vamos a usar que sera el dockerfile que usaremos para construir la imagen y como le indicamos dev usara ese stage
5. volumes: -> /app/ <- indicamos el directorio que vamos a usar para montar la imagen
6. Este volumen es un bind volume que nos permitira conectar el directorio que esta en nuestro ordenador con el del contenedor
7. Las variables de entorno que estamos definiendo en el docker compose nos serviran para pasar variables de entorno a nuestra imagen

```bash
version: '3'


services:

  app:
  
    build:
      context: ./
      target: dev # Este es el target que se va usar y lo buscara en nuestro dockerfile
      dockerfile: Dockerfile # Aqui podemos indicar el dockerfile que vamos a usar podria ser otro nombre depende de lo que queramos
    volumes:
      - ./:/app/      
      - /app/node_modules # Este seria el mapeo adicional que en caso que no tengamos el node modules de lado de docker lo mapearemos al nuestro
      # Este app/node_modules es basicamente un volumen anonimo que mapea el directorio que esta en nuestro ordenador con el del contenedor
      # En este caso, el directorio /app/node_modules dentro del contenedor no se mapea a ningún directorio específico del host; simplemente se crea un volumen temporal que persiste los datos de ese directorio mientras el contenedor está activo.
    container_name: nest-app
    ports:
      - "${PORT}:${PORT}"
    environment:
      APP_VERSION: ${APP_VERSION}
      STAGE: ${STAGE}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USERNAME: ${DB_USERNAME}
      PORT: ${PORT}
      HOST_API: ${HOST_API}
      JWT_SECRET: ${JWT_SECRET}
  
  db:
    image: postgres:16.3-alpine3.20
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: ${DB_NAME}
    volumes:
      - postgres-db:/var/lib/postgresql/data


volumes:
  postgres-db:
    external: false
``` 

Como ejecutamos este docker compose?

1. Primero tenemos que construir la imagen que especifica del target dev
```bash
  docker compose build
``` 
2. Luego ejecutamos el contenedor
```bash
  docker compose up
``` 
Sorpresa sorpresa la imagen esta fallando XD
```bash
nest-app  | [11:29:05 PM] Found 0 errors. Watching for file changes.
nest-app  |
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [NestFactory] Starting Nest application...
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] AppModule dependencies initialized +58ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] PassportModule dependencies initialized +0ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] CommonModule dependencies initialized +1ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] ServeStaticModule dependencies initialized +1ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] FilesModule dependencies initialized +1ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] FilesModule dependencies initialized +1ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] JwtModule dependencies initinest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM     LOG [InstanceLoader] JwtModule dependencies initialized +0ms
alized +0ms
nest-app  | [Nest] 29  - 04/07/2025, 11:29:06 PM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
nest-app  | Error: connect ECONNREFUSED ::1:5432
nest-app  | Error: connect ECONNREFUSED ::1:5432
nest-app  |     at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1283:16)
nest-app  |     at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1283:16)
nest-app  | [Nest] 29  - 04/07/2025, 11:29:09 PM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (2)...
nest-app  | Error: connect ECONNREFUSED ::1:5432
nest-app  | Error: connect ECONNREFUSED ::1:5432
nest-app  |     at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1283:16)
nest-app  |     at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1283:16)
nest-app  | [Nest] 29  - 04/07/2025, 11:29:12 PM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (3)...
nest-app  | Error: connect ECONNREFUSED ::1:5432
nest-app  |     at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1283:16)
nest-app  | [Nest] 29  - 04/07/2025, 11:29:15 PM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (4)...
Gracefully stopping... (press Ctrl+C again to force)
``` 

Podemos ver que si creo los modulos de node y que nuestra aplicacion esta corriendo entonces cual fue el error?
Resulta que por los logs vemos que no se pudo conectar con la base de datos y si vemos en las variables de entorno lo que teniamos era:

```bash

APP_VERSION=1.0.1


STAGE=dev

DB_PASSWORD=MySecr3tPassWord@as2
DB_NAME=TesloDB
DB_HOST=localhost <- Esta linea es la que causa conflicto ya que no nos deberiamos estar conectando a localhost sino al host que esta definido en el contenedor
DB_PORT=5432
DB_USERNAME=postgres

PORT=3000
HOST_API=http://localhost:3000/api

JWT_SECRET=Est3EsMISE3Dsecreto32scle

ya que si vemos en nuestro yaml esta linea esta usando
container_name: ${DB_NAME} la variable de entorno por lo cual

localhost -> se volvera -> TesloDB -> y sorpresa la aplicacion correra
``` 

Si ingresamos a esta [url](http://localhost:3000/api/#/) ya podremos ver nuestra api funcionando.


Si nosotros quisieramos hacer que solo cambiando la variable de entorno de **STAGE=dev** a **STAGE=prod** y automaticamente que se ejecute los stages de produccion tendriamos que modificar nuestros archivo de la siguiente manera:
Creamos un nuevo archivo llamado **docker-compose.prod.yml** y lo copiamos de la siguiente manera: 
1. Eliminamos el contenido del bind volume que teniamos para levantarlo en dev
2. Agregamos el target para que obtenga la variable de entorno en caso de ser prod
EL DOCKER YAML SERIA:

```bash
services:

  app:
  
    build:
      context: ./
      target: ${STAGE} # Este es el target que se va usar y lo buscara en nuestro dockerfile
      dockerfile: Dockerfile # Aqui podemos indicar el dockerfile que vamos a usar podria ser otro nombre depende de lo que queramos
    container_name: nest-app
    ports:
      - "${PORT}:${PORT}"
    environment:
      APP_VERSION: ${APP_VERSION}
      STAGE: ${STAGE}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USERNAME: ${DB_USERNAME}
      PORT: ${PORT}
      HOST_API: ${HOST_API}
      JWT_SECRET: ${JWT_SECRET}
  
  db:
    image: postgres:16.3-alpine3.20
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: ${DB_NAME}
    volumes:
      - postgres-db:/var/lib/postgresql/data


volumes:
  postgres-db:
    external: false
``` 
Y posterior a eso para ejecutar este archivo lo haremos con el siguiente comando

```bash
# Para construir la imagen del dockerfile
docker compose -f docker-compose.prod.yml build
# Para levantar la imagen con el docker yaml en un contenedor
docker compose -f docker-compose.prod.yml up

``` 

Agregamos esta linea mas en el docker compose para que el servicio app se cree con la imagen que nosotros le indicamos
```bash	
 app:  
    build:
      ...
    image: edwardrg/teslo-shop-backend  # <- Con esta linea podemos indicar el nombre de la imagen que se va construir y luego usar
```


> Nota: Siempre deberiamos ejecutar primero el build para que el dockerfile se compile y luego el up para levantar el contenedor

Ahora si listamos las imagenes veremos el tag latest

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\dockerfile\teslo-shop\teslo-shop> docker image ls
REPOSITORY                    TAG               IMAGE ID       CREATED         SIZE
teslo-shop-app                latest            a4c1c6841478   3 days ago      1.03GB
edwardrg/teslo-shop-backend   latest            ebc9be8ee883   3 days ago      1.03GB
postgres                      16.3-alpine3.20   36ed71227ae3   10 months ago   351MB
``` 

> NOTA: Algo importante En nuestro docker compose yaml tenemos 2 servicios por lo que si nosotros sabemos que para lo que necesitamos el **build** es solamente para nuestra app que es en la que le estamos mandando el contexto el target y demas cosas entonces lo que tendriamos que ejecutar es 

```bash
docker compose -f docker-compose.prod.yml build app <- Asi sera un build especifico del servicio que queremos construir
``` 

# REGISTROS Y DESPLIEGUES

Para ello lo primero que haremos es subir nuestra imagen a docker hub eso lo haremos con los siguientes pasos
Sino tenemos el contexto lo creamos y utilizamos con el siguiente comando
```bash
docker buildx create `
>>   --name container-builder `
>>   --driver docker-container `
>>   --bootstrap --use
``` 
Ahora para subir la imagen
```bash
docker buildx build --platform linux/amd64,linux/arm64 -t edwardrg/teslo-shop-nr:1.0.0 --push .
``` 

Y ahi veremos los siguientes logs

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\dockerfile\teslo-shop\teslo-shop> docker buildx build --platform linux/amd64,linux/arm64 -t edwardrg/teslo-shop-nr:1.0.0 --push .
[+] Building 41.9s (28/28) FINISHED                                                                                                                        docker-container:container-builder
 => [internal] load build definition from Dockerfile                                                                                                                                     0.0s
 => => transferring dockerfile: 875B                                                                                                                                                     0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 3)                                                                                                           0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 11)                                                                                                          0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 17)                                                                                                          0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 24)                                                                                                          0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 30)                                                                                                          0.0s
 => [linux/arm64 internal] load metadata for docker.io/library/node:19-alpine3.15                                                                                                        1.2s
 => [linux/amd64 internal] load metadata for docker.io/library/node:19-alpine3.15                                                                                                        1.2s
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                                              0.0s
 => [internal] load .dockerignore                                                                                                                                                        0.0s
 => => transferring context: 118B                                                                                                                                                        0.0s
 => [linux/amd64 dev-deps 1/4] FROM docker.io/library/node:19-alpine3.15@sha256:12d9c7253f232bb88a9ef6d6e974afd90e296cb8383572dbb7f28c39f828b07e                                         0.0s
 => => resolve docker.io/library/node:19-alpine3.15@sha256:12d9c7253f232bb88a9ef6d6e974afd90e296cb8383572dbb7f28c39f828b07e                                                              0.0s
 => [internal] load build context                                                                                                                                                        0.0s
 => => transferring context: 18.41kB                                                                                                                                                     0.0s
 => [linux/arm64 dev-deps 1/4] FROM docker.io/library/node:19-alpine3.15@sha256:12d9c7253f232bb88a9ef6d6e974afd90e296cb8383572dbb7f28c39f828b07e                                         0.0s
 => => resolve docker.io/library/node:19-alpine3.15@sha256:12d9c7253f232bb88a9ef6d6e974afd90e296cb8383572dbb7f28c39f828b07e                                                              0.0s
 => CACHED [linux/arm64 dev-deps 2/4] WORKDIR /app                                                                                                                                       0.0s
 => CACHED [linux/arm64 dev-deps 3/4] COPY package.json package.json                                                                                                                     0.0s
 => CACHED [linux/arm64 prod-deps 4/4] RUN npm install --prod --ignore-scripts --frozen-lockfile                                                                                         0.0s
 => CACHED [linux/arm64 prod 3/4] COPY --from=prod-deps /app/node_modules ./node_modules                                                                                                 0.0s
 => CACHED [linux/arm64 dev-deps 4/4] RUN npm install --ignore-scripts --frozen-lockfile                                                                                                 0.0s
 => CACHED [linux/arm64 builder 3/5] COPY --from=dev-deps /app/node_modules ./node_modules                                                                                               0.0s
 => CACHED [linux/arm64 builder 4/5] COPY . .                                                                                                                                            0.0s
 => CACHED [linux/arm64 builder 5/5] RUN npm run build                                                                                                                                   0.0s
 => CACHED [linux/arm64 prod 4/4] COPY --from=builder /app/dist ./dist                                                                                                                   0.0s
 => CACHED [linux/amd64 dev-deps 2/4] WORKDIR /app                                                                                                                                       0.0s
 => CACHED [linux/amd64 dev-deps 3/4] COPY package.json package.json                                                                                                                     0.0s
 => CACHED [linux/amd64 prod-deps 4/4] RUN npm install --prod --ignore-scripts --frozen-lockfile                                                                                         0.0s
 => CACHED [linux/amd64 prod 3/4] COPY --from=prod-deps /app/node_modules ./node_modules                                                                                                 0.0s
 => CACHED [linux/amd64 dev-deps 4/4] RUN npm install --ignore-scripts --frozen-lockfile                                                                                                 0.0s
 => CACHED [linux/amd64 builder 3/5] COPY --from=dev-deps /app/node_modules ./node_modules                                                                                               0.0s
 => CACHED [linux/amd64 builder 4/5] COPY . .                                                                                                                                            0.0s
 => CACHED [linux/amd64 builder 5/5] RUN npm run build                                                                                                                                   0.0s
 => CACHED [linux/amd64 prod 4/4] COPY --from=builder /app/dist ./dist                                                                                                                   0.0s
 => exporting to image                                                                                                                                                                  41.1s
 => => exporting layers                                                                                                                                                                  0.0s
 => => exporting manifest sha256:4152db81f0fb21b10d070225b146c59fcf6b26b7e981e4a8d58476fd596be39a                                                                                        0.0s
 => => exporting config sha256:63e5dcf23802618c3376649d1945c530811933afc426a7169336b14971c49b32                                                                                          0.0s
 => => exporting attestation manifest sha256:d03ec2b44f2112c8b8c943c68058421c95e305892fe048284115cc846301e112                                                                            0.0s
 => => exporting manifest sha256:8010bab43bdef64f0a7d3d0c50db89e86b3e693f78e385766e952f930ac7919f                                                                                        0.0s
 => => exporting config sha256:eb75d0824a6df2a984c6860c60d5e89eead78000b67b02e464427189dfc2b286                                                                                          0.0s
 => => exporting attestation manifest sha256:85be139c0318f3d7c9436cb635111df7457a07381c84a6afce8c0f0ef167e514                                                                            0.0s
 => => exporting manifest list sha256:b283b22059e5c409e90832250e306b4e0270f3183d757fa9a8b682b870a1a177                                                                                   0.0s
 => => pushing layers                                                                                                                                                                   37.6s
 => => pushing manifest for docker.io/edwardrg/teslo-shop-nr:1.0.0@sha256:b283b22059e5c409e90832250e306b4e0270f3183d757fa9a8b682b870a1a177                                               3.5s
 => [auth] edwardrg/teslo-shop-nr:pull,push token for registry-1.docker.io                                                                                                               0.0s

View build details: docker-desktop://dashboard/build/container-builder/container-builder0/xhl0e95rsk9m48oje9glqwxqz

 6 warnings found (use docker --debug to expand):
 - UndefinedVar: Usage of undefined variable '$APP_VERSION' (line 33)
``` 

Hay que hacer enfasis en 2 puntos
1. Se estan construyendo los stages **dev-deps, builder, prod-deps, prod** y no el stage de **dev**

Esto sucede porque al hacer el build de la imagen por defecto docker como tenemos multiples stages contruye solo el ultimo y como el ultimo tiene dependencias de los anteriores entonces por eso contruye todos los anteriores excepto el **dev**

2. En esta parte **UndefinedVar: Usage of undefined variable '$APP_VERSION' (line 33)** esto es porque no estamos pasando la variable de entorno APP_VERSION a nuestra imagen

Para solucionar esto debemos modificar el dockerfile para que reciba mediante argumento la variable y luego tambien cambiaria el comando de la siguiente manera

```bash
# El ultimo stage del dockerfile 
FROM node:19-alpine3.15 as prod
ARG APP_VERSION # <- Aqui esta la variable que recibe la variable de entorno APP_VERSION
EXPOSE 3000
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node","dist/main.js"]

# Y luego para construir la imagen y subirla
docker buildx build --build-arg APP_VERSION=1.0.0  --platform linux/amd64,linux/arm64 -t edwardrg/teslo-shop-nr:latest --push .
``` 

Y ya la podremos verificar en el siguiente [enlace](https://hub.docker.com/repository/docker/edwardrg/teslo-shop-nr/general) ya que subimos 2 tags **latest** y **1.0.0**


## Prueba de nuestra imagen creada 

Primeramente purgaremos las imagenes que tenemos en nuestra maquina actualmente

```bash
docker image prune -a

``` 

En nuestro docker compose yaml que teniamos antes modificaremos
De esta:
```bash
services:

  app:
  
    build:
      context: ./
      target: ${STAGE} # Este es el target que se va usar y lo buscara en nuestro dockerfile
      dockerfile: Dockerfile # Aqui podemos indicar el dockerfile que vamos a usar podria ser otro nombre depende de lo que queramos
    volumes:
      - .:/app/      
      - /app/node_modules # Este seria el mapeo adicional que en caso que no tengamos el node modules de lado de docker lo mapearemos al nuestro
    # command: npm run start:dev Tambien se podria ejecutar aqui el comando para correr el contenedor 
    container_name: nest-app
    ports:
      - "${PORT}:${PORT}"
    environment:
      APP_VERSION: ${APP_VERSION}
      STAGE: ${STAGE}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USERNAME: ${DB_USERNAME}
      PORT: ${PORT}
      HOST_API: ${HOST_API}
      JWT_SECRET: ${JWT_SECRET}
  
  db:
    image: postgres:16.3-alpine3.20
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: ${DB_NAME}
    volumes:
      - postgres-db:/var/lib/postgresql/data


volumes:
  postgres-db:
    external: false
``` 
A esta:
```bash
services:

  app:
    image: edwardrg/teslo-shop-nr:1.0.0
    container_name: nest-app
    depends_on:
      - db
    restart: always
    ports:
      - "${PORT}:${PORT}"
    environment:
      APP_VERSION: ${APP_VERSION}
      STAGE: ${STAGE}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USERNAME: ${DB_USERNAME}
      PORT: ${PORT}
      HOST_API: ${HOST_API}
      JWT_SECRET: ${JWT_SECRET}
  
  db:
    image: postgres:16.3-alpine3.20
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: ${DB_NAME}
    volumes:
      - postgres-db:/var/lib/postgresql/data

volumes:
  postgres-db:
    external: false
``` 

Y si luego ejecutamos 
```bash
docker compose up
``` 

Podremos ver que la imagen se ha construido correctamente e hizo la coneccion con la base de datos y podemos ver la app corriendo en el [puerto 3000](http://localhost:3000) de nuestra maquina

# Prueba de nuestra imagen con una base de datos en **LINEA**

Para esto haremos uso de la pagina **[render.com](https://dashboard.render.com/)** que nos da la posibilidad de crear una base de datos en linea pero solo por 1 dia luego de crearla la instancia de la base de datos se pierde si esque no pagamos un plan. 

> Nota: Esto no es malo ya que como es practica solo probaremos y luego si queremos volver a intentar sera cosa de crear una instancia y cambiar las credenciales en el archivo *.env*

Asi luego de crear nuestra instancia de base de datos postgres y cambiando el archivo *.env* quedara de esta forma:

**.env**
El que teniamos antes:
```bash
APP_VERSION=1.0.1


STAGE=testing

DB_PASSWORD=MySecr3tPassWord@as2
DB_NAME=TesloDB
DB_HOST=TesloDB
DB_PORT=5432
DB_USERNAME=postgres

PORT=3000
HOST_API=http://localhost:3000/api

JWT_SECRET=Est3EsMISE3Dsecreto32scle
``` 
El nuevo con las nuevas credenciales
```bash
APP_VERSION=1.0.1


STAGE=prod

DB_PASSWORD=C8FMhaVbuv1w7zLuGxxY9hGs6a8FczML
DB_NAME=teslodb_yabk
DB_HOST=dpg-d00pvfi4d50c73ciq6r0-a.virginia-postgres.render.com
DB_PORT=5432
DB_USERNAME=teslodb_yabk_user

PORT=3000
HOST_API=http://localhost:3000/api

JWT_SECRET=Est3EsMISE3Dsecreto32scle
``` 

Y como en nuestro archivo **docker-compose.yaml** ya no necesitamos el servicio de base de datos que teniamos antes lo procedemos a remover. Asi de esta forma quedara asi:

Y corremos nuestro yaml nuevamente para probar.

```bash
services:

  app:
    image: edwardrg/teslo-shop-nr:1.0.0
    container_name: nest-app
    restart: always
    ports:
      - "${PORT}:${PORT}"
    environment:
      APP_VERSION: ${APP_VERSION}
      STAGE: ${STAGE}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USERNAME: ${DB_USERNAME}
      PORT: ${PORT}
      HOST_API: ${HOST_API}
      JWT_SECRET: ${JWT_SECRET}
``` 
Pero **OJO** tendremos los siguientes errores:
```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\dockerfile\teslo-shop\teslo-testing> docker compose up --build
[+] Running 1/1
 ✔ Container nest-app  Recreated                                                                                                                                                                                         0.1s 
Attaching to nest-app
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [NestFactory] Starting Nest application...
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [InstanceLoader] AppModule dependencies initialized +68ms
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [InstanceLoader] PassportModule dependencies initialized +0ms                                                                                                          
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [InstanceLoader] CommonModule dependencies initialized +0ms                                                                                                            
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +2ms
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [InstanceLoader] ServeStaticModule dependencies initialized +1ms                                                                                                       
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [InstanceLoader] ConfigModule dependencies initialized +1ms                                                                                                            
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms                                                                                                            
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [InstanceLoader] FilesModule dependencies initialized +1ms
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM     LOG [InstanceLoader] JwtModule dependencies initialized +0ms                                                                                                               
nest-app  | [Nest] 1  - 04/18/2025, 2:05:11 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...                                                                                                     
nest-app  | Error: getaddrinfo ENOTFOUND postgresql://teslodb_yabk_user:C8FMhaVbuv1w7zLuGxxY9hGs6a8FczML@dpg-d00pvfi4d50c73ciq6r0-a.virginia-postgres.render.com/teslodb_yabk                                                 
nest-app  |     at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:107:26)                                                                                                                                              
nest-app  | [Nest] 1  - 04/18/2025, 2:05:14 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (2)...
nest-app  | Error: getaddrinfo ENOTFOUND postgresql://teslodb_yabk_user:C8FMhaVbuv1w7zLuGxxY9hGs6a8FczML@dpg-d00pvfi4d50c73ciq6r0-a.virginia-postgres.render.com/teslodb_yabk
nest-app  |     at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:107:26)                                                                                                                                              
nest-app  | [Nest] 1  - 04/18/2025, 2:05:17 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (3)...                                                                                                     
nest-app  | Error: getaddrinfo ENOTFOUND postgresql://teslodb_yabk_user:C8FMhaVbuv1w7zLuGxxY9hGs6a8FczML@dpg-d00pvfi4d50c73ciq6r0-a.virginia-postgres.render.com/teslodb_yabk
nest-app  |     at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:107:26)   
``` 

Esto es a causa de que nuestro archivo **app.module.ts** no esta corriendo con una configuracion de SSL por lo que esto nos impide contectarnos a la base de datos.
En este momento lo tenemos de esta forma:
```javascript
import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      // ssl: process.env.STAGE === 'prod',
      // extra: {
      //   ssl: process.env.STAGE === 'prod'
      //         ? { rejectUnauthorized: false }
      //         : null,
      // },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ProductsModule,

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    MessagesWsModule,
  ],
})
export class AppModule {}
``` 

LO que haremos es modificar el archivo **app.module.ts** para que lo use el **ssl** y lograr conectarnos con la base de datos en render.com

```bash
import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl:
          process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ProductsModule,

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    MessagesWsModule,
  ],
})
export class AppModule {}

``` 

Luego volveremos a generar la imagen y subirla a docker hub con el siguiente comando

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t edwardrg/teslo-shop-nr:1.1.0 --push .
``` 

Y ya luego utilizaremos esta imagen en nuestro docker compose y veremos que si tenemos conexion

Este seria el archivo **docker-compose.yml**
```bash
APP_VERSION=1.1.0


STAGE=prod

DB_PASSWORD=C8FMhaVbuv1w7zLuGxxY9hGs6a8FczML
DB_NAME=teslodb_yabk
DB_HOST=dpg-d00pvfi4d50c73ciq6r0-a.virginia-postgres.render.com
DB_PORT=5432
DB_USERNAME=teslodb_yabk_user

PORT=3000
HOST_API=http://localhost:3000/api

JWT_SECRET=Est3EsMISE3Dsecreto32scle
``` 

En nuestra consola

```bash
nest-app  | [Nest] 1  - 04/20/2025, 12:03:57 AM     LOG [RoutesResolver] FilesController {/api/files}: +0ms
nest-app  | [Nest] 1  - 04/20/2025, 12:03:57 AM     LOG [RouterExplorer] Mapped {/api/files/product/:imageName, GET} route +0ms
nest-app  | [Nest] 1  - 04/20/2025, 12:03:57 AM     LOG [RouterExplorer] Mapped {/api/files/product, POST} route +0ms
nest-app  | [Nest] 1  - 04/20/2025, 12:03:57 AM     LOG [NestApplication] Nest application successfully started +4ms
nest-app  | [Nest] 1  - 04/20/2025, 12:03:57 AM     LOG [Bootstrap] App running on port 3000
``` 

# Construccion automatica - Github Actions

Para ello usaremos el mismo proyecto de teslo-shop que usamos en el ejercicio anterior y lo que haremos es hacer un commit a la rama **main** y github disparara el pipeline para construir y desplegar la imagen y si se puede lo que haremos es controlar el versionamiento automatico de la imagen.

La url del repositorio que usaremos para crear las acciones sera el siguiente:
[docker-teslo-gh-actions](https://github.com/ignaccio7/docker-teslo-gh-actions) 

Basicamente si el proceso que nosotros hacemos para construir la imagen lo podriamos implementar en un *pipeline*.

Un repositorio en github puede ser privado o publico. En este caso usaremos un repo publico pero como nosotros necesitamos credenciales que puedan ser de produccion o de desarrollo debemos tener la seguridad de no publicar credenciales privadas para el equipo de trabajo. Para ello en github tenemos una seccion de **settings/secrets** donde tenemos para *actions* y ahi podemos crear variables ocultas para nuestro equipo de trabajo y que solo github sepa.

Basicamente necesitaremos variables como ser:

Desde docker hub sacaremos lo siguiente y crearemos variables de secreto para el repositorio **Repository secrets**
1. El nombre de usuario de la organizacion o del propietario del repositorio. esto lo guardaremos como una variable -> esta de nombre **DOCKER_USER**
2. Tambien necesitaremos un password pero para ello crearemos un token de acceso desde docker hub en el siguiente [enlace](https://app.docker.com/settings/personal-access-tokens/create) y guardaremos la variable de nombre **DOCKER_PASSWORD** 

Para esto de las github actions usaremos un workflow preconfigurado que nos permite crear un pipeline con docker ya instalado que si nosotros buscamos **docker image** en las actions de [github](https://github.com/ignaccio7/docker-teslo-gh-actions/actions/new?category=none&query=docker+image) podremos ver una imagen *Docker image* que es la que usaremos y si le damos click en *configure* veremos el siguiente contenido.

```yaml
name: Docker Image CI

on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

jobs:

  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Build the Docker image
      run: docker build . --file Dockerfile --tag my-image-name:$(date +%s)
``` 

En el cual podemos ver que estamos usando una imagen de ubuntu y lo primero que hacemos es clonar nuestro repositorio y luego construir la imagen con el tag que nosotros le indiquemos. Este workflow se encuentra en la carpeta **.github/workflows/<name>.yml** si nosotros comiteamos la imagen predeterminada que estamos usando automaticamente nos creara este workflow y si hacemos este paso como no funcionara a la primera ya que no estamos pasando los valores que requiere fallara por lo cual cancelamos el workflow desde github.

Ya comenzando con nuestro workflow lo primero que podemos probar es clonar nuestro repositorio que ya lo teniamos antes pero adicional a eso como ya tenemos nuestro access token entonces procedemos a hacer login con docker hub y ver en el pipeline de github la salida que el workflow habra sido exitoso.

```bash
name: Docker Image CI

on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

jobs:

  build:

    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository - tomar codigo del repositorio
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - name: Docker login
      env:
        DOCKER_USER: ${{ secrets.DOCKER_USER }}
        DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
      run: |
        echo "Iniciando login el docker hub"
        docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
        echo "Fin del login"
    # - name: Build the Docker image
    #   run: docker build . --file Dockerfile --tag my-image-name:$(date +%s)
``` 

Como podemos construir nuestra imagen con ayuda de github actions y automaticamente luego de hacer un push a nuestro repositorio se subira a nuestro registro de docker hub con el nombre **edwardrg/teslo-shop-gh-actions** y podemos ver en el siguiente [enlace](https://hub.docker.com/repository/docker/edwardrg/teslo-shop-gh-actions/general)

```bash
name: Docker Image CI

on:
  push:
    branches: ['master']
  pull_request:
    branches: ['master']

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository - tomar codigo del repositorio
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - name: Docker login
      env:
        DOCKER_USER: ${{ secrets.DOCKER_USER }}
        DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
      run: |
        echo "Login el docker hub"
        docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
    - name: Build Docker image
      run: |
        docker build -t edwardrg/teslo-shop-gh-actions:0.0.1 .
        docker build -t edwardrg/teslo-shop-gh-actions:latest .
    - name: Push Docker image
      run: |
        docker push edwardrg/teslo-shop-gh-actions:0.0.1
        docker push edwardrg/teslo-shop-gh-actions:latest
    # - name: Build the Docker image
    #   run: docker build . --file Dockerfile --tag my-image-name:$(date +%s)

``` 

Para hacer uso de versionamiento semántico, usaremos de la makertplace de github una accion ya que nos ayuda a crear un tag dependiendo del commit que nosotros hagamos ya sea una majot minor o un patch.
Tambien puede manejar pre-releases o tambien cambiar para configurar que cada commit haga un tag diferente todo eso se puede configurar revisando la documetacion.

La accion es esta: [https://github.com/marketplace/actions/git-semantic-version?version=v5.4.0](https://github.com/marketplace/actions/git-semantic-version?version=v5.4.0)

Adicional a esto lo que nos pide es tener un **tag** en *git* que no se debe confundir con un commit, sino que es mas bien una etiqueta fija que apunta a un commit específico para marcar versiones o hitos importantes en el proyecto. Para ellos lo que haremos es crear un tag de la siguiente manera:

```bash
name: Docker Image CI

on:
  push:
    branches: ['master']
  pull_request:
    branches: ['master']

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository - tomar codigo del repositorio
      uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Git Semantic Version
      uses: PaulHatch/semantic-version@v5.4.0
      with:
        major_pattern: "major:" # hara un nuevo tag major si en el commit colocamos un major:
        minor_pattern: "feat:" # hara un nuevo tag minor si en el commit colocamos un major:
        version_format: "${major}.${minor}.${patch}-prerelease${increment}" # cada commit que hagamos incrementara el increment
      id: version-automatic # este es un id con el que nosotros hacemos referencia a este paso
        
    - name: Docker login
      env:
        DOCKER_USER: ${{ secrets.DOCKER_USER }}
        DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
        NEW_VERSION: ${{ steps.version-automatic.outputs.version }}
      run: |
        echo "Login el docker hub"
        docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
        echo "New version is $NEW_VERSION !!!!!!!!!!!!!!!"
    
#    - name: Build Docker image
#      run: |
#        docker build -t edwardrg/teslo-shop-gh-actions:0.0.1 .
#    - name: Push Docker image
#      run: |
#        docker push edwardrg/teslo-shop-gh-actions:0.0.1
    # - name: Build the Docker image
    #   run: docker build . --file Dockerfile --tag my-image-name:$(date +%s)


``` 

Ahora como conectamos esta version automatica a nuestro docker para que se pushee a nuestro repositorio en docker hub con ese nuevo tag automatico

> Nota: adicionalmente agregaremos el latest estas lineas **docker build -t edwardrg/teslo-shop-gh-actions:latest .** y esta **docker push edwardrg/teslo-shop-gh-actions:latest** para que se cree el latest como nuestro ultimo tag en el repositorio de docker hub

Asi nuestro *yaml* quedaria de la siguiente manera:
```bash
name: Docker Image CI

on:
  push:
    branches: ['master']
  pull_request:
    branches: ['master']

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository - tomar codigo del repositorio
      uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Git Semantic Version
      uses: PaulHatch/semantic-version@v5.4.0
      with:
        major_pattern: "major:" # hara un nuevo tag major si en el commit colocamos un major:
        minor_pattern: "feat:" # hara un nuevo tag minor si en el commit colocamos un major:
        version_format: "${major}.${minor}.${patch}-prerelease${increment}" # cada commit que hagamos incrementara el increment
      id: version-automatic # este es un id con el que nosotros hacemos referencia a este paso
        
    - name: Docker login
      env:
        DOCKER_USER: ${{ secrets.DOCKER_USER }}
        DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
      run: |
        echo "Login el docker hub"
        docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
    
    - name: Build Docker image
      env:
        NEW_VERSION: ${{ steps.version-automatic.outputs.version }} # Adicionalmente añadimos el latest
      run: |
        docker build -t edwardrg/teslo-shop-gh-actions:$NEW_VERSION .
        docker build -t edwardrg/teslo-shop-gh-actions:latest .
    - name: Push Docker image
      env:
        NEW_VERSION: ${{ steps.version-automatic.outputs.version }}
      run: |
        docker push edwardrg/teslo-shop-gh-actions:$NEW_VERSION
        docker push edwardrg/teslo-shop-gh-actions:latest
    # - name: Build the Docker image
    #   run: docker build . --file Dockerfile --tag my-image-name:$(date +%s)

``` 

Y ya si revisamos el [repositorio de docker hub](https://hub.docker.com/repository/docker/edwardrg/teslo-shop-gh-actions/general) veremos que se ha creado tanto el tag **latest** como el tag que se crea de forma automatica que configuramos gracias a la accion de github que estamos utilizando.

# NGINX para nuestros proyectos

Hablando un poco sobre **nginx** lo que hace es servir archivos estáticos y no solo estáticos sino tambien los archivos dinamicos que se encuentren en el directorio el cual revisaremos en la documentacion de docker hub y que se puedan acceder a través de la url **http://localhost/ruta/a/archivo.html**

> Nota: Adicional a esto es un servidor proxy que se encarga de reenviar las peticiones a los servidores o tambien puede trabajar como proxy inverso o tambien como balanceador de carga.

Para ello lo primero que haremos es descargar la imagen desde docker hub [nginx](https://hub.docker.com/_/nginx) y ahi revisando la documentacion el comando que usaremos es el siguiente:

```bash
docker run --name nginx-server -d -p 8080:80 nginx:1.27.5-alpine
``` 

Y automaticamente si vamos a la url **http://localhost:8080** veremos que nos aparece el mensaje **Welcome to nginx!** con su pagina de bienvenida para el usuario.

Yendo un poco mas adelante podemos ver que si nosotros quisieramos exponer alguna web nuestra nos indica que el archivo donde se encuentra el html que nos mostros anteriormente se encuentre en el directorio **/usr/share/nginx/html** y para verlo podemos hacer un **ls** en el directorio y ver que hay un archivo llamado **index.html** que es el que se muestra en la pagina de bienvenida.

Para ingresar a nuestro servidor nginx podemos hacer un **docker exec -it <nombre-contenedor>** y luego podemos ir navegando hasta la url que queramos para ver el archivo buscado.

```bash
docker exec -it nginx-server /bin/sh
``` 

Y si vemos a continuacion todo el proceso que seguimos pues tendremos el siguiente resultado

```bash
Digest: sha256:65645c7bb6a0661892a8b03b89d0743208a18dd2f3f17a54ef4b76fb8e2f2a10
Status: Downloaded newer image for nginx:1.27.5-alpine
017133e356c062cbd6df63016bb54adce134f3a82e70db0e40f8fdaeb5433d2d
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes> docker container ls 
CONTAINER ID   IMAGE                           COMMAND                  CREATED              STATUS              PORTS                      NAMES
017133e356c0   nginx:1.27.5-alpine             "/docker-entrypoint.…"   About a minute ago   Up About a minute   0.0.0.0:8080->80/tcp       nginx-server
df7ae089558b   mongo:8.0.6-noble               "docker-entrypoint.s…"   2 weeks ago          Up 2 minutes        0.0.0.0:27017->27017/tcp   pokedex-db-1
b900bba53237   moby/buildkit:buildx-stable-1   "buildkitd --allow-i…"   2 weeks ago          Up 2 minutes                                   buildx_buildkit_container-builder0
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes> docker exec -it nginx-server /bin/sh 
/ # ls
bin                   home                  proc                  sys
dev                   lib                   root                  tmp
docker-entrypoint.d   media                 run                   usr
docker-entrypoint.sh  mnt                   sbin                  var
etc                   opt                   srv
/ # cd usr/share/nginx/html/
/usr/share/nginx/html # ls
50x.html    index.html
/usr/share/nginx/html # cat index.html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
``` 

Yendo un poco mas adelante revisaremos el archivo de configuracion de nginx que se encuentra en el directorio **/etc/nginx/conf.d/default.conf** y veremos que en este archivo hay una seccion que nos permite configurar que es lo que utilizaremos para nuestro proyecto.
Encontraremos cosas como configuracion de servidor el nombre de servidor los logs de error la locacion del index y otras cosas mas que nos permitiran configurar nuestro servidor nginx para nuestro proyecto.

> Un proxy es un servidor que recibe peticiones de un cliente y las reenvia a un servidor o servidores. Esto es como si el cliente se conectara a varios servidores y cada uno de ellos respondiera a la peticion del cliente. Ejemplo si un cliente x entonces nginx recibe la peticion y reenvia la peticion a otro servidor el cual reponde con la peticion del cliente.

```bash
cd etc/nginx/conf.d/
cat default.conf
``` 

Tendremos el siguiente resultado
```bash
user  nginx; 
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
/etc/nginx/conf.d # ls
default.conf
/etc/nginx/conf.d # cat default.conf
server { # <- configuracion de servidor
    listen       80;  # <- escucha en el puerto 80
    listen  [::]:80; # <-  puerto 80 para cualquier interfaz de red
    server_name  localhost; # <- nombre de servidor

    #access_log  /var/log/nginx/host.access.log  main;

    location / { # <- en la raiz
        root   /usr/share/nginx/html; # <-  localizacion de la pagina de bienvenida
        index  index.html index.htm; # <- archivos que va buscar para servir
    }

    #error_page  404              /404.html;  # <- paginas de error que podemos definir

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html; 
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
``` 

**Listo** ahora para ponerlo en practica usaremos un proyecto que tenemos en la carpeta del repositorio de nombre **react-heroes** que es basicamente una spa que nos permitira configurar nginx para un proyecto realizado en react.

Lo primero que haremos es crear una imagen de nuestro proyecto

Primero crearemos un *.dockerignore* con el siguiente contenido:
```bash
node_modules
.git
dist
``` 
Como segundo paso un **Dockerfile** en el cual nosotros tendremos:
```bash
# este stage es para instalar las dependencias de desarrollo
FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package.json 
RUN npm install --frozen-lockfile

# este para construir el dist de nuestro proyecto
FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# aqui usaremos nginx para desplegar nuestro proyecto
FROM nginx:1.27.5-alpine as server-nginx
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
``` 

> Nota: --frozen-lockfile (o el comando npm ci) asegura que solo se instalen exactamente las versiones fijadas en el lockfile, sin importar el rango en el package.json y sin actualizaciones automáticas

Cosas importantes del **Dockerfile**

En Docker, el contenedor se mantiene activo mientras el proceso principal (PID 1) esté en ejecución. Si Nginx se ejecuta como daemon (por defecto en segundo plano), el proceso principal termina rápidamente y el contenedor se detiene. Al usar daemon off;, Nginx permanece en primer plano (foreground) y mantiene el contenedor activo.

* Sin daemon off;: Nginx se va a segundo plano, el contenedor se apaga.
* Con daemon off;: Nginx se queda en primer plano, el contenedor sigue corriendo y sirviendo nuestra aplicación.

Para correr nuestra imagen
```bash
docker build -t heroes-app . --no-cache
``` 
Y automaticamente tendremos algo parecido a esto
```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\nginx\react-heroes> docker build -t heroes-app . --no-cache
[+] Building 41.2s (17/17) FINISHED                                                docker:desktop-linux
 => [internal] load build definition from Dockerfile                                               0.0s
 => => transferring dockerfile: 604B                                                               0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 2)                     0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 8)                     0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 15)                    0.0s
 => [internal] load metadata for docker.io/library/nginx:1.27.5-alpine                             0.0s
 => [internal] load metadata for docker.io/library/node:19-alpine3.15                              1.5s
 => [auth] library/node:pull token for registry-1.docker.io                                        0.0s
 => [internal] load .dockerignore                                                                  0.0s
 => => transferring context: 64B                                                                   0.0s
 => [server-nginx 1/2] FROM docker.io/library/nginx:1.27.5-alpine@sha256:65645c7bb6a0661892a8b03b  0.8s
 => => resolve docker.io/library/nginx:1.27.5-alpine@sha256:65645c7bb6a0661892a8b03b89d0743208a18  0.7s
 => [internal] load build context                                                                  0.3s
 => => transferring context: 8.50MB                                                                0.3s 
 => [dev-deps 1/4] FROM docker.io/library/node:19-alpine3.15@sha256:12d9c7253f232bb88a9ef6d6e974a  0.0s
 => => resolve docker.io/library/node:19-alpine3.15@sha256:12d9c7253f232bb88a9ef6d6e974afd90e296c  0.0s 
 => CACHED [dev-deps 2/4] WORKDIR /app                                                             0.0s 
 => [dev-deps 3/4] COPY package.json package.json                                                  0.1s 
 => [auth] library/nginx:pull token for registry-1.docker.io                                       0.0s 
 => [dev-deps 4/4] RUN npm install --frozen-lockfile                                              34.6s 
 => [builder 3/5] COPY --from=dev-deps /app/node_modules ./node_modules                            1.2s 
 => [builder 4/5] COPY . .                                                                         0.1s 
 => [builder 5/5] RUN npm run build                                                                2.4s 
 => [server-nginx 2/2] COPY --from=builder /app/dist /usr/share/nginx/html                         0.0s 
 => exporting to image                                                                             0.2s 
 => => exporting layers                                                                            0.1s 
 => => exporting manifest sha256:df8ed28d1ffff2caa6f1ee99c0766723a487910f6b700477251e8adfa9f229e5  0.0s 
 => => exporting config sha256:012f8d3ccdb55f986afd25f4b7f617a0c213160194645cbfec076b3d56d9e10d    0.0s 
 => => exporting attestation manifest sha256:6d97ce641466548f10ede589e8a0188c6743c8a84c6f495e27e9  0.0s 
 => => exporting manifest list sha256:a0d3b34cc0c0ef0bf203cf6588a079c93d603ff146e9d579fbceeb74827  0.0s 
 => => naming to docker.io/library/heroes-app:latest                                               0.0s 
 => => unpacking to docker.io/library/heroes-app:latest                                            0.0s 

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/ub36ej9hpsfimd038qjnoev2e

 3 warnings found (use docker --debug to expand):
 - FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 2)
 - FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 8)
 - FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 15)
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\nginx\react-heroes> docker images
REPOSITORY               TAG               IMAGE ID       CREATED         SIZE
heroes-app               latest            a0d3b34cc0c0   2 minutes ago   73.9MB
``` 

Ahora para correr nuestra imagen
```bash
docker container run -p 80:80 heroes-app
``` 
Y cosa cosa importante veremos que la aplicacion esta funcionando pero estamos en la ruta **http://localhost/login** ahora que pasa si nosotros recargamos la pagina en esa ruta nos saldra un error de **404** asi eso pasa porque no estamos configurando nginx aun. Ya que aunque react tiene su router todas las rutas estan saliendo desde la raiz **http://localhost/** por lo cual debemos hacer mas configuraciones.

Borraremos la imagen previa que construirmos
```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\nginx\react-heroes> docker container ls -a
CONTAINER ID   IMAGE                           COMMAND                  CREATED         STATUS                      PORTS                      NAMES
2bb0433e8425   heroes-app                      "/docker-entrypoint.…"   4 minutes ago   Exited (0) 44 seconds ago                              fervent_ritchie
df7ae089558b   mongo:8.0.6-noble               "docker-entrypoint.s…"   2 weeks ago     Up 55 minutes               0.0.0.0:27017->27017/tcp   pokedex-db-1
b900bba53237   moby/buildkit:buildx-stable-1   "buildkitd --allow-i…"   2 weeks ago     Up 55 minutes                                          buildx_buildkit_container-builder0
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\nginx\react-heroes> docker container rm -f 2bb
2bb
``` 

Bien para arreglar esto cambiaremos la configuracion de nuestro servidor **nginx** para ello haremos una copia del archivo de configuracion del servidor que esta en el directorio **/etc/nginx/conf.d/default.conf** y lo que haremos es copiar el contenido del archivo **default.conf** en un nuevo archivo llamado **nginx.conf** y luego modificaremos el archivo para que lo use nuestro proyecto. Este archivo estara en la ruta de nuestro proyecto **/react-heroes/nginx/nginx.conf**

Basicamente la linea que necesitamos modificar es la siguiente en la parte del location
```bash
try_files $uri $uri/ /index.html;
``` 
Por lo cual nuestro archivo **nginx.conf** quedara de la siguiente manera

```bash
server { # <- configuracion de servidor
    listen       80;  # <- escucha en el puerto 80
    listen  [::]:80; # <-  puerto 80 para cualquier interfaz de red
    server_name  localhost; # <- nombre de servidor

    #access_log  /var/log/nginx/host.access.log  main;

    location / { # <- en la raiz
        root   /usr/share/nginx/html; # <-  localizacion de la pagina de bienvenida
        index  index.html index.htm; # <- archivos que va buscar para servir
        try_files $uri $uri/ /index.html; # !!!!!!!!!aqui es donde le diremos que todas las rutas sean servidas desde la raiz!!!!!!!!!
    }

    #error_page  404              /404.html;  # <- paginas de error que podemos definir

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html; 
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
``` 

Y nuestro **Dockerfile**
```bash
# este stage es para instalar las dependencias de desarrollo
FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package.json 
RUN npm install --frozen-lockfile

# este para construir el dist de nuestro proyecto
FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# aqui usaremos nginx para desplegar nuestro proyecto
FROM nginx:1.27.5-alpine as server-nginx
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/ # Con esta linea estamos copiando nuestro archivo de configuracion nuevo
CMD ["nginx", "-g", "daemon off;"]
``` 

Para hacer correr esta nueva imagen
```bash
docker build -t heroes-app . --no-cache
docker container run -p 80:80 heroes-app
``` 

Y walla imagen corriendo recargando la pagina sin ver el error **404**. Pero una cosa no estamos viendo las iamgenes para ellos haremos lo siguiente ya falta poco.

Como lo tenemos las imaegnes en una carpeta **assets** modificaremos nuestro **Dockerfile**
```bash
# este stage es para instalar las dependencias de desarrollo
FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package.json 
RUN npm install --frozen-lockfile

# este para construir el dist de nuestro proyecto
FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# aqui usaremos nginx para desplegar nuestro proyecto
FROM nginx:1.27.5-alpine as server-nginx
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/
COPY ./assets /usr/share/nginx/html/assets
CMD ["nginx", "-g", "daemon off;"]
``` 

# Kubernetes

Basicamente Kubernetes es un sistema de orquestacion de contenedores que nos permite crear y desplegar nuestros contenedores en un cluster de computadoras. Esto nos permite escalar nuestro aplicacion sin tener que preocuparnos de la cantidad de recursos que necesitamos para ejecutarla.

Lo primero que instalaremos es **minikube** asi lo instalaremos siguiendo los pasos que indican en su [sitio web](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2Fwindows+package+manager)

Nosotros instalaremos minikube en nuestro equipo con WINDOWS usando Winget

Como sabemos que tenemos winget
```bash
PS C:\Users\Pc-s> winget --version
v1.10.390
``` 
Asi lo siguiente que haremos es instalarlo
```bash
winget install Kubernetes.minikube
``` 

Asi luego de que instale lo siguiente que haremos es verificar la variable de entorno y tambien en la consola verificar que minikube este instalado
```bash
PS C:\Users\Pc-s> minikube version
minikube version: v1.35.0
commit: abcdefsasd-dirty
PS C:\Users\Pc-s> echo $Env:Path
``` 

Posterior a eso verificaremos con que driver esta corriendo minikube para crear un cluster estos podrian ser uno de docker o virtual box o cualquier otro que nos permita crear un cluster de kubernetes 

Con este comando veremos que driver esta por defecto y si quisiseramos asignar lo hacemos con set
```bash
PS C:\Users\Pc-s> cat .\.minikube\config\config.json
{
    "driver": "docker"
}

PS C:\Users\Pc-s> minikube config set driver docker # Con este comando asignamos el driver de docker
``` 

Y ya lo siguiente que haremos es:

```bash
minikube start
``` 
Con este comando iniciamos el cluster de kubernetes y podemos ver en nuestro docker desktop como esta corriendo.

Asi tambien para verificar el cluster tenemos los siguientes comandos

```bash
PS C:\Users\Pc-s> minikube status # Para ver el estado del cluster 
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured

PS C:\Users\Pc-s> minikube profile list # Para ver los perfiles que tenemos en nuestro equipo. Podemos tener mas de un perfil osea mas de un cluster
|----------|-----------|---------|--------------|------|---------|--------|-------|----------------|--------------------|
| Profile  | VM Driver | Runtime |      IP      | Port | Version | Status | Nodes | Active Profile | Active Kubecontext |
|----------|-----------|---------|--------------|------|---------|--------|-------|----------------|--------------------|
| minikube | docker    | docker  | 192.168.49.2 | 8443 | v1.32.0 | OK     |     1 | *              | *                  |
|----------|-----------|---------|--------------|------|---------|--------|-------|----------------|--------------------|
``` 

## Configurando una base de datos en POSTGRESQL

Para crear esto haremos uso de un configmap que es un objeto de kubernetes que nos permite almacenar datos en forma de key value.

Si vamos a la siguiente [pagina de de kubernetes](https://kubernetes.io/docs/concepts/configuration/configmap/)  veremos un snippet con una guia para configurar nuestro archivo.

Conceptos importantes:
* **servicios**: Un servicio es un objeto de kubernetes que se utiliza para proporcionar acceso a un conjunto de recursos, como por ejemplo una base de datos o un servicio web. Estos servicios tienen una direccion IP fija y un puerto fijo por el que se pueden acceder a ellos.
* **secretos**: Un secreto es un objeto de kubernetes que se utiliza para almacenar informacion confidencial, como contraseñas o claves de autenticacion.
* **Encode | Decode**: Encode es el proceso de convertir datos de forma segura como por ejemplo una palabra que sea codificada en base64 para que sea transmitida por la red. Decode es el proceso contrario de decodificar la informacion codificada.
* **Deployment**: Un deployment es un objeto de kubernetes que se utiliza para desplegar y actualizar aplicaciones en un cluster de kubernetes. Los deployments se utilizan para crear y mantener una copia de un conjunto de recursos como ser un pod un servicio o un replicaset.

Nuestro archivo de configuracion de postgres **postgres-config.yml** quedara de la siguiente manera
```bash
apiVersion: v1 # <- Version de kubernetes
kind: ConfigMap # <- Tipo de objeto
metadata:
  name: postgres-config # <- Nombre del configmap para los key value pairs
data:
  DB_NAME: postgres # <- Nombre de la base de datos
  DB_HOST: postgres-service # <- Este seria el nombre del servidor donde esta la base de datos
  DB_PORT: "5432" # <- Puerto de la base de datos
``` 

Para nuestro archivo de secretos **postgres-secrets.yml** usaremos un snippet tambien de la [pagina de kubernetes](https://kubernetes.io/docs/concepts/configuration/secret/) adicionalmente tambien crearemos el servicio por debajo y lo separaremos con **---** que basicamente es un separador de objetos es como si nos estariamos creando un archivo separado pero generalmente lo colocan servicio y deployment en el mismo archivo.
Estos servicios gracias a la [siguiente pagina](https://kubernetes.io/docs/concepts/services-networking/service/).

Para transformar nuestras variables que guardaremos en los secrets usaremos la siguiente [pagina para codificar](https://codebeautify.org/base64-encode) y obtendremos el codigo que guardaremos en el secreto.

Y quedara de la siguiente manera (obviamente borrando los comentarios)

```bash
apiVersion: v1
kind: postgres-secrets
metadata:
  name: dotfile-secret
type: Opaque
data:
  DB_USER: cG9zdGdyZXM= # <- postgres 
  DB_PASSWORD: UEBzczEyMzQ1Ng== # <- P@ss123456
``` 

Ya finalizando usaremos un deployment para desplegar nuestro pod que quedara de la siguiente manera gracias a la [documentacion en la pagina](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

Y el archivo quedara asi:
```bash
apiVersion: apps/v1 # <- Nombre de la version
kind: Deployment
metadata: 
  name: postgres-deployment # <- Nombre con el cual lo vamos a identificar
  labels:
    app: postgres # <- Etiquetas que nos ayudaran a identificar
spec:
  replicas: 1 # <- Cuantas copias de ese pod
  selector:
    matchLabels:
      app: postgres # <- Para hacer las conexiones entre si
  template:
    metadata:
      labels:
        app: postgres # <- etiquetas
    spec:
      containers:
      - name: postgres # <- Nombre del  # <- Imagen que se usara
        image: postgres:16.3-alpine3.20 # <- Imagen que se usara
        ports:
        - containerPort: 5432  # <- Puerto que se usara
        env:
        - name: POSTGRES_PASSWORD # <- Nombre de la variable de entorno
          valueFrom:
            secretKeyRef: # <- Tipo de referencia
              name: postgres-secrets # <- Nombre del secreto
              key: DB_PASSWORD # <- Nombre de la variable en el secreto
---
# aqui crearemos el servicio
apiVersion: v1
kind: Service
metadata:
  name: postgres-service # <- Nombre del servicio con el cual se comunicara al cluster
spec:
  selector:
    app.kubernetes.io/name: postgres # <- Este seria un selector que nos ayudara a identificar al pod que queremos comunicar
  ports: # <- Puertos que queremos comunicar
    - protocol: TCP 
      port: 5432 # <- Cualquier puerto que queremos comunicar dentro del cluster
      targetPort: 5432 # <- Puerto del contenedor en el pod

```

## Ahora procederemos a crear y ver corriendo el pod

Para esto haremos uso de 2 comandos primeramente:
* kubectl version -> Esto nos muestra la version de kubernetes que estamos usando
* kubectl get all -> Esto nos muestra todos los objetos que estamos usando (en este caso nos esta mostrando la ip de nuestro cluster)

---
### Cosa importante - que pasa si minikube no esta corriendo

Podria pasar que reiniciamos nuestro computador y al hacer **minikube get all** nos encontrariamos con este mensaje:

```bash
PS C:\Users\Pc-s> kubectl get all
E0524 21:41:27.154171    7152 memcache.go:265] couldn't get current server API group list: Get "https://127.0.0.1:64364/api?timeout=32s": dial tcp 127.0.0.1:64364: connectex: No connection could be made because the target machine actively refused it.
E0524 21:41:27.157502    7152 memcache.go:265] couldn't get current server API group list: Get "https://127.0.0.1:64364/api?timeout=32s": dial tcp 127.0.0.1:64364: connectex: No connection could be made because the target machine actively refused it.
E0524 21:41:27.160118    7152 memcache.go:265] couldn't get current server API group list: Get "https://127.0.0.1:64364/api?timeout=32s": dial tcp 127.0.0.1:64364: connectex: No connection could be made because the target machine actively refused it.
E0524 21:41:27.163209    7152 memcache.go:265] couldn't get current server API group list: Get "https://127.0.0.1:64364/api?timeout=32s": dial tcp 127.0.0.1:64364: connectex: No connection could be made because the target machine actively refused it.
E0524 21:41:27.165779    7152 memcache.go:265] couldn't get current server API group list: Get "https://127.0.0.1:64364/api?timeout=32s": dial tcp 127.0.0.1:64364: connectex: No connection could be made because the target machine actively refused it.
Unable to connect to the server: dial tcp 127.0.0.1:64364: connectex: No connection could be made because the target machine actively refused it.
```

Por lo cual si hacemos un **minikube status**

```bash
type: Control Plane
host: Stopped
kubelet: Stopped
apiserver: Stopped
kubeconfig: Stopped
```

Entonces lo que sigue es iniciar el minikube con el comando:
```bash
minikube start
# y luego veremos
PS C:\Users\Pc-s> minikube status
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured

PS C:\Users\Pc-s>
```

**Esta parte te la puedes saltar si quieres.** Que pasa si nosotros pensamos que como estamos usando el driver de docker entonces no deberiamos tener problemas mas que iniciar el cluster con un **docker container run -d <minikube>** entonces ya esta corriendo. Pues no es del todo asi ya que aunque use el driver no es un contenedor normal que se inicializa y ya esta corriendo perfectamente sino que al ser un cluster de kubernetes debe pasar por varios pasos como inicializar la configuracion, configurar las redes, actualizar el kubeconfig para que se pueda conectar con kubectl y muchos mas pasos por lo cual en resumen.


|Acción|	Resultado|
| -- | -- |
|docker container start minikube	|Solo inicia el contenedor, pero no garantiza que Kubernetes esté funcionando correctamente.|
|minikube start	|Arranca y configura todo el clúster Kubernetes correctamente, incluyendo el contenedor y servicios.|

---

```bash
PS C:\Users\Pc-s> kubectl version
Client Version: v1.30.5
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: v1.32.0
WARNING: version difference between client (1.30) and server (1.32) exceeds the supported minor version skew of +/-1
PS C:\Users\Pc-s> kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   55s
PS C:\Users\Pc-s>
``` 

Ahora como tenemos 3 archivos
1. postgres-config.yml -> Este es nuestro configmap
2. postgres-secrets.yml -> Aqui estan nuestros secrets
3. postgres.yml -> Aqui esta el archivo de despliege con el pod que queremos crear y su servicio

Debemos ir registrando la configuracion de cada uno de nuestros archivos. Es decir ejecutar estos yaml dentro de nuestro cluster.

> NOTA: Tecnicamente no importa el orden segun si esque tenemos dependencias. En el caso del postgres.yml si tenemos usando el postgres-secrets.yml por lo cual iremos registrando por pasos.

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl apply -f .\postgres-config.yml
configmap/postgres-config created
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl apply -f .\postgres-secrets.yml
secret/postgres-secrets created
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl apply -f .\postgres.yml
deployment.apps/postgres-deployment created
service/postgres-service unchanged
``` 

Ahora si volvemos a hacer el get all

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl get all
NAME                                    READY   STATUS              RESTARTS   AGE
pod/postgres-deployment-8685447-6r7sh   0/1     ContainerCreating   0          9s

NAME                       TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/kubernetes         ClusterIP   10.96.0.1       <none>        443/TCP    10m
service/postgres-service   ClusterIP   10.105.70.102   <none>        5432/TCP   2m57s

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/postgres-deployment   0/1     1            0           9s

NAME                                          DESIRED   CURRENT   READY   AGE
replicaset.apps/postgres-deployment-8685447   1         1         0       9s
``` 

Podemos ver que hay estados en los logs que nos muestra  **0/1** esto puede pasar porque la imagen se esta descargando o que se esta configurando u otros motivos. Lo importante esque si volvemos a ver los logs veremos que esta corriendo.

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl get all
NAME                                    READY   STATUS    RESTARTS   AGE
pod/postgres-deployment-8685447-6r7sh   1/1     Running   0          8m22s

NAME                       TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/kubernetes         ClusterIP   10.96.0.1       <none>        443/TCP    19m
service/postgres-service   ClusterIP   10.105.70.102   <none>        5432/TCP   11m

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/postgres-deployment   1/1     1            1           8m22s

NAME                                          DESIRED   CURRENT   READY   AGE
replicaset.apps/postgres-deployment-8685447   1         1         1       8m22s
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo>
``` 

Y ya cosas importantes que podemos ver que esta corriendo correctamente tanto nuestro pod de postgres como su servicio y los archivos de configuracion y secretos que definimos.

Idealmente que pasaria si fallaria y quisieramos ver informacion de ese **deployment** asi ejecutamos lo siguiente.

```bash
kubectl describe deployment.apps/postgres-deployment
``` 

Y tendremos un resultado de este tipo:

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl describe deployment.apps/postgres-deployment
Name:                   postgres-deployment
Namespace:              default
CreationTimestamp:      Wed, 21 May 2025 22:43:43 -0400
Labels:                 app=postgres
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=postgres
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=postgres
  Containers:
   postgres:
    Image:      postgres:16.3-alpine3.20
    Port:       5432/TCP
    Host Port:  0/TCP
    Environment:
      POSTGRES_PASSWORD:  <set to the key 'DB_PASSWORD' in secret 'postgres-secrets'>  Optional: false
    Mounts:               <none>
  Volumes:                <none>
  Node-Selectors:         <none>
  Tolerations:            <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   postgres-deployment-8685447 (1/1 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  10m   deployment-controller  Scaled up replica set postgres-deployment-8685447 from 0 to 1
``` 

Y podemos ver que imagen estamos usando tambien informacion acerca delnro de recplicas si esque estan o no corriendo.

Para ver mas informacion acerca de nuestro pod podemos hacer lo siguiente:

```bash
kubectl logs pod/postgres-deployment-8685447-6r7sh 
``` 

Y nos mostrara un chorizo de informacion en la cual la mas relevante es saber que nuestra base de datos esta corriendo en el puerto X y que ya esta lista para aceptar conexiones.

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl logs pod/postgres-deployment-8685447-6r7sh
The files belonging to this database system will be owned by user "postgres".
This user must also own the server process.

The database cluster will be initialized with locale "en_US.utf8".
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

Data page checksums are disabled.

fixing permissions on existing directory /var/lib/postgresql/data ... ok
creating subdirectories ... ok
selecting dynamic shared memory implementation ... posix
selecting default max_connections ... 100
selecting default shared_buffers ... 128MB
selecting default time zone ... UTC
creating configuration files ... ok
running bootstrap script ... ok
sh: locale: not found
2025-05-22 02:44:00.369 UTC [35] WARNING:  no usable system locales were found
performing post-bootstrap initialization ... ok
initdb: warning: enabling "trust" authentication for local connections
initdb: hint: You can change this by editing pg_hba.conf or using the option -A, or --auth-local and --auth-host, the next time you run initdb.
syncing data to disk ... ok


Success. You can now start the database server using:

    pg_ctl -D /var/lib/postgresql/data -l logfile start

waiting for server to start....2025-05-22 02:44:00.913 UTC [41] LOG:  starting PostgreSQL 16.3 on x86_64-pc-linux-musl, compiled by gcc (Alpine 13.2.1_git20240309) 13.2.1 20240309, 64-bit
2025-05-22 02:44:00.915 UTC [41] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2025-05-22 02:44:00.919 UTC [44] LOG:  database system was shut down at 2025-05-22 02:44:00 UTC
2025-05-22 02:44:00.923 UTC [41] LOG:  database system is ready to accept connections
 done
server started

/usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*

waiting for server to shut down...2025-05-22 02:44:01.012 UTC [41] LOG:  received fast shutdown request
.2025-05-22 02:44:01.013 UTC [41] LOG:  aborting any active transactions
2025-05-22 02:44:01.015 UTC [41] LOG:  background worker "logical replication launcher" (PID 47) exited with exit code 1
2025-05-22 02:44:01.015 UTC [42] LOG:  shutting down
2025-05-22 02:44:01.017 UTC [42] LOG:  checkpoint starting: shutdown immediate
2025-05-22 02:44:01.025 UTC [42] LOG:  checkpoint complete: wrote 3 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.003 s, sync=0.002 s, total=0.010 s; sync files=2, longest=0.001 s, average=0.001 s; distance=0 kB, estimate=0 kB; lsn=0/14EFC28, redo lsn=0/14EFC28
2025-05-22 02:44:01.029 UTC [41] LOG:  database system is shut down
 done
server stopped

PostgreSQL init process complete; ready for start up.

2025-05-22 02:44:01.132 UTC [1] LOG:  starting PostgreSQL 16.3 on x86_64-pc-linux-musl, compiled by gcc (Alpine 13.2.1_git20240309) 13.2.1 20240309, 64-bit
2025-05-22 02:44:01.132 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2025-05-22 02:44:01.132 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2025-05-22 02:44:01.135 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2025-05-22 02:44:01.139 UTC [55] LOG:  database system was shut down at 2025-05-22 02:44:01 UTC
2025-05-22 02:44:01.143 UTC [1] LOG:  database system is ready to accept connections
2025-05-22 02:49:01.396 UTC [53] LOG:  checkpoint starting: time
2025-05-22 02:49:05.551 UTC [53] LOG:  checkpoint complete: wrote 44 buffers (0.3%); 0 WAL file(s) added, 0 removed, 0 recycled; write=4.138 s, sync=0.007 s, total=4.156 s; sync files=11, longest=0.004 s, average=0.001 s; distance=261 kB, estimate=261 kB; lsn=0/15310C8, redo lsn=0/1531090
``` 

## Colocando pgadmin a nuestro deployment para administrar la base de datos

Nos crearemos nuevos secretos para nuestro pgadmin esto lo haremos esta vez con el siguiente comando en nuestra powershell.

> **echo -n algoaqui | base64** -> esto nos permite codificar algo y luego convertirlo a base64

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> echo -n batman@google.com | base64
YmF0bWFuQGdvb2dsZS5jb20NCg==
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> echo -n 123456 | base64
MTIzNDU2DQo=
``` 

Y nuestro archivo de secretos **pg-admin-secrets.yml** quedaria de la siguiente manera:

```bash
apiVersion: v1
kind: Secret
metadata:
  name: pg-admin-secrets
type: Opaque
data:
  PG_USER: YmF0bWFuQGdvb2dsZS5jb20NCg== # batman@google.com
  PG_PASSWORD: MTIzNDU2DQo= # 123456
``` 

Ahora procederemos a crear nuestro deployment que quedara asi:

Algo importante aqui es que usaremos el **NodePort** que nos servira para comunicarnos con nuestro pod osea exponer nuestro pgadmin en nuestra maquina. Si revisamos la [documentacion](https://kubernetes.io/docs/concepts/services-networking/service/) y buscamos lo del NodePort los puertos que podemos exponer los puertos van desde 30000-32767 (el puerto de nodeport tiene que estar entre ese rango ya que si fuera un rango fuera de esos puede ser que esos puertos esten usando por kubernetes). 

```bash
apiVersion: apps/v1 # <- Nombre de la version
kind: Deployment
metadata: 
  name: pg-admin-deployment # <- Nombre con el cual lo vamos a identificar
  labels:
    app: pg-admin # <- Etiquetas que nos ayudaran a identificar
spec:
  replicas: 1 # <- Cuantas copias de ese pod
  selector:
    matchLabels:
      app: pg-admin # <- Para hacer las conexiones entre si
  template:
    metadata:
      labels:
        app: pg-admin # <- etiquetas
    spec:
      containers:
      - name: pg-admin # <- Nombre del  # <- Imagen que se usara
        image: dpage/pgadmin4:8.9 # <- Imagen que se usara
        ports:
        - containerPort: 80  # <- Puerto que se usara
        env:
        - name: PGADMIN_DEFAULT_PASSWORD # <- Nombre de la variable de entorno
          valueFrom:
            secretKeyRef: # <- Tipo de referencia
              name: pg-admin-secrets # <- Nombre del secreto
              key: PG_PASSWORD # <- Nombre de la variable en el secreto
        - name: PGADMIN_DEFAULT_EMAIL # <- Nombre de la variable de entorno
          valueFrom:
            secretKeyRef: # <- Tipo de referencia
              name: pg-admin-secrets # <- Nombre del secreto
              key: PG_USER # <- Nombre de la variable en el secreto
        - name: PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION # Esto por temas de configuracion
          value: "False"
---
# aqui crearemos el servicio
apiVersion: v1
kind: Service
metadata:
  name: pg-admin-service # <- Nombre del servicio con el cual se comunicara al cluster
spec:
  type: NodePort # <- Este nodeport nos servira para la comunicacion externa para exponer el pgadmin y verlo en nuesta maquina
  selector:
    app.kubernetes.io/name: pg-admin # <- Este seria un selector que nos ayudara a identificar al pod que queremos comunicar
  ports: # <- Puertos que queremos comunicar
    - protocol: TCP 
      port: 80 # <- Cualquier puerto que queremos comunicar dentro del cluster
      targetPort: 80 # <- Puerto del contenedor en el pod
      nodePort: 30200 # Puerto que expondra a nuestro equipo

``` 

Ahora para hacer correr nuestro deployment podemos hacer lo siguiente:

* Primero correr nuestros secretos
* Luego correr nuestro deployment y verificar

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl apply -f .\pg-admin-secrets.yml
secret/pg-admin-secrets created
``` 

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl apply -f .\pg-admin.yml
deployment.apps/pg-admin-deployment created
service/pg-admin-service created
``` 

Y si lo revisamos sabemos que tardara en iniciar el pod

```bash
kubectl get all

PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl get all
NAME                                      READY   STATUS              RESTARTS        AGE
pod/pg-admin-deployment-cf946c858-qgr9f   0/1     ContainerCreating   0               3s
pod/postgres-deployment-8685447-6r7sh     1/1     Running             1 (2d23h ago)   3d

NAME                       TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
service/kubernetes         ClusterIP   10.96.0.1        <none>        443/TCP        3d
service/pg-admin-service   NodePort    10.110.160.206   <none>        80:30200/TCP   3s
service/postgres-service   ClusterIP   10.105.70.102    <none>        5432/TCP       3d

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/pg-admin-deployment   0/1     1            0           3s
deployment.apps/postgres-deployment   1/1     1            1           3d

NAME                                            DESIRED   CURRENT   READY   AGE
replicaset.apps/pg-admin-deployment-cf946c858   1         1         0       3s
replicaset.apps/postgres-deployment-8685447     1         1         1       3d
``` 
Podemos ver que en el estado de nuestro pod esta todavia creando el container y que todavia no esta corriendo.
Para darle seguimiento hacemos lo siguiente:

```bash
kubectl describe deployment.apps/pg-admin-deployment

PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl describe deployment.apps/pg-admin-deployment
Name:                   pg-admin-deployment
Namespace:              default
CreationTimestamp:      Sat, 24 May 2025 22:54:58 -0400
Labels:                 app=pg-admin
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=pg-admin
Replicas:               1 desired | 1 updated | 1 total | 0 available | 1 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=pg-admin
  Containers:
   pg-admin:
    Image:      dpage/pgadmin4:8.9
    Port:       80/TCP
    Host Port:  0/TCP
    Environment:
      PGADMIN_DEFAULT_PASSWORD:                   <set to the key 'PG_PASSWORD' in secret 'pg-admin-secrets'>  Optional: false
      PGADMIN_DEFAULT_EMAIL:                      <set to the key 'PG_USER' in secret 'pg-admin-secrets'>      Optional: false
      PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION:  false
    Mounts:                                       <none>
  Volumes:                                        <none>
  Node-Selectors:                                 <none>
  Tolerations:                                    <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      False   MinimumReplicasUnavailable
  Progressing    True    ReplicaSetUpdated
OldReplicaSets:  <none>
NewReplicaSet:   pg-admin-deployment-cf946c858 (1/1 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  3m48s  deployment-controller  Scaled up replica set pg-admin-deployment-cf946c858 from 0 to 1
``` 

Ahi podemos ver que el pod reconocio las variables secretas que creamos anteriormente y que en el estado las replicas estan en 0 y 1. 
Si volvemos a intentar hacer un **get all**

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl get all
NAME                                      READY   STATUS             RESTARTS        AGE
pod/pg-admin-deployment-cf946c858-qgr9f   0/1     CrashLoopBackOff   5 (84s ago)     4m50s
pod/postgres-deployment-8685447-6r7sh     1/1     Running            1 (2d23h ago)   3d

NAME                       TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
service/kubernetes         ClusterIP   10.96.0.1        <none>        443/TCP        3d
service/pg-admin-service   NodePort    10.110.160.206   <none>        80:30200/TCP   4m50s
service/postgres-service   ClusterIP   10.105.70.102    <none>        5432/TCP       3d

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/pg-admin-deployment   0/1     1            0           4m50s
deployment.apps/postgres-deployment   1/1     1            1           3d

NAME                                            DESIRED   CURRENT   READY   AGE
replicaset.apps/pg-admin-deployment-cf946c858   1         1         0       4m50s
replicaset.apps/postgres-deployment-8685447     1         1         1       3d
``` 

Ahi podemos ver **CrashLoopBackOff** lo que indica que el pod no esta corriendo y que no podemos ver nada en el puerto 80 que estaria exponiendo el pgadmin.
Ahora para debbugearlo podemos ver los **logs** de nuestro pod para ver que paso.
Asi usamos **kubectl logs pod/pg-admin-deployment-cf946c858-qgr9f**

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl logs pod/pg-admin-deployment-cf946c858-qgr9f
'batman@google.com
' does not appear to be a valid email address. Please reset the PGADMIN_DEFAULT_EMAIL environment variable and try again.
``` 

Sorpresa sorpresa nuestas variables que definimos en el secreto estan definidas mal y las tenemos que arreglar.
Deberian ser asi:

Una cosa que notamos fue que la codificacion que hicimos estaba mal ya que al ser en powershell este agrega un salto de linea y eso afectaba a la codificacion por lo cual usamos una terminal de linux. y cambiamos el correo

```bash
Pc-s@DESKTOP-1M952EM MINGW64 ~/Desktop/EQUIPO/NAXO/PRACTICAS/DockerApuntes (master)
$ echo -n "ignaccio7@gmail.com" | base64
aWduYWNjaW83QGdtYWlsLmNvbQ==
``` 

```bash
apiVersion: v1
kind: Secret
metadata:
  name: pg-admin-secrets
type: Opaque
data:
  PGADMIN_DEFAULT_EMAIL: aWduYWNjaW83QGdtYWlsLmNvbQ== # <- Aqui cambiamos esta por ignaccio7@gmail.com
  PGADMIN_DEFAULT_PASSWORD: MTIzNDU2 # <- Aqui codificamos la misma contraseña pero en una terminal linux (123456)
``` 

Y en nuestro archivo **pg-admin.yml** haremos esto.

```bash
apiVersion: apps/v1 # <- Nombre de la version
kind: Deployment
metadata: 
  name: pg-admin-deployment # <- Nombre con el cual lo vamos a identificar
  labels:
    app: pg-admin # <- Etiquetas que nos ayudaran a identificar (como podria ser el caso de service se vincula con esto en el selector)
spec:
  replicas: 1 # <- Cuantas copias de ese pod
  selector:
    matchLabels:
      app: pg-admin # <- Para hacer las conexiones entre si
  template:
    metadata:
      labels:
        app: pg-admin # <- etiquetas
    spec:
      containers:
      - name: pg-admin # <- Nombre del  # <- Imagen que se usara
        image: dpage/pgadmin4:8.9 # <- Imagen que se usara
        ports:
        - containerPort: 80  # <- Puerto que se usara
        env:
        - name: PGADMIN_DEFAULT_EMAIL # <- Nombre de la variable de entorno
          valueFrom:
            secretKeyRef: # <- Tipo de referencia
              name: pg-admin-secrets # <- Nombre del secreto
              key: PGADMIN_DEFAULT_EMAIL # <- Nombre de la variable en el secreto
        - name: PGADMIN_DEFAULT_PASSWORD # <- Nombre de la variable de entorno
          valueFrom:
            secretKeyRef: # <- Tipo de referencia
              name: pg-admin-secrets # <- Nombre del secreto
              key: PGADMIN_DEFAULT_PASSWORD # <- Nombre de la variable en el secreto
        - name: PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION # Esto por temas de configuracion
          value: "False"
---
# aqui crearemos el servicio
apiVersion: v1
kind: Service
metadata:
  name: pg-admin-service # <- Nombre del servicio con el cual se comunicara al cluster
spec:
  type: NodePort # <- Este nodeport nos servira para la comunicacion externa para exponer el pgadmin y verlo en nuesta maquina
  selector:
    app: pg-admin # <- Este seria un selector que nos ayudara a identificar al pod que queremos comunicar
  ports: # <- Puertos que queremos comunicar
    - protocol: TCP 
      port: 80 # <- Cualquier puerto que queremos comunicar dentro del cluster
      targetPort: 80 # <- Puerto del contenedor en el pod
      nodePort: 30200 # Puerto que expondra a nuestro equipo
``` 

Luego volvemos a ejecutar los comandos anteriores y veremos que nuestro pod ya esta corriendo

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl apply -f .\pg-admin-secrets.yml
secret/pg-admin-secrets configured
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl apply -f .\pg-admin.yml
deployment.apps/pg-admin-deployment unchanged
service/pg-admin-service unchanged
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl get all
NAME                                       READY   STATUS        RESTARTS      AGE
pod/pg-admin-deployment-85799ffd77-bpbdc   1/1     Running       2 (15s ago)   16s
pod/pg-admin-deployment-89b4757fb-jzfg7    0/1     Terminating   2             16s
pod/postgres-deployment-8685447-6r7sh      1/1     Running       2 (17h ago)   3d17h

NAME                       TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
service/kubernetes         ClusterIP   10.96.0.1        <none>        443/TCP        3d18h
service/pg-admin-service   NodePort    10.110.160.206   <none>        80:30200/TCP   17h
service/postgres-service   ClusterIP   10.105.70.102    <none>        5432/TCP       3d17h

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/pg-admin-deployment   1/1     1            1           17h
deployment.apps/postgres-deployment   1/1     1            1           3d17h

NAME                                             DESIRED   CURRENT   READY   AGE
replicaset.apps/pg-admin-deployment-5956cb8997   0         0         0       17m
replicaset.apps/pg-admin-deployment-69b5d7dcc8   0         0         0       17h
replicaset.apps/pg-admin-deployment-85799ffd77   1         1         1       5m52s
replicaset.apps/pg-admin-deployment-89b4757fb    0         0         0       9m1s
replicaset.apps/pg-admin-deployment-cf946c858    0         0         0       17h
replicaset.apps/postgres-deployment-8685447      1         1         1       3d17h
``` 

Recuerda que debemos esperar un momento para que el pod se cree y luego podemos ver que esta corriendo

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl get all
NAME                                       READY   STATUS    RESTARTS        AGE
pod/pg-admin-deployment-85799ffd77-bpbdc   1/1     Running   2 (9m50s ago)   9m51s
pod/postgres-deployment-8685447-6r7sh      1/1     Running   2 (17h ago)     3d18h

NAME                       TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
service/kubernetes         ClusterIP   10.96.0.1        <none>        443/TCP        3d18h
service/pg-admin-service   NodePort    10.110.160.206   <none>        80:30200/TCP   17h
service/postgres-service   ClusterIP   10.105.70.102    <none>        5432/TCP       3d18h

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/pg-admin-deployment   1/1     1            1           17h
deployment.apps/postgres-deployment   1/1     1            1           3d18h

NAME                                             DESIRED   CURRENT   READY   AGE
replicaset.apps/pg-admin-deployment-5956cb8997   0         0         0       27m
replicaset.apps/pg-admin-deployment-69b5d7dcc8   0         0         0       17h
replicaset.apps/pg-admin-deployment-85799ffd77   1         1         1       15m
replicaset.apps/pg-admin-deployment-89b4757fb    0         0         0       18m
replicaset.apps/pg-admin-deployment-cf946c858    0         0         0       17h
replicaset.apps/postgres-deployment-8685447      1         1         1       3d18h
``` 

Podemos ver muchas replicas de nuestro pod y es porque tuvimos problemas al crear el pgadmin por lo cual eliminaremos esas que no nos sirven pero lo veremos en el siguiente subtitulo

#### ¿Qué está pasando?
Cada vez que hacemos algo como:

```bash
kubectl apply -f pgadmin-deployment.yaml
```
Y e
se archivo tiene algún cambio en el Deployment, Kubernetes:
* Crea un nuevo ReplicaSet con un hash diferente (como 85799ffd77, 89b4757fb, etc.).
* Escala el nuevo ReplicaSet a 1 (o lo que diga tu replicas:).
* Escala los anteriores a 0, pero no los elimina.

### Ahora que cosas hicimos para que nuestro pod se cree y se ejecute

Tuvimos varios errores de configuracion por lo cual resaltaremos los comandos mas importantes que usamos

---

### `kubectl delete pod -l app=pg-admin`

Esto **elimina los Pods actuales** directamente, pero **no toca el Deployment ni el ReplicaSet**. ¿Qué pasa después?

* El **ReplicaSet detecta** que ya no hay ningún Pod.
* Entonces **vuelve a crear el Pod automáticamente** para cumplir con la cantidad deseada (por ejemplo, 1 réplica).
* Este comando es útil si queremos **reiniciar** el contenedor (por ejemplo, después de cambiar una `Secret` o una `ConfigMap` montada).

✅ **Es seguro para reiniciar**
❌ **No elimina residuos ni versiones antiguas**

---

### 🔹 `kubectl delete replicaset.apps/<nombre-del-replicaset>`

Esto **elimina un ReplicaSet viejo** (es decir, una versión anterior de tu Deployment), que normalmente tiene **0 Pods activos**.

* No afecta el funcionamiento actual si eliminas los ReplicaSets **que ya están escalados a 0**.
* Esto **libera recursos y limpia** el historial innecesario.
* Solo hacerlo si estamos seguros de que **no necesitamos hacer rollback a esas versiones anteriores** del Deployment.

✅ **Limpia versiones antiguas**
❌ **No debe usarse sobre la versión actual (con Pods activos)**

---

### En resumen:

| Comando                              | Qué hace                                            | Cuándo usarlo                |
| ------------------------------------ | --------------------------------------------------- | ---------------------------- |
| `kubectl delete pod -l app=pg-admin` | Elimina el Pod actual, pero el ReplicaSet lo recrea | Para reiniciar el contenedor |
| `kubectl delete replicaset <nombre>` | Elimina un ReplicaSet viejo (sin Pods activos)      | Para limpiar historial viejo |

Para eliminar todas esas replicas podemos hacer lo siguiente:

```bash
kubectl delete replicaset.apps/pg-admin-deployment-5956cb8997
kubectl delete replicaset.apps/pg-admin-deployment-69b5d7dcc8
kubectl delete replicaset.apps/pg-admin-deployment-89b4757fb
kubectl delete replicaset.apps/pg-admin-deployment-cf946c858
``` 

o

```bash
kubectl delete replicaset -l app=pg-admin
# y verificamos luego con get all para verificar que siga corriendo correctamente
kubectl get all
``` 

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl delete replicaset -l app=pg-admin
replicaset.apps "pg-admin-deployment-5956cb8997" deleted
replicaset.apps "pg-admin-deployment-69b5d7dcc8" deleted
replicaset.apps "pg-admin-deployment-85799ffd77" deleted
replicaset.apps "pg-admin-deployment-89b4757fb" deleted
replicaset.apps "pg-admin-deployment-cf946c858" deleted
```

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl get all
NAME                                       READY   STATUS    RESTARTS      AGE
pod/pg-admin-deployment-85799ffd77-jd4z9   1/1     Running   0             3m35s
pod/postgres-deployment-8685447-6r7sh      1/1     Running   2 (18h ago)   3d18h

NAME                       TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
service/kubernetes         ClusterIP   10.96.0.1        <none>        443/TCP        3d18h
service/pg-admin-service   NodePort    10.110.160.206   <none>        80:30200/TCP   18h
service/postgres-service   ClusterIP   10.105.70.102    <none>        5432/TCP       3d18h

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/pg-admin-deployment   1/1     1            1           18h
deployment.apps/postgres-deployment   1/1     1            1           3d18h

NAME                                             DESIRED   CURRENT   READY   AGE
replicaset.apps/pg-admin-deployment-85799ffd77   1         1         1       3m36s
replicaset.apps/postgres-deployment-8685447      1         1         1       3d18h
```

> Nota: Si te preguntas que es ese **-l** basicamente seria un selector de tipo label selector que permite seleccionar recursos por etiquetas para aplicar la acción de eliminación a todos los pods que coincidan con esa etiqueta, en este caso los pods relacionados con la aplicación "pg-admin"

***Listo***  ahora que lo tenemos corriendo si ingresamos a la url que tenemos en teoria publicado [http://localhost:30200/](http://localhost:30200/) no veremos nada.

### Como lo podemos ver en nuestra maquina local?

Dentro del cluster de kubernetes ya este contenedor esta corriendo y en teoria eso seria todo ya que estara expuesto ahi dentro pero para verlo en nuestra maquina haremos esto:

```bash
minikube service pg-admin-service 
``` 

Y automaticamente nos abrira el navegador con la url que tenemos publicada y en los logs de la consola veremos lo siguiente:

```bash
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> minikube service pg-admin-service
|-----------|------------------|-------------|---------------------------|
| NAMESPACE |       NAME       | TARGET PORT |            URL            |
|-----------|------------------|-------------|---------------------------|
| default   | pg-admin-service |          80 | http://192.168.49.2:30200 |
|-----------|------------------|-------------|---------------------------|
* Starting tunnel for service pg-admin-service.
|-----------|------------------|-------------|------------------------|
| NAMESPACE |       NAME       | TARGET PORT |          URL           |
|-----------|------------------|-------------|------------------------|
| default   | pg-admin-service |             | http://127.0.0.1:58547 |
|-----------|------------------|-------------|------------------------|
* Opening service default/pg-admin-service in default browser...
! Porque estás usando controlador Docker en windows, la terminal debe abrirse para ejecutarlo.
``` 

Y para ingresar colocamos nuestras credenciales.

```bash
email: ignaccio7@gmail.com
password: 123456
``` 

Si queremos ver que se configuro bien el pgadmin podemos hacer lo siguiente:

```bash
kubectl exec -it <nombre-del-pod> -- env | grep PGADMIN

PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl get all
NAME                                       READY   STATUS    RESTARTS      AGE
pod/pg-admin-deployment-85799ffd77-jd4z9   1/1     Running   0             100m
pod/postgres-deployment-8685447-6r7sh      1/1     Running   2 (19h ago)   3d20h

NAME                       TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
service/kubernetes         ClusterIP   10.96.0.1        <none>        443/TCP        3d20h
service/pg-admin-service   NodePort    10.110.160.206   <none>        80:30200/TCP   20h
service/postgres-service   ClusterIP   10.105.70.102    <none>        5432/TCP       3d20h

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/pg-admin-deployment   1/1     1            1           20h
deployment.apps/postgres-deployment   1/1     1            1           3d20h

NAME                                             DESIRED   CURRENT   READY   AGE
replicaset.apps/pg-admin-deployment-85799ffd77   1         1         1       100m
replicaset.apps/postgres-deployment-8685447      1         1         1       3d20h
PS C:\Users\Pc-s\Desktop\EQUIPO\NAXO\PRACTICAS\DockerApuntes\clases\k8s-teslo> kubectl exec -it pod/pg-admin-deployment-85799ffd77-jd4z9 -- env | grep PGADMIN
PGADMIN_DEFAULT_EMAIL=ignaccio7@gmail.com
PGADMIN_DEFAULT_PASSWORD=123456
PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION=False
``` 

Y si en caso tuvieramos errores de credenciales que no acepta correctamente lo primero que podemos hacer es reiniciar el pod y probar nuevamente. (En caso de que no funcione ya es cosa de ir revisando el deployment el servicio los secretos los logs cosas asi)

```bash
kubectl delete pod -l app=pg-admin
``` 

### Muy importante. Fallamos en la configuracion del **postgres.yml**

El archivo correcto es este:

```bash
apiVersion: apps/v1 # <- Nombre de la version
kind: Deployment
metadata: 
  name: postgres-deployment # <- Nombre con el cual lo vamos a identificar
  labels:
    app: postgres # <- Etiquetas que nos ayudaran a identificar
spec:
  replicas: 1 # <- Cuantas copias de ese pod
  selector:
    matchLabels:
      app: postgres # <- Para hacer las conexiones entre si
  template:
    metadata:
      labels:
        app: postgres # <- etiquetas
    spec:
      containers:
      - name: postgres # <- Nombre del  # <- Imagen que se usara
        image: postgres:16.3-alpine3.20 # <- Imagen que se usara
        ports:
        - containerPort: 5432  # <- Puerto que se usara
        env:
        - name: POSTGRES_PASSWORD # <- Nombre de la variable de entorno
          valueFrom:
            secretKeyRef: # <- Tipo de referencia
              name: postgres-secrets # <- Nombre del secreto
              key: DB_PASSWORD # <- Nombre de la variable en el secreto
---
# aqui crearemos el servicio
apiVersion: v1
kind: Service
metadata:
  name: postgres-service # <- Nombre del servicio con el cual se comunicara al cluster
spec:
  selector:
    app: postgres # <- Este seria un selector que nos ayudara a identificar al pod que queremos comunicar
  ports: # <- Puertos que queremos comunicar
    - protocol: TCP 
      port: 5432 # <- Cualquier puerto que queremos comunicar 
      targetPort: 5432 # <- Puerto del contenedor
``` 

Lo que cambiamos fue:
```bash
# ESTO
selector:
    app.kubernetes.io/name: postgres
# POR ESTO
selector:
    app: postgres
``` 

Y ya podremos conectarnos desde pgadmin con el usuario postgres y la contraseña que tenemos en el secreto. Porque estaba fallando? pues fue el nombre del **selector** tenia que ser el mismo que nosotros definimos en el **label** del **deployment**.

```bash
1111111111111111111111111111111111
11
``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 


```bash

``` 





## APARTE

Para ejecutar una base de datos sqlserver en docker lo hicimos de esta [pagina](https://hub.docker.com/r/microsoft/mssql-server) con el siguiente comando descargamos la imagen

```bash
docker pull mcr.microsoft.com/mssql/server
``` 
Y para ejecutar la image utilizamos el siguiente comando
```bash
> docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong#Password" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
```

El username es **sa** y la contraseña es **yourStrong#Password**


``` 
```bash

``` 
```bash

``` 
```bash

``` 

```bash

``` 
```bash

``` 
```bash

``` 
```bash

``` 
```bash

``` 

```bash

``` 
```bash

``` 
```bash

``` 
```bash

``` 
```bash

``` 

```bash

``` 
```bash

``` 
```bash

``` 
```bash

``` 
```bash

``` 