const endpoints = {
  internal: "",
}

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