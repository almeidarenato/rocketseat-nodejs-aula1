// exemplo utilizando o http
// const http = require("http");
// http
//  .createServer((request, response) => {
//   console.log(request);
//    return response.end("Hello World");
//  })
// .listen(3001);

// --> com express abaixo
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  watch: true,
  autoescape: true,
  express: app
})

// permite lidar com o HTML realizando a leitura do mesmo
// para definir uma rota e um comportamento. O primeiro parametro é uma rota
const logMiddleware = (request, response, next) => {
  console.log(
    `HOST: ${request.headers.host} | URL: ${request.url} | METHOD ${
      request.method
    }`
  )
  // request.appName = "GoNode";
  return next()
}

app.use(express.urlencoded({ extended: false }))
const users = ['Diego Fernandes', 'Robson Marques', 'Cleiton Marques']

app.use(logMiddleware)
app.set('view engine', 'njk')
app.get('/', (request, response) => {
  // console.log(request);
  // return response.send(
  //  `Bem vindo ao ${request.appName} ${request.query.name} de ${
  //    request.query.idade
  //  } anos`);
  return response.render('list', {
    users
  })
})
app.get('/new', (request, response) => {
  return response.render('new')
})
// app.get("/login/:name", (request, response) => {
// console.log(request);
//  return response.send(`Bem vindo ${request.params.name}`);
// return response.json({
// message: request.params.name,
// message2: request.params.name
// });
// });
// para aceitar metodos POST
app.post('/create', (request, response) => {
  // console.log(request.body);
  users.push(request.body.user)
  return response.redirect('/')
})
app.listen(3001)
