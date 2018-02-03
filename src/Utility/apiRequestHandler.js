// for compatibility reasons, the api config needs to be exported using `require()` instead of `import from`
// this allows to run a mock api outside of the project in dev mode
const internalApiEndpoint = require('./../Environment/api')

const endpoints = {
  internal: internalApiEndpoint.url,
}

const mockApi = true

if (mockApi) endpoints.internal = "http://localhost:5000"

const apiRequestHandler = (
  method,
  resource,
  payload,
  callback,
  api = endpoints.internal
) => {

  console.log({
    method,
    resource,
    payload,
    api,
  })
  
  const response = {client: "Gentle Care", user: {type: "hygienist", id: 888, name: "Ashlee"}}

  if (callback) {
    callback(response)
  }
}

export default apiRequestHandler