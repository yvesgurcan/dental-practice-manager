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
        dailyTotals: [...action.dailyTotals],
      }

      break
    }

    case 'ADD_SHIFT': {
      newState = {
        ...state,
        shifts: [...state.shifts, { shiftId: action.tempShiftId}],
      }

      break
    }

    case 'STORE_NEW_SHIFT_ID': {
      let updatedShifts = state.shifts.map(shift => {
        let updatedShift = {...shift}
        if (updatedShift.shiftId === action.tempShiftId) {
          updatedShift.shiftId = action.newShiftId
        }

        return updatedShift
      })

      newState = {
        ...state,
        shifts: updatedShifts,
      }

      break
    }

  }


  return newState
}