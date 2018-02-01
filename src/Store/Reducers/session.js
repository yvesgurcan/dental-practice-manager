const debugSession = {
  user: {
    type: "dentist",
    id: 999,
    name: "Dr. Martin",  
  }
}

function session (state = debugSession, action) {
  return state
}

export default session