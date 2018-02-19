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
        ...action.settings,
      }

      break
    }

    case 'HIDE_DENTIST_ROLE': {
      const updatedUsers = [...(state.users || [])].map(user => {
        if (user.role === 'dentist') {
          const updatedUser = {...user, role: 'headHygienist'}
          return updatedUser
        }
        return user
      })
      newState = {
        ...state,
        hideDentistRole: true,
        users: updatedUsers,
      }

      break
    }

    case 'SHOW_DENTIST_ROLE': {
      const updatedUsers = [...(state.users || [])].map(user => {
        if (user.role === 'headHygienist') {
          const updatedUser = {...user, role: 'dentist'}
          return updatedUser
        }
        return user
      })
      newState = {
        ...state,
        hideDentistRole: undefined,
        users: updatedUsers,
      }

      break
    }

    case "SELECT_SCHEDULE_BOUNDARIES": {
      newState = {
        ...state,
        newScheduleBoundaries: {...action.scheduleBoundaries},
      }

      break
    }

    case 'STORE_SCHEDULE_BOUNDARIES': {
      let value = action.value
      if (action.name === 'daysOpen') {
        if (action.checked) {
          value = [...(state.newScheduleBoundaries.daysOpen || []), action.id]          
        }
        else {
          value = state.newScheduleBoundaries.daysOpen.filter(day => day !== action.id)
        }
      }

      let newScheduleBoundaries = {
        ...state.newScheduleBoundaries,
        [action.name]: value
      }
      
      newState = {
        ...state,
        newScheduleBoundaries,
      }

      break
    }

  }

  return newState
}

export default settings