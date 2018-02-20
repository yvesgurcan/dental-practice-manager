function schedule (state = {}, action) {
  let newState = {...state}

  switch(action.type) {
    default:
      break
    case 'STORE_SCHEDULE': {
      
      newState = {
        ...state,
        weeklySchedule: [...action.weeklySchedule],
        weekOf: action.weekOf,
      }

      break
    }
  }

  return newState
}

export default schedule