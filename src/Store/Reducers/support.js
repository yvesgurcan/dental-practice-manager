function support (state = {}, action) {

  let newState = {...state}

  switch (action.type) {
    default: {
      break
    }

    case "CLEAR_SUPPORT_VIEWS": {
      newState = {
        ...state,
        newClient: undefined,
        newClientFeedback: undefined,
        newUser: undefined,
        newUserFeedback: undefined,
      }

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

    case "STORE_NEW_CLIENT": {
      let newClient = {...state.newClient}
      newClient[action.name] = action.value
      newState = {
        ...state,
        newClient: newClient,
      }
      break
    }

    case "CLEAR_NEW_CLIENT_FEEDBACK": {
      newState = {
        ...state,
        newClientFeedback: undefined,
      }

      break
    }

    case "NEW_CLIENT_FEEDBACK": {
      let newClientFeedback = {...state.newClientFeedback, ...action.feedback}
      newState = {
        ...state,
        newClientFeedback: newClientFeedback,
      }

      break
    }

    case "CLEAR_NEW_CLIENT_FORM": {
      newState = {
        ...state,
        newClient: undefined,
      }

      break
    }

    case "ADD_CLIENT": {
      const clients = [...state.clients, {...action.newClient}]
      newState = {
        ...state,
        clients: clients
      }
      break
    }

    case "STORE_NEW_USER": {
      let newUser = {...state.newUser}
      newUser[action.name] = action.value
      newState = {
        ...state,
        newUser: newUser,
      }
      break
    }

    case "CLEAR_NEW_USER_FEEDBACK": {
      newState = {
        ...state,
        newUserFeedback: undefined,
      }

      break
    }

    case "NEW_USER_FEEDBACK": {
      let newUserFeedback = {...state.newUserFeedback, ...action.feedback}
      newState = {
        ...state,
        newUserFeedback: newUserFeedback,
      }

      break
    }

    case "CLEAR_NEW_USER_FORM": {
      newState = {
        ...state,
        newUser: undefined,
      }

      break
    }

  }

  return newState
}

export default support