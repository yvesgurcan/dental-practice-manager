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
  callback,
  errorCallback,
  api = endpoints.internal
) => {

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
      {params: payload}
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
        errorCallback(error)
      }
      throw new Error(`Oops! The server returned an error for ${method} ${api}/${resource}.\nError details: ${JSON.stringify(error)}`)
    })

}

export default apiRequestHandler