import getLocalStorage from './../../Utility/getLocalStorage'
import setLocalStorage from './../../Utility/setLocalStorage'
import removeLocalStorage from './../../Utility/removeLocalStorage'

const debugSession = {
}

function session (state = debugSession, action) {

  let newState = {...state}

  switch (action.type) {
    default: {
      break
    }

    case "GET_LOCALSTORAGE_CLIENT": {
      const client = getLocalStorage("client")
      if (client) {
        newState = {
          ...state,
          client: {
            clientId: client.clientId,
            name: client.name,
          },
        }  
      }

      break
    }

    case "GET_LOCALSTORAGE_USER": {
      const user = getLocalStorage("user")
      if (user) {
        newState = {
          ...state,
          user: {...user},
        }  
      }

      break
    }

    case "GET_LOCALSTORAGE_SUPPORTUSER": {
      const supportUser = getLocalStorage("supportUser")
      if (supportUser) {
        newState = {
          ...state,
          supportUser: {...supportUser},
        }  
      }

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

    case "SET_LOCALSTORAGE_CLIENT": {
      setLocalStorage("client", {...action.client})
      break
    }

    case "SET_LOCALSTORAGE_USER": {
      setLocalStorage("user", {...action.user})
      break
    }

    case "SET_LOCALSTORAGE_SUPPORTUSER": {
      setLocalStorage("supportUser", {...action.supportUser})
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

    case "REMOVE_LOCALSTORAGE_USER": {
      removeLocalStorage("user")
      break
    }

    case "REMOVE_LOCALSTORAGE_SUPPORTUSER": {
      removeLocalStorage("supportUser")
      break
    }

    case "SELECT_CLIENT": {

      let user = {...state.user}
      if (state.client !== action.client) {
        user = undefined
      }

      newState = {
        ...state,
        client: {
          clientId: action.client.clientId,
          name: action.client.name,
        },
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

    case "UPDATE_SESSION_USER": {
      newState = {
        ...state,
        user: action.user,
      }

      break
    }

    case 'HIDE_DENTIST_ROLE': {
      const updatedUser = {
        ...state.user,
        role: state.user.role === 'dentist' ? 'headHygienist' : state.user.role
      }
      newState = {
        ...state,
        user: updatedUser,
      }

      break
    }

    case 'SHOW_DENTIST_ROLE': {
      const updatedUser = {
        ...state.user,
        role: state.user.role === 'headHygienist' ? 'dentist' : state.user.role
      }
      newState = {
        ...state,
        user: updatedUser,
      }

      break
    }

  }

  return newState
}

export default session