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