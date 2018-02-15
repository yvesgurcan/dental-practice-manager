function styles (state = {}, action) {

  let newState = {...state}

  switch (action.type) {
    case "STORE_STYLES": {
      newState = action.styles
      }

      break
  }

  return newState
}

export default styles