// `node dynamic-api.js` starts the server locally

const express = require('express')
const bodyParser = require('body-parser')

const server = express()
const port = 5000
const supportedMethods = ["get","post","put","delete"]

server.use(bodyParser.json())

// use endpointWrapper to create a quick mock endpoint
const endpointWrapper = function endpointWrapper (method, resource, apiBody) {
  console.log(`Endpoint: ${method} ${resource}`)  
  if (supportedMethods.indexOf(method) === -1) {
    console.error(`Error: Unsupported method '${method}'. The method must be one of the following: '${supportedMethods.join('\', \'')}'.`)
    return false
  }

  if (!resource) {
    console.error(`Error: You must enter the name of the resource. If you meant to create a resource at the root of the API, please enter '/'.`)
    return false
  }

  if (!apiBody) {
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
    console.log(`${Date()} - request: ${method} ${resource} ${JSON.stringify(parameters)}`)

    let response = null
    if (!apiBody) {
      res.send(null)
    }
    else {
      response = apiBody(req, res, parameters)
      res.send(response)
    }
    console.log(`${Date()} - response:\n${JSON.stringify(response)}`)
  })

}

// ids
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
      type: "dentist",
      name: "Dr. Martin",
      rate: 110,
      deleted: false,
    },
    {
      userId: ++userId,
      clientId: 1,
      email: "ashlee@gentlecare.com",
      type: "hygienist",
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

// root
endpointWrapper(
  "get",
  "/users",
  (req, res, parameters) => {

    if (!parameters.clientId) return {
      message: "Invalid request.",
      status: "error",
    }

    const users = global.users.filter(user => user.clientId === Number(parameters.clientId))

    return {users: users, status: "success"}
  }
)
endpointWrapper(
  "post",
  "/users",
  (req, res, parameters) => {

    if (!parameters.user) return {
      message: "Invalid request.",
      status: "error",
    }

    return global
  }
)
endpointWrapper(
  "put",
  "/users",
  (req, res, parameters) => {

    if (!parameters.user) return {
      message: "Invalid request.",
      status: "error",
    }

    return global
  }
)
endpointWrapper(
  "delete",
  "/users",
  (req, res, parameters) => {

    if (!parameters.clientId) return {
      message: "Invalid request.",
      status: "error",
    }

    return global
  }
)

server.listen(port, () => console.log(`${Date()} - the API is listening at http://localhost:${port}`))
