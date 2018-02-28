export default function timetracking (state = {}, action) {

  let newState = {...state}

  switch (action.type) {
    default:
      break
    
    case 'STORE_SHIFT_DAY': {
      newState = {
        ...state,
        day: action.day,
      }
      break
    }

    case 'STORE_SHIFTS': {
      newState = {
        ...state,
        shifts: [...action.shifts],
      }

      break
    }

    case 'ADD_SHIFT': {
      const updatedShifts = [...state.shifts, {shitId: 'newShift'}]
      newState = {
        ...state,
        shifts: updatedShifts,
      }
      break
    }

    case 'DELETE_SHIFT': {
      const updatedShifts = state.shifts.filter(shift => shift.shiftId !== action.shiftId)
      newState = {
        ...state,
        shifts: updatedShifts,
      }

      break
    }

  }


  return newState
}