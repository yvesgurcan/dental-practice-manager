const debugSession = {
  user: {
    type: "dentist",
    id: 999,
    name: "Dr. Martin",  
  }
}

function session (state = debugSession, action) {

  let newState = {...state}

  switch (action.type) {
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