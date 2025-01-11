const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 0

const server = http.createServer((request, response) => {
  console.log('Request received', request.url) // asi podremos sacar las url de donde estan haciendo las requests
  // para ver solo 1 peticion podemos entrar al cmd --> curl http://localhost:60647
  // response.end('Hola mundo')

  response.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (request.url === '/') {
    response.statusCode = 200
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    // response.setHeader('Content-Type', 'text/plain; charset=utf-8')
    // response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end('<h1>Bienvenido a mi página de inicio</h1>')
  } else if (request.url === '/contacto') {
    response.statusCode = 200
    // response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end('<h1>Bienvenido a la pagina de contacto</h1>')
  } else if (request.url === '/imagen') {
    // si quisieramos servir una imagen
    fs.readFile('imagen.png', (err, data) => {
      if (err) {
        console.log('Error al leer la imagen')
        response.statusCode = 500
        response.end('<h1>500 Internal Server Error</h1>')
      } else {
        // lo que hacemos con el readFile es que pasamos la imagen a datos binarios y node lo almacenara en un buffer de memoria para tratarlos luego luego estos datos binarios
        // se los enviamos al navegador que hizo la peticion y como en el content type le estamos especificando que es un dato de tipo imagen entonces este lo decodificara y es asi como se muestra
        response.setHeader('Content-Type', 'image/png')
        response.end(data)
        console.log('2do. imagen')
      }
    })
    console.log('1ro. Como sabemos el readFile es un evento asincrono por lo cual no bloqueara el hilo de ejecucion')
  } else {
    response.statusCode = 404
    response.end('<h1>404 Nose encontro la pagina</h1>')
  }
})

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${server.address().port}`)
})

// hay que hacer notar que cuando entramos a la pag web aparecen 2 request 1 la peticion y otro el favicon
//

/**
 *Para que se recargue automaticamente nuestro servidor podemos hacer correr
 node 1.http.js --> node --watch 1.http.js aunque esta en experimental
 sino tambien podemos usar la dependencia nodemon --> npm install nodemon .. es muy configurable porque puedes detectar cambios incluso ficheros que no sean de JS
 aveces te dicen que lo instales de forma global npm install -g nodemon pero no hace falta hacerlo ed forma global
 lo que si deberiamos hacer npm install nodemon -D
 y luego configuramos los scripts --> "dev":"nodemon 1.http.js"
 *
 *STATUS CODE http.cat o en MDN
 100-199 Respuestas informativas
 200-299 Respuestas satisfactorias
 300-399 Redirecciones
 400-499 Errores del cliente
 500-599 Errores del servidor
 */
