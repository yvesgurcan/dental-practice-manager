const removeLocalStorage = (key) => {
  if (!key) {
      console.error("You must pass a key argument to setLocalStorage")
      return false
  }
  else if (localStorage) {
      localStorage.removeItem(key)
      return true  
  }

  console.error("localStorage is not supported by this device.")
  return false
}

export default removeLocalStorage