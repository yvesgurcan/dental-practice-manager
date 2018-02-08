const debugSession = {
  /*
  client: {
    clientId: 1,
    name: "Gentle Care",
  },
  user: {
    userId: 1,
    name: "Dr. Martin",
    role: "dentist",
    email: "martin@gentlecare.com",
    password: "123",
  },
  supportUser: {
    supportUserId: 1,
    name: "Yves",
    email: "gurcan.yves@gmail.com",
    password: "123",
  }
  */
}

function session (state = debugSession, action) {

  let newState = {...state}

  switch (action.type) {
    default: {
      break
    }
    
    case "STORE_LOGIN": {
      let login = {...state.login}
      login[action.name] = action.value
      newState = {
        ...state,
        login: login,
      }
      break
    }

    case "AUTH_FEEDBACK": {
      newState = {
        ...state,
        feedback: {...action.feedback},
        allowResubmit: undefined,
      }
      break
    }

    case "RESUBMIT_OK": {
      newState = {
        ...state,
        allowResubmit: true,
      }
      break
    }
    
    case "AUTH_SUCCESS": {
      if (action.supportUser) {
        newState = {
          ...state,
          supportUser: {...action.supportUser},
          login: undefined,
          feedback: undefined,
          allowResubmit: undefined,
        }
        break
      }
      newState = {
        ...state,
        user: {...action.user},
        client: {...action.client},
        login: undefined,
        feedback: undefined,
        allowResubmit: undefined,
      }
      break
    }

    case "CLEAR_PASSWORD": {
      let login = {...state.login}
      login.password = undefined
      newState = {
        ...state,
        recoveryFeedback: {...action.feedback},
        login: login,
      }
      break
    }

    case "AUTH_HELP_FEEDBACK": {
      newState = {
        ...state,
        recoveryFeedback: {...action.feedback},
        allowResubmit: undefined,
      }
      break
    }

    case "SIGN_OUT": {
      newState = {
        ...state,
        supportUser: undefined,
        user: undefined,
        client: undefined,
      }
      break
    }

    case "SELECT_CLIENT": {

      let user = {...state.user}
      if (state.client !== action.client) {
        user = undefined
      }

      newState = {
        ...state,
        client: action.client,
        user: user,
      }
      
      if (action.callback) {
        action.callback(newState)
      }

      break
    }

    case "SELECT_USER": {
      newState = {
        ...state,
        user: action.user,
      }
      break
    }

  }

  return newState
}

export default session