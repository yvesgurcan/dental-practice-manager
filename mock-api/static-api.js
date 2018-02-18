// `node static-api.js` starts the server locally
// `nodemon static-api.js --inspect` facilitates debugging

const express = require('express');

const server = express()
const port = 5000
const supportMethods = ['get','post','put','delete']

// init ids
let clientId = 0
let supportUserId = 0
let userId = 0
let patientId = 0
let appointmentId = 0
let messageId = 0
let workTimeId = 0
let operatoryId = 0

// you can create a mock database in the form of a JSON object here
global = {
  userRoles: {
    dentist: {
      type: 'dentist',
      title: 'Dentist',
    },
    headHygienist: {
      type: 'headHygienist',
      title: 'Head Hygienist',
    },
    officeManager: {
      type: 'officeManager',
      title: 'Office Manager',
    },
    hygienist: {
      type: 'hygienist',
      title: 'Dental Hygienist',
    },
    assistant: {
      type: 'assistant',
      title: 'Dental Assistant',
    },
    receptionist: {
      type: 'receptionist',
      title: 'Receptionist',
    },
    accountant: {
      type: 'accountant',
      title: 'Accountant',
    },
  },

  clients: [
    {
      clientId: ++clientId,
      name: 'Gentle Care',
      settings: {
        maxUsers: 10,
        scheduleStart: '08:30',
        scheduleEnd: '17:45',
        appointmentLength: 60,
        daysOpen: ['Monday' ,'Wednesday','Friday'],
        hideDentistRole: true,
        timeZone: 'PST',
        operatories: [
          {
            operatoryId: ++operatoryId,
            name: 'Operatory #1',
            deleted: false,
          },
          {
            operatoryId: ++operatoryId,
            name: 'Operatory #2',
            deleted: false,
          },
        ],
      },
      deleted: false,
    },
    {
      clientId: ++clientId,
      name: 'Natural Dental',
      settings: {
        maxUsers: 5,
        scheduleStart: '06:00',
        scheduleEnd: '16:00',
        appointmentLength: 60,
        daysOpen: ['Monday','Tuesday','Wednesday','Thursday','Friday'],  
      },
      deleted: false,
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
    {
      userId: ++userId,
      clientId: 2,
      name: "Mr Dentist",
      email: "manager@natural.com",
      role: "dentist",
      password: "123",
      rate: 21.3,
      deleted: false,
    },
  ],

  patients: [
    {
      patientId: ++patientId,
      clientId: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      provider: "Blue Cross",
      deleted: false,
    },
    {
      patientId: ++patientId,
      clientId: 1,
      firstName: 'Albert',
      lastName: 'Wilson',
      email: 'albert@me.com',
      provider: 'Providence',
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

// use this array to generate the endpoints procedurally
const endpoints = [
  {
    method: 'get',
    resource: '/settings',
    response: {
      message: 'Welcome to the root of the API. Nothing to see here.',
    }
  },

]

endpoints.map(endpoint => endpointWrapper(endpoint.method, endpoint.resource, endpoint.response))

// use endpointWrapper to create a quick endpoint
const endpointWrapper = function endpointWrapper (method, resource, response = null) {
  console.log(`Endpoint: ${method} ${resource}`)  
  if (supportMethods.indexOf(method) === -1) {
    console.error(`Error: Unsupported method '${method}'. The method must be one of the following: '${supportMethods.join('\', \'')}'.`)
    return false
  }

  if (!resource) {
    console.error(`Error: You must enter the name of the resource. If you meant to create a resource at the root of the API, please enter '/'.`)
    return false
  }

  server[method](resource, (req, res) => {
    console.log(`${Date()} - request: ${method} ${resource}`)
    res.send(response)
    console.log(`${Date()} - response: ${JSON.stringify(response)}`)
  })

}

server.listen(port, () => console.log(`${Date()} - the API is listening at http://localhost:${port}`))