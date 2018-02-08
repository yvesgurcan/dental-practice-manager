const setLocalStorage = (key, data) => {
  if (!key) {
      console.error("You must pass a key argument to setLocalStorage")
      return false
  }
  else if (data === undefined) {
      console.error("You must pass a valid data argument to setLocalStorage")
      return false
  }
  
  if (data instanceof Object) {
      data = JSON.stringify(data)
  }

  if (localStorage) {
      // the variable will be automatically converted to a string
      localStorage.setItem(key, data)
      return true  
  }

  console.error("localStorage is not supported by this device.")
  return false
}

export default setLocalStorage