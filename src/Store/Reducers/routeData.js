function routeData (state = null, action) {
  let newState = {...state}

  switch (action.type) {
    default: {
      break
    }

    case "STORE_ROUTE": {
      newState = {
        path: action.path,
        url: action.url,
        isExact: action.isExact,
        params: {...action.params},
      }
    }

  }

  return newState
}

export default routeData