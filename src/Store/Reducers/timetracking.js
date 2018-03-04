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
      const updatedShifts = [...state.shifts, {shitId: 'newShift'}]
      newState = {
        ...state,
        shifts: updatedShifts,
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

    case 'UPDATE_SHIFT': {
      const updatedShifts = state.shifts.map(shift => {
        let augmentedShift = {...shift}
        if (shift.shiftId === action.shiftId) {
          augmentedShift = {
            ...augmentedShift,
            [action.name]: action.value,
          }
        }
        
        return augmentedShift
      })

      newState = {
        ...state,
        shifts: updatedShifts,
      }

      break
    }

    case 'DELETE_SHIFT': {
      const shifts = [...state.shifts].filter(shift => shift.shiftId !== action.shiftId)
      newState = {
        ...state,
        shifts,
      }

      break
    }

  }


  return newState
}