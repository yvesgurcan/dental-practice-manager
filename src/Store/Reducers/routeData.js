function routeData (state = null, action) {


  switch (action.type) {
    default: {
      break
    }

    case "STORE_ROUTE": {
      let newState = {...state}
      newState = {
        path: action.path,
        url: action.url,
        isExact: action.isExact,
        params: {...action.params},
      }

      return newState
      break
    }

  }

  return state
}

export default routeData