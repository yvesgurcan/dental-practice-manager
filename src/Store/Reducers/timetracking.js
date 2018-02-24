export default function timetracking (state = {}, action) {

  let newState = {...state}

  switch (action.type) {
    default:
      break
    
    case 'STORE_DAY': {
      newState = {
        ...state,
        day: action.day,
      }
      break
    }

  }


  return newState
}