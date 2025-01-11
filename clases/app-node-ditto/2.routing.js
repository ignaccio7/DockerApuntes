const http = require('node:http')

// https://developer.mozilla.org/es/docs/Web/HTTP/Methods

// En CommonJS puedes importar json automaticamente
// https://pokeapi.co/
// https://pokeapi.co/api/v2/pokemon/ditto
const dittoJSON = require('./ditto.json')

const processRequest = (request, response) => {
  const { method, url } = request

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          // response.setHeader('Content-type', 'text/html; charset=utf-8')
          // return response.end('<h1>Mi página</h1>')
          response.setHeader('Content-type', 'application/json')
          return response.end(JSON.stringify(dittoJSON))
        case '/about':
          response.setHeader('Content-type', 'text/html; charset=utf-8')
          return response.end('<h1>Contacto modificado desde el contenedor</h1>')
        default:
          response.statusCode = 404
          response.setHeader('Content-type', 'text/plain')
          response.end('Página no encontrada')
      }
      break
    case 'POST':
      switch (url) {
        case '/pokemon/ditto':{
          let body = ''
          // escuchar el evento data --> que es mientras esta recibiendo la informacion
          // hay que pensar como si fuera una tuberia y va pasando el agua
          // en este caso el agua es la informacion que estamos enviando en la peticion chunk-->trozo
          request.on('data', (chunk) => {
            body += chunk.toString()
          })
          // cuando sabemos que llego toda la informacion
          request.on('end', () => {
            const data = JSON.parse(body)
            console.log(body)
            console.log(data)
            console.log(JSON.stringify(data))
            // llamariamos a una BD para guardar
            // para ver el funcionamiento enviaremos
            response.writeHead(201, { 'Content-type': 'application/json; charset=utf-8' })
            data.created = Date.now()
            response.end(JSON.stringify(data))
          })
          break
        }
        case '/otro':{
          // colocamos llaves ya que sino nos salta el mensaje que nose pueden declarar dos veces y con las {} creamos un scoope
          const body = ''
          response.end(body)
          break
        }
        default:
          response.statusCode = 404
          response.setHeader('Content-type', 'text/html; charset=utf-8')
          response.end('<h1>Página no encontrada</h1>')
          break
      }
      break
    default:
      break
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log(`Server listening on port http://localhost:${server.address().port}`)
})
