function settings (state = {}, action) {

  let newState = {...state}

  switch (action.type) {
    default: {
      break
    }

    case "CLEAR_SETTINGS_VIEWS": {
      newState = {
        ...state,
        updateUser: undefined,
        updateUserFeedback: undefined,
      }

      break
    }

    case "STORE_USERS": {
      newState = {
        ...state,
        users: action.users,
      }

      break
    }

    case "ADD_USER": {
      const users = [...state.users, {...action.newUser}]
      newState = {
        ...state,
        users: users
      }
      break
    }

    case "SELECT_UPDATE_USER": {
      newState = {
        ...state,
        updateUser: {...action.user},
      }

      break
    }

    case "STORE_USER": {
      const updateUser = {...state.updateUser}
      updateUser[action.name] = action.value
      newState = {
        ...state,
        updateUser: {...updateUser},
      }

      break
    }

    case "CLEAR_UPDATE_USER_FEEDBACK": {
      newState = {
        ...state,
        updateUserFeedback: undefined,
      }

      break
    }

    case "UPDATE_USER_FEEDBACK": {
      const updateUserFeedback = {
        ...state.updateUserFeedback,
        ...action.feedback,
      }
      newState = {
        ...state,
        updateUserFeedback: updateUserFeedback,
      }

      break
    }

    case 'STORE_SETTINGS': {
      newState = {
        ...state,
        maxUsers: action.settings.maxUsers,
      }
      break
    }

  }

  return newState
}

export default settings