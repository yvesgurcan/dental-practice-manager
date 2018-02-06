const debugSession = {
  client: {
    clientId: 1,
    name: "Gentle Care",
    deleted: false,
  },
  user: {
    userId: 1,
    clientId: 1,
    email: "martin@gentlecare.com",
    password: "123",
    type: "dentist",
    name: "Dr. Martin",
    rate: 110,
    deleted: false,
  },
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
    case "AUTH_SUCCESS": {
      newState = {
        ...state,
        user: action.user,
        client: action.client,
      }
      break
    }
    case "SIGN_OUT": {
      newState = {
        ...state,
        user: undefined,
      }
      break
    }
  }

  return newState
}

export default session