// `node dynamic-api.js` starts the server locally
// `nodemon dynamic-api.js --inspect` facilitates debugging

const express = require('express')
const bodyParser = require('body-parser')
const server = express()

// config
const port = 5000
const supportedMethods = ["get","post","put","delete"]
const requireAuth = true

// note: for some reason (probably safer?), nested objects in the body are stringified. you need to call JSON.parse() to parse the nested objects with req.body
server.use(bodyParser.json({extended: true}))
server.use(bodyParser.urlencoded({extended: true}))

// use endpointWrapper to create a quick mock endpoint
const endpointWrapper = function endpointWrapper (method, resource, apiBody) {
  console.log(`Endpoint: ${method} ${resource}`)  
  if (supportedMethods.indexOf(method) === -1) {
    console.error(`Error: Unsupported method '${method}'. The method must be one of the following: '${supportedMethods.join('\', \'')}'.`)
    return false
  }
  else if (!resource) {
    console.error(`Error: You must enter the name of the resource. If you meant to create a resource at the root of the API, please enter '/'.`)
    return false
  }
  else if (!apiBody) {
    console.error(`Warning: The body of the endpoint is not defined. The API will return 'null' when handling requests.`)
  }

  server[method](resource, (req, res) => {
    let parameters = {}
    if (method === "get") {
      parameters = req.query
    }
    else {
      parameters = req.body
    }
    
    console.log(`${Date()} - request: ${method} ${resource}\n`, parameters)

    let authorizationResults = {}
    if (requireAuth) {
      authorizationResults = authorize(req, res, parameters)
      if (!authorizationResults.authorize) {
        console.error(`${Date()} - **unauthorized request**: ${method} ${resource}`, parameters)
        res.send(authorizationResults.response)
        return false
      }
    }

    let response = null
    if (!apiBody) {
      res.send(null)
    }
    else {
      response = apiBody(req, res, parameters, authorizationResults.response)
      res.send(response)
    }
    console.log(`${Date()} - response:\n`, response)
  })

}

// init ids
let clientId = 0
let userId = 0
let patientId = 0
let appointmentId = 0
let messageId = 0
let workTimeId = 0

// you can create a mock database in the form of a JSON object here
global = {

  clients: [
    {
      clientId: ++clientId,
      name: "Gentle Care",
      deleted: false,
    }
  ],

  settings: [
    {
      timeZone: "PST",
      clientId: 1,
      operatories: [
        {
          operatoryId: 1,
          name: "Operatory #1",
          deleted: false,
        },
      ],
    },
  ],

  users: [
    {
      userId: ++userId,
      clientId: 1,
      email: "martin@gentlecare.com",
      password: "123",
      role: "dentist",
      name: "Dr. Martin",
      rate: 110,
      deleted: false,
    },
    {
      userId: ++userId,
      clientId: 1,
      email: "ashlee@gentlecare.com",
      password: "123",
      role: "hygienist",
      name: "Ashlee",
      rate: 38.5,
      deleted: false,
    },
  ],

  patients: [
    {
      patientId: ++patientId,
      clientId: 1,
      firstName: "John",
      lastName: "Doe",
      email: "John@doe.com",
      provider: "Blue Cross",
      deleted: false,
    },
  ],

  appointments: [
    {
      appointmentId: ++appointmentId,
      patientId: 1,
      clientId: 1,
      operatoryId: 1,
      date: "2018-02-04 14:00",
      deleted: false,
    },
  ],
  
  messages: [
    {
      messageId: ++messageId,
      clientId: 1,
      userId: 2,
      message: "Hello!",
    },
  ],
  
  workTimes: [
    {
      workTimeId: ++workTimeId,
      clientId: 1,
      userId: 2,
      start: "2018-02-04 09:00",
      end: "2018-02-04 12:00",
      deleted: false,
    },
  ],

}

// generic unauthorized response
const unauthorizedResponse = {
  feedback: {
    message: "Incorrect username or password.",
    status: "unauthorized",  
  }
}

// you can enter a mock authorization function
const authorize = function authorize (req, res, parameters) {

  let requestUser = (parameters || {}).user
  if (req.method === "GET") {
    requestUser = JSON.parse((parameters || {}).user)
  }

  if (!parameters) {
    return {
      authorize: false,
      response: unauthorizedResponse,
    }
  }
  else if (!requestUser) {
    return {
      authorize: false,
      response: unauthorizedResponse,
    }
  }

  const findUser = global.users.filter((user) => !user.deleted && user.email === requestUser.email && user.password === requestUser.password)

  if (findUser.length === 0) {
    return {
      authorize: false,
      response: unauthorizedResponse,
    }
  }

  const findClient = global.clients.filter((client) => !client.deleted && findUser[0].clientId === client.clientId)

  if (findClient.length === 0) {
    return {
      authorize: false,
      response: unauthorizedResponse,
    }
  }

  return {authorize: true, response: {user: findUser[0], client: findClient[0]}}
}

// endpoints

// signIn
endpointWrapper(
  "post",
  "/signIn",
  (req, res, parameters, session) => {

    const publicSession = {
      user: {
        userId: session.user.userId,
        name: session.user.name,
        role: session.user.role,
        email: session.user.email,
        password: session.user.password,
      },
      client: {
        clientId: session.client.clientId,
        name: session.client.name,
      },
    }

    return {session: publicSession, feedback: {status: "success"}}
  }
)


// users
endpointWrapper(
  "get",
  "/users",
  (req, res, parameters) => {

    const requestUser = JSON.parse(parameters.user)
    const users = global.users.filter(user => user.clientId === requestUser.clientId)

    return {users: users, feedback: {status: "success"}}
  }
)

endpointWrapper(
  "post",
  "/users",
  (req, res, parameters) => {

    return global
  }
)

endpointWrapper(
  "put",
  "/users",
  (req, res, parameters) => {

    return global
  }
)

endpointWrapper(
  "delete",
  "/users",
  (req, res, parameters) => {

    return global
  }
)

server.listen(port, () => console.log(`${Date()} - the API is listening at http://localhost:${port}`))