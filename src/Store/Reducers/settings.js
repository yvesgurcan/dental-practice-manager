function settings (state = {}, action) {

  let newState = {...state}

  switch (action.type) {
    default: {
      break
    }
    case "STORE_USERS": {
      newState = {
        ...state,
        users: action.users,
      }
      break
    }
  }

  return newState
}

export default settings