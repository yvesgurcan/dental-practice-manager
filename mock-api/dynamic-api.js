// `node dynamic-api.js` starts the server locally
// `nodemon dynamic-api.js --inspect` facilitates debugging

const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const moment = require('moment')

// note: nested objects in GET/DELETE queries are stringified. use JSON.parse() to convert them back to objects.
server.use(bodyParser.json({extended: true}))
server.use(bodyParser.urlencoded({extended: true}))

// config
const port = 5000
const supportedMethods = ['get','post','put','delete']
const requireAuth = true

// init ids
let clientId = 0
let supportUserId = 0
let userId = 0
let patientId = 0
let appointmentId = 0
let messageId = 0
let shiftId = 0
let operatoryId = 0
let shiftTypeId = 0

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
        address: {
          street: '242 W 14th Ave',
          suite: '#200',
          city: 'Eugene',
          state: 'OR',
          zip: '97401',
        },
        maxUsers: 10,
        maxOperatories: 3,
        scheduleStart: '08:30',
        scheduleEnd: '17:45',
        appointmentLength: 60,
        daysOpen: ['Monday' ,'Tuesday','Wednesday'],
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
        shiftTypes: [
          {
            shiftTypeId: ++shiftTypeId,
            shiftTypeName: 'Treat patients'
          }
        ],
      },
      deleted: false,
    },
    {
      clientId: ++clientId,
      name: 'Natural Dental',
      settings: {
        maxUsers: 5,
        maxOperatories: 1,
        scheduleStart: '06:00',
        scheduleEnd: '16:00',
        appointmentLength: 60,
        daysOpen: ['Tuesday','Wednesday','Friday'],  
      },
      deleted: false,
    },
    {
      clientId: ++clientId,
      name: 'I\'m so alone',
      settings: {
        maxUsers: 1,
        maxOperatories: 1,
        scheduleStart: '09:15',
        scheduleEnd: '15:50',
        appointmentLength: 30,
        daysOpen: ['Monday','Tuesday','Friday'],
        operatories: [
          {
            operatoryId: ++operatoryId,
            name: 'The Room',
            deleted: false,
          },
        ],
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
    {
      userId: ++userId,
      clientId: 3,
      name: "Lonely Guy",
      email: "guy@lonely.com",
      role: "dentist",
      password: "123",
      rate: 99.9,
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
    
    {
      patientId: ++patientId,
      clientId: 1,
      firstName: 'Noah',
      lastName: 'Dinks',
      email: 'noah@dinks.com',
      provider: 'Providence',
      deleted: false,
    },
  ],

  appointments: [
    {
      appointmentId: ++appointmentId,
      patientId: 2,
      clientId: 1,
      operatoryId: 2,
      date: "2018-02-20 08:00",
      duration: 60,
      deleted: false,
    },
    {
      appointmentId: ++appointmentId,
      patientId: 3,
      clientId: 1,
      operatoryId: 1,
      date: "2018-02-19 10:00",
      duration: 40,
      deleted: false,
    },
    {
      appointmentId: ++appointmentId,
      patientId: 1,
      clientId: 1,
      operatoryId: 1,
      date: "2018-02-19 09:00",
      duration: 20,
      deleted: false,
    },
    {
      appointmentId: ++appointmentId,
      patientId: 1,
      clientId: 1,
      operatoryId: 1,
      date: "2018-02-19 09:20",
      duration: 20,
      deleted: false,
    },
    {
      appointmentId: ++appointmentId,
      patientId: 1,
      clientId: 1,
      operatoryId: 1,
      date: "2018-02-19 09:40",
      duration: 20,
      deleted: false,
    },
    {
      appointmentId: ++appointmentId,
      patientId: 3,
      clientId: 1,
      operatoryId: 1,
      date: "2018-02-19 11:00",
      deleted: true,
    },
    {
      appointmentId: ++appointmentId,
      patientId: 4,
      clientId: 1,
      operatoryId: 1,
      date: "2018-02-22 16:30",
      duration: 30,
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
  
  shifts: [
    {
      shiftId: ++shiftId,
      clientId: 1,
      userId: 1,
      shiftTypeId: 1,
      day: '2018-02-23',
      start: "2018-02-23 09:00",
      end: "2018-02-23 12:00",
      submitted: false,
      deleted: false,
    },
    {
      shiftId: ++shiftId,
      clientId: 1,
      userId: 1,
      shiftTypeId: 1,
      day: '2018-02-23',
      start: "2018-02-23 13:00",
      submitted: false,
      deleted: false,
    },
    {
      shiftId: ++shiftId,
      clientId: 1,
      userId: 1,
      shiftTypeId: 1,
      day: '2018-02-26',
      start: "2018-02-26 15:00",
      end: "2018-02-26 15:26",
      submitted: false,
      deleted: false,
    },

    {
      shiftId: ++shiftId,
      clientId: 1,
      userId: 1,
      shiftTypeId: 1,
      day: '2018-03-02',
      start: "2018-03-02 06:56",
      submitted: false,
      deleted: false,
    },
    {
      shiftId: ++shiftId,
      clientId: 1,
      userId: 1,
      shiftTypeId: 1,
      day: '2018-02-26',
      start: "2018-02-26 15:10",
      submitted: false,
      deleted: false,
    },
    {
      shiftId: ++shiftId,
      clientId: 1,
      userId: 1,
      shiftTypeId: 1,
      day: '2018-03-01',
      start: "2018-03-01 19:45",
      submitted: false,
      deleted: false,
    },
  ],

}

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
    if (method === 'get' || method === 'delete') {
      parameters = req.query
    }
    else {
      parameters = req.body
    }
    
    console.log(`\n${Date()} - request: ${method} ${resource}\n`, parameters)

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
    console.log(`\n${Date()} - response:\n`, response)
  })

}

// you can enter endpoints that can be consumed by non-authenticated users (format: 'get /users')
const publicEndpoints = [
  "post /accountRecovery",
]

// you can enter endpoints that are only accessible by supportUsers (format: {endpoint: 'get /clients', supportUserOnly: true})
const specialAuthorizationEndpoints = [
  {endpoint: "post /signIn", supportUserOnly: false},
  {endpoint: "get /clients", supportUserOnly: true},
  {endpoint: "post /clients", supportUserOnly: true},
  {endpoint: "get /users", supportUserOnly: false},
]

// you can enter a generic unauthorized response
const unauthorizedResponse = {
  feedback: {
    message: "Incorrect username or password.",
    status: "unauthorized",  
  }
}

// you can enter a mock authorization function
const authorize = function authorize (req, res, parameters, endpoint) {

  let requestUser = (parameters || {}).user
  if (req.method === 'GET' || req.method === 'DELETE') {
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

// settings
endpointWrapper(
  'get',
  '/settings',
  (req, res, parameters) => {

    const requestUser = JSON.parse(parameters.user)

    const settings = global.clients.filter(client => !client.deleted && client.clientId === requestUser.clientId).map(client => (
      {
        ...client.settings,
      }
    ))

    if (settings.length === 0) {
      return { feedback: {status: 'error', message: 'Your settings could not be found.'} }
    }

    return { settings: settings[0], feedback: {status: 'success'} }
  }
)

endpointWrapper(
  'put',
  '/settings',
  (req, res, parameters) => {

    const settings = global.clients.filter(client => !client.deleted && client.clientId === parameters.user.clientId).map(client => (
      {
        ...client.settings,
      }
    ))

    if (settings.length === 0) {
      return { feedback: {status: 'error', message: 'Your settings could not be found.'} }
    }

    let hideDentistRole = settings.hideDentistRole
    if (parameters.hideDentistRole !== undefined) {
      hideDentistRole = parameters.hideDentistRole


      if (hideDentistRole) {
        global.users = global.users.map(user => {
          if (!user.deleted && user.clientId === parameters.user.clientId && user.role === 'dentist') {
            const updatedUser = {...user, role: 'headHygienist'}
            return updatedUser
          }
          return user
        })
      }
      else {
        global.users = global.users.map(user => {
          if (!user.deleted && user.clientId === parameters.user.clientId && user.role === 'headHygienist') {
            const updatedUser = {...user, role: 'dentist'}
            return updatedUser
          }
          return user
        })      
      }
    }

    const newSettings = {
      ...settings,
      hideDentistRole,
    }

    global.clients = global.clients.map(client => {
      if (client.clientId === parameters.user.clientId) {
        const clientWithNewSettings = {
          ...client,
          settings: newSettings,
        }
        return clientWithNewSettings
      }
      return client
    })

    return { hideDentistRole: newSettings.hideDentistRole, feedback: {status: 'success'} }
  }
)

// users
endpointWrapper(
  "get",
  "/users",
  (req, res, parameters) => {

    const requestUser = JSON.parse(parameters.user)
    const users = global.users.filter(user => !user.deleted && user.clientId === requestUser.clientId)

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
    const userMatch = global.users.filter(user => user.userId === parameters.updateUser.userId)

    if (userMatch.length === 0) {
      return {feedback: {message: "The user could not be found.", status: "error"}}
    }

    const userToUpdate = userMatch[0]


    const settings = global.clients.filter(client => !client.deleted && client.clientId === parameters.user.clientId).map(client => (
      {
        clientId: client.clientId,
        name: client.name,
        maxUsers: client.maxUsers,
      }
    ))

    if (settings.length === 0) {
      return { feedback: {status: 'error', message: 'Your settings could not be found.'} }
    }

    const hideDentistRole = settings[0].hideDentistRole


    if (!hideDentistRole && userToUpdate.role === global.userRoles.dentist.type && parameters.updateUser.role !== global.userRoles.dentist.type) {
      const otherDentists = global.users.filter(user => !user.deleted && user.userId !== userToUpdate.userId && user.role === global.userRoles.dentist.type)

      if (otherDentists.length === 0) {
        return {feedback: {message: `You can not change the role of this user. At least one user must be a ${global.userRoles.dentist.title}.`, status: "validationError"}}

      }

    }

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
    const deleteUser = JSON.parse(parameters.deleteUser)

    const userMatch = global.users.filter(user => user.userId === deleteUser.userId)

    if (userMatch.length === 0) {
      return {feedback: {message: "The user could not be found.", status: "error"}}
    }

    const userToDelete = userMatch[0]

    if (userToDelete.role === global.userRoles.dentist.type) {
      const otherDentists = global.users.filter(user => !user.deleted && user.userId !== userToDelete.userId && user.role === global.userRoles.dentist.type)

      if (otherDentists.length === 0) {
        return {feedback: {message: `You can not delete this user. At least one user must be a ${global.userRoles.dentist.title}.`, status: "validationError"}}

      }

    }

    const deletedUser = {
      ...userToDelete,
      deleted: true,
    }

    global.users = global.users.map(user => {
      if (user.userId === deleteUser.userId) {
        return deletedUser
      }
      return user
    })

    return {feedback: {message: "The user was successfully deleted.", status: "success"}}
  }
)

// schedule
endpointWrapper(
  "get",
  "/schedule",
  (req, res, parameters) => {

    const requestUser = JSON.parse(parameters.user)

    // get appointments of this client
    const appointments = global.appointments.filter(appointment => !appointment.deleted && appointment.clientId === requestUser.clientId)

    // make sure we start the week on Monday
    let weekOf = moment().startOf('week').add(1, 'day').format('YYYY-MM-DD')
    if (parameters.start) {
      weekOf = moment(parameters.start).startOf('week').add(1, 'day').format('YYYY-MM-DD')
    }

    // get appointments of the week
    const filteredAppointments = appointments.filter(appointment => {
      const isAfter = moment(appointment.date).isAfter(moment(weekOf))
      const isBefore = moment(appointment.date).isBefore(moment(weekOf).add(7, 'days'))
      return isAfter && isBefore
    })

    // get patients of this client
    const patients = global.patients.filter(patient => patient.clientId === requestUser.clientId)

    // get operatories of this client
    const client = global.clients.filter(client => client.clientId === requestUser.clientId)
    if (client.length === 0) {
      return { feedback: {status: 'error', message: 'Settings could not be found.'} }
    }

    const operatories = (client[0].settings || {}).operatories

    // augment appointment data with patient data
    const augmentedAppointments = filteredAppointments.map(appointment => {
      const patientData = patients.filter(patient => patient.patientId === appointment.patientId)
      let augmentedAppointment = {...appointment}
      if (patientData.length > 0) {
        augmentedAppointment = {
          ...appointment,
          ... patientData[0],
        }
      }

      const operatoryData = operatories.filter(operatory => appointment.operatoryId === operatory.operatoryId)
      if (operatoryData.length > 0) {
        const { name } = operatoryData[0]
        augmentedAppointment = {
          ...augmentedAppointment,
          ...operatoryData[0],
          operatoryName: name,
        }
      }

      return augmentedAppointment
    })

    let interval = {}

    let weeklySchedule = []
    for (let i = 0; i < 5; i++) {
      const day = moment(weekOf).add(i, 'days')
      const dailyAppointments = augmentedAppointments.filter(appointment => !appointment.deleted && moment(appointment.date).isSame(day, 'day')).sort((a, b) => moment(a.date).isAfter(moment(b.date)) ? 1 : moment(a.date).isBefore(moment(b.date)) ? -1 : 0)

      if (dailyAppointments.length > 0) {
        const earliestDailyStart = moment(dailyAppointments[0].date).format('HH:mm')
        const latestDailyStop = moment(dailyAppointments[dailyAppointments.length - 1].date).add(dailyAppointments[dailyAppointments.length - 1].duration,'minutes').format('HH:mm')

        if (
          !interval.earliestDailyStart
          || interval.earliestDailyStart > earliestDailyStart
        ) {
          interval = {
            ...interval,
            earliestDailyStart,
          }
        }

        if (
          !interval.latestDailyStop
          || interval.latestDailyStop < latestDailyStop
        ) {
          interval = {
            ...interval,
            latestDailyStop,
          }
        }

      }

      weeklySchedule.push({
        date: day,
        appointments: dailyAppointments,
      })

    }

    return {weeklySchedule, weekOf, interval, feedback: {status: "success"}}
  }
)

// appointments
endpointWrapper(
  "get",
  "/appointments",
  (req, res, parameters) => {

    const requestUser = JSON.parse(parameters.user)

    const appointments = global.appointments.filter(appointment => !appointment.deleted && appointment.clientId === requestUser.clientId)
    return {appointments: appointments, feedback: {status: "success"}}
  }
)

// shifts
endpointWrapper(
  'get',
  '/shifts',
  (req, res, parameters) => {

    const requestUser = JSON.parse(parameters.user)

   // get shift types of this client
   const client = global.clients.filter(client => client.clientId === requestUser.clientId)
   if (client.length === 0) {
     return { feedback: {status: 'error', message: 'Settings could not be found.'} }
   }

   const shiftTypes = (client[0].settings || {}).shiftTypes

    const shifts = global.shifts.filter(shift => !shift.deleted && shift.clientId === requestUser.clientId && shift.userId === requestUser.userId && moment(shift.start).isAfter(moment(parameters.day).startOf('day')) && moment(shift.start).isBefore(moment(parameters.day).endOf('day'))).sort((a, b) => moment(a.start).isAfter(moment(b.start)) ? 1 : moment(a.start).isBefore(moment(b.start)) ? -1 : 0)

    const weekOf = moment(parameters.day).startOf('week').add(1, 'day').format('YYYY-MM-DD')

    // get shifts of the week
    const weekShifts = global.shifts.filter(shift => {
      const isAfter = moment(shift.day).isAfter(moment(weekOf)) || moment(shift.day).isSame(moment(weekOf), 'day')
      const isBefore = moment(shift.day).isBefore(moment(weekOf).add(7, 'days')) || moment(shift.day).isSame(moment(weekOf).add(7, 'days'), 'day')
      return !shift.deleted && shift.clientId === requestUser.clientId && shift.userId === requestUser.userId && isAfter && isBefore
    })

    let dailyTotals = []
    for (let i = 0; i < 5; i++) {
      let ongoing = false
      const day = moment(weekOf).add(i, 'days')
      const shiftDurations = weekShifts.filter(shift => !shift.deleted && moment(shift.start).isSame(day, 'day')).map(shift => {
        if (!shift.end) {
          ongoing = true
          if (moment(day).isSame(moment(), 'day')) {
            return moment.duration(moment().diff(moment(shift.start))).asMinutes()
          }
          else {
            return moment.duration(moment(day).endOf('day').diff(moment(shift.start))).asMinutes()
          }
        }
        return moment.duration(moment(shift.end).diff(moment(shift.start))).asMinutes()
      })

      let total = 0
      if (shiftDurations.length > 0) {
        total = shiftDurations.reduce((sum, value) => sum+value)
      }

      dailyTotals.push({
        day: moment(day).format('YYYY-MM-DD'),
        total,
        ongoing,
      })

    }

    return { shifts, dailyTotals, feedback: { status: "success" } }
  }
)

endpointWrapper(
  'post',
  '/shifts',
  (req, res, parameters) => {

    const shiftId = global.shifts.length + 1

    const newShift = {
      shiftId,
      clientId: parameters.user.clientId,
      userId: parameters.user.userId,
      day: parameters.day,
      start: parameters.start,
      end: parameters.end,
    }

    global.shifts = [...global.shifts, newShift]

    console.log(newShift)

    return { shiftId, feedback: { status: 'success'} }

  }
)

endpointWrapper(
  'put',
  '/shifts',
  (req, res, parameters) => {

   // get shift
    const shift = global.shifts.filter(shift => !shift.deleted && shift.clientId === parameters.user.clientId && shift.shiftId === parameters.updateShift.shiftId)

    if (shift.length === 0) {
    return { feedback: { status: 'error', message: 'The shift could not be found.' } }
    }

    const updateShift = {
      ...shift[0],
      ...parameters.updateShift,
    }

    global.shifts = global.shifts.map(shift => {
      if (shift.shiftId === updateShift.shiftId) {
        return updateShift
      }
      return shift
    })

    return { feedback: { status: 'success' } }
  }
)

endpointWrapper(
  'delete',
  '/shifts',
  (req, res, parameters) => {


    const requestShift = JSON.parse(parameters.deleteShift)

    let shiftDeleted = false
    global.shifts = global.shifts.map(shift => {
      let updatedShift = {...shift}
      if (shift.shiftId === requestShift.shiftId) {
        shiftDeleted = true
        updatedShift = {
          ...updatedShift,
          deleted: true,
        }
      }
      return updatedShift
    })

    if (!shiftDeleted) {
      return { feedback: { status: 'error', message: 'The shift could not be found.' } }
    }

    return { feedback: { status: 'success' } }
  }
)

// support
endpointWrapper(
  "get",
  "/clients",
  (req, res, parameters) => {

    const clients = global.clients.filter(client => !client.deleted).map(client => (
      {
        clientId: client.clientId,
        name: client.name,
        ...client.settings,
      }
    ))
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
      name: parameters.newClient.name,
      settings: {
        hideDentistRole: parameters.newClient.hideDentistRole,
        maxUsers: parameters.newClient.maxUsers,
        maxOperatories: parameters.newClient.maxOperatories,
      },
    }

    global.clients.push(newClient)

    return {newClient, feedback: {message: "The client was successfully created.", status: "success"}}
  }
)

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

// forgot password
endpointWrapper(
  "post",
  "/accountRecovery",
  (req, res, parameters, session) => {

    const findUser = global.users.filter((user) => !user.deleted && user.email === parameters.user.email)    

    if (findUser.length === 0) {
      return {feedback: {message: `Invalid user.`, status: "unauthorized"}}
    }

    if (!findUser[0].email) {
      return {feedback: {message: `Please enter the email of the user.`, status: "validationError"}}
    }

    return {feedback: {message: `An email was sent to ${findUser[0].email}.`, status: "success"}}
  }
)

server.listen(port, () => console.log(`\n${Date()} - the API is listening at http://localhost:${port}`))
