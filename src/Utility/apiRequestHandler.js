import api from './../Environment/api'
import axios from 'axios'

const endpoints = {
  internal: api.url,
}

const mockApi = true
if (mockApi) endpoints.internal = "http://localhost:5000"

const shortCircuitApi = false
const shortCircuitNonGetRequests = false

const supportedMethods = ["get","post","put","delete"]

const apiRequestHandler = (
  method,
  resource,
  payload,
  session,
  callback,
  errorCallback,
  api = endpoints.internal
) => {

  if (
    shortCircuitApi
    ||(method !== 'get' && shortCircuitNonGetRequests)
  ) {
    console.error(`The request '${method} /${resource}' has been short-circuited.`)
    return false
  }

  if (!session.supportUser) {
    if (!session.user) {
      if (!payload.login && !payload.email) {
        throw new Error(`You can not make API requests without a user in the session.`)
      }
      else {
        if (payload.login) {
          payload = {user: {...payload.login}}
        }
        else if (payload.email) {
          payload = {user: {email: payload.email}}
        }
      }

    }
    else {
      // integrate user data to the payload
      payload.user = {
        clientId: session.client.clientId,
        userId: session.user.userId,
        email: session.user.email,
        password: session.user.password,
      }
    }
  }
  else {
    payload.user = {
      clientId: session.client ? session.client.clientId : undefined,
      supportUserId: session.supportUser.supportUserId,
      email: session.supportUser.email,
      password: session.supportUser.password,
    }
  }

  console.log(`${api} - ${method} /${resource}`, {request: payload})

  if (!resource && resource !== "") {
    throw new Error(`Resource '${resource}' is not valid. Please enter an empty string if you want to access the root of the API. Endpoint: ${method} ${api}.`)
  }

  if (supportedMethods.indexOf(method) === -1) {
    throw new Error(`Method '${method}' is not supported by the API. The request method must be one of the following: '${supportedMethods.join('\', \'')}'. Endpoint: ${api}/${resource}`)
  }

  axios[method](
      `${api}/${resource}`,
      method !== "get" && method !== "delete" ? {...payload} : {params: payload}
    )
    .then((response) => {
      console.log(`${api} - ${method} /${resource}`, {response: response.data})

      /*
      if (response.data && method === 'get') {
        let debugDataTable = []
        let done = false
        let arrayName = undefined
        Object.keys(response.data).map(key => {
          if (!done) {
            if (key !== 'feedback' && response.data[key].map) {
              arrayName = key
              debugDataTable = response.data[key].map(item => item)
              done = true
              console.log(`${api} - ${method} /${resource} > response: table representation of array '${arrayName}'`)
              console.table(debugDataTable)
            }

          }

          return null
        })
      }
      */

      if (callback) {
        callback(response.data)
      }
    })
    /*
    .catch((error) => {
      if (errorCallback) {
        errorCallback(error.response)
      }
      if (error.response) {
        throw new Error(
          `\nThe server returned an error for ${method} /${resource}.\nStatus code: ${(error.response).status} (${(error.response).statusText}).\nParameters: ${JSON.stringify(error.response.config.params)}`)  
      }
      else {
        throw new Error(
          `\nAn error occurred while processing the response from ${method} /${resource}:\n${error.message}.`
        )
      }
    })
    */

}

export default apiRequestHandler