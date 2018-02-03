// `node mock-api.js` starts the server locally

const express = require('express');

const server = express()
const port = 5000
const supportMethods = ["get","post","put","delete"]

// use this function to create a quick mock resource
const resourceWrapper = function resourceWrapper (method, resource, response = null) {
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

// use this array to generate the endpoints
const endpoints = [
  {
    method: 'get',
    resource: '/',
    response: {
      message: 'Welcome to the root of the API. Nothing to see here.',
    }
  },

]

endpoints.map(endpoint => {
  console.log(`Endpoint: ${endpoint.method} ${endpoint.resource}`)
  return resourceWrapper(endpoint.method, endpoint.resource, endpoint.response)
})

server.listen(port, () => console.log(`${Date()} - the API is listening at http://localhost:${port}`))