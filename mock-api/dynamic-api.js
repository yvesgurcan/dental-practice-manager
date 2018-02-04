// `node dynamic-api.js` starts the server locally

const express = require('express')
const bodyParser = require('body-parser')

const server = express()
const port = 5000
const supportMethods = ["get","post","put","delete"]

global = {
  user: "me",
}

// use endpointWrapper to create a quick mock endpoint
const endpointWrapper = function endpointWrapper (method, resource, body) {
  console.log(`Endpoint: ${method} ${resource}`)  
  if (supportMethods.indexOf(method) === -1) {
    console.error(`Error: Unsupported method '${method}'. The method must be one of the following: '${supportMethods.join('\', \'')}'.`)
    return false
  }

  if (!resource) {
    console.error(`Error: You must enter the name of the resource. If you meant to create a resource at the root of the API, please enter '/'.`)
    return false
  }

  if (!body) {
    console.error(`Warning: The body of the endpoint is not defined. The API will return 'null' when handling requests.`)
  }

  server[method](resource, (req, res) => {
    let query = ""
    if (method === "get") {
      query = JSON.stringify(req.query)
    }
    console.log(`${Date()} - request: ${method} ${resource} ${query}`)

    let response = null
    if (!body) {
      res.send(null)
    }
    else {
      response = body(req, res, server)
      res.send(response)
    }
    console.log(`${Date()} - response: ${JSON.stringify(response)}`)
  })

}

// root
endpointWrapper(
  "post",
  "/users",
  (req, res, server) => {


    // TODO how do I get the body for post requests????

    if (!req.query) return null


    // return req
  }
)

server.listen(port, () => console.log(`${Date()} - the API is listening at http://localhost:${port}`))