import api from './../Environment/api'
import axios from 'axios'

const endpoints = {
  internal: api.url,
}

const mockApi = true
if (mockApi) endpoints.internal = "http://localhost:5000"

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

  if (!session.supportUser) {
    if (!session.user) {
      if (!payload.login) {
        throw new Error(`You can not make API requests without a user in the session.`)
      }
      else {
        payload = {user: {...payload.login}}
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

  console.log("request", {
    method,
    resource,
    payload,
    api,
  })

  if (!resource && resource !== "") {
    throw new Error(`Resource '${resource}' is not valid. Please enter an empty string if you want to access the root of the API. Endpoint: ${method} ${api}.`)
  }

  if (supportedMethods.indexOf(method) === -1) {
    throw new Error(`Method '${method}' is not supported by the API. The request method must be one of the following: '${supportedMethods.join('\', \'')}'. Endpoint: ${api}/${resource}`)
  }

  axios[method](
      `${api}/${resource}`,
      method !== "get" ? {...payload} : {params: payload}
    )
    .then((response) => {
      console.log("response", {
        method,
        resource,
        api,
        responseData: response.data,
      })
      if (callback) {
        callback(response.data)
      }
    })
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
          `\nAn error occurred while requesting ${method} /${resource}:\n${error.message}.\nParameters: ${JSON.stringify(error.config.params)}`
        )
      }
    })

}

export default apiRequestHandler