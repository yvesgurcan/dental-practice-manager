function support (state = {}, action) {

  let newState = {...state}

  switch (action.type) {
    default: {
      break
    }

    case "STORE_ALL_CLIENTS": {
      newState = {
        ...state,
        clients: action.clients,
      }
      break
    }

    case "USERS_LOADING": {
      newState = {
        ...state,
        loadingUsers: true,
      }

      break
    }

    case "USERS_LOADED": {
      newState = {
        ...state,
        loadingUsers: undefined,
      }

      break
    }

  }

  return newState
}

export default support