function routeData (state = null, action) {
  let newState = {...state}

  switch (action.type) {
    default: {
      break
    }

    case "STORE_ROUTE": {
      newState = {
        // the exact path that matches the route
        path: action.path,
        // the path (relative URL) of the browser
        pathname: action.pathname,
        // does the url exactly match the route?
        isExact: action.isExact,
        // parameters (IDs and such)
        params: {...action.params},
        hash: action.hash,
        query: action.search,
      }

      break
    }

  }

  return newState
}

export default routeData