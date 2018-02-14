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
    if (requireAuth && publicEndpoints.indexOf(`${method} ${resource}`) === -1) {
      authorizationResults = authorize(req, res, parameters, {method, resource})
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
let supportUserId = 0
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
    },
    {
      clientId: ++clientId,
      name: "Natural Dental",
      deleted: false,
    },
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

  supportUsers: [
    {
      supportUserId: ++supportUserId,
      name: "Yves",
      email: "gurcan.yves@gmail.com",
      password: "123",
    },
  ],

  users: [
    {
      userId: ++userId,
      clientId: 1,
      name: "Dr. Martin",
      email: "martin@gentlecare.com",
      role: "dentist",
      password: "123",
      rate: 110,
      deleted: false,
    },
    {
      userId: ++userId,
      clientId: 1,
      name: "Ashlee",
      email: "ashlee@gentlecare.com",
      role: "hygienist",
      password: "123",
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

// endpoints that can be consumed by any body
const publicEndpoints = [
  "post /accountRecovery",
]

// endpoints that are only accessible by supportUsers
const specialAuthorizationEndpoints = [
  {endpoint: "post /signIn", supportUserOnly: false},
  {endpoint: "get /clients", supportUserOnly: true},
  {endpoint: "post /clients", supportUserOnly: true},
  {endpoint: "get /users", supportUserOnly: false},
  {endpoint: "post /users", supportUserOnly: true},
]

// generic unauthorized response
const unauthorizedResponse = {
  feedback: {
    message: "Incorrect username or password.",
    status: "unauthorized",  
  }
}

// you can enter a mock authorization function
const authorize = function authorize (req, res, parameters, endpoint) {

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
  
  const resourcesWithSpecialAuth = specialAuthorizationEndpoints.filter(specialAuth => specialAuth.endpoint === `${endpoint.method} ${endpoint.resource}`)
  const resourcesForSupportUsersOnly = resourcesWithSpecialAuth.filter(specialAuth => specialAuth.supportUserOnly)

  let findUser = []
  if (resourcesForSupportUsersOnly.length === 0) {
    findUser = global.users.filter((user) => !user.deleted && user.email === requestUser.email && user.password === requestUser.password)    
  }

  let findSupportUser = []

  if (findUser.length === 0) {

    findSupportUser = global.supportUsers.filter((supportUser) => !supportUser.deleted && supportUser.email === requestUser.email && supportUser.password === requestUser.password)

    if (findSupportUser.length === 0) {
      return {
        authorize: false,
        response: unauthorizedResponse,
      }  
    }
    else {
      return {
        authorize: true,
        response: {supportUser: findSupportUser[0]}
      }
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

    let publicSession = {}
    if (session.supportUser) {
      publicSession = {
        supportUser: {
          supportUserId: session.supportUser.supportUserId,
          name: session.supportUser.name,
          email: session.supportUser.email,
          password: session.supportUser.password,
        },
      }
    }
    else {
      publicSession = {
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
    }

    return {session: publicSession, feedback: {status: "success"}}
  }
)

endpointWrapper(
  "post",
  "/accountRecovery",
  (req, res, parameters, session) => {

    const findUser = global.users.filter((user) => !user.deleted && user.email === parameters.user.email)    

    if (findUser.length === 0) {
      return {feedback: {message: `Invalid username.`, status: "unauthorized"}}
    }

    return {feedback: {message: `An email was sent to ${findUser[0].email}.`, status: "success"}}
  }
)

// support
endpointWrapper(
  "get",
  "/clients",
  (req, res, parameters) => {

    const clients = global.clients.map(client => ({clientId: client.clientId, name: client.name}))
    return {clients: clients, feedback: {status: "success"}}
  }
)

endpointWrapper(
  "post",
  "/clients",
  (req, res, parameters) => {

    if (!parameters.newClient) {
      return {feedback: {message: "Please enter the name of the client.", status: "validationError"}}
    }

    if (!parameters.newClient.name) {
      return {feedback: {message: "Please enter the name of the client.", status: "validationError"}}
    }

    const newClient = {
      clientId: ++global.clients.length,
      ...parameters.newClient,
    }

    global.clients.push(newClient)

    return {newClient, feedback: {message: "The client was successfully created.", status: "success"}}
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

    if (!parameters.newUser) {
      return {feedback: {message: "Please enter the name, email, and role of the user.", status: "validationError"}}
    }

    if (!parameters.newUser.name) {
      return {feedback: {message: "Please enter the name of the user.", status: "validationError"}}
    }

    if (!parameters.newUser.email) {
      return {feedback: {message: "Please enter the email of the user.", status: "validationError"}}
    }

    if (!parameters.newUser.role) {
      return {feedback: {message: "Please enter the role of the user.", status: "validationError"}}
    }

    const newUser = {
      clientId: parameters.user.clientId,
      userId: ++global.users.length,
      password: "123",
      ...parameters.newUser,
    }

    global.users.push(newUser)

    return {newUser, feedback: {message: "The user was successfully created.", status: "success"}}
  }
)

endpointWrapper(
  "put",
  "/users",
  (req, res, parameters) => {

    const userMatch = global.users.filter(user => parameters.updateUser.userId)

    if (userMatch.length === 0) {
      return {feedback: {message: "The user could not be found.", status: "error"}}
    }

    const userToUpdate = userMatch[0]

    const updateUser = {
      ...parameters.updateUser,
      userId: userToUpdate.userId,
      clientId: userToUpdate.clientId,
      password: userToUpdate.password,
      deleted: false,
    }

    global.users = global.users.map(user => {
      if (user.userId === updateUser.userId) {
        return updateUser
      }
      return user
    })

    return {feedback: {message: "The user was successfully updated.", status: "success"}}
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