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