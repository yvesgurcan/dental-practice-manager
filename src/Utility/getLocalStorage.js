import checkValidJSON from './checkValidJSON'

const getLocalStorage = (key) => {
  if (localStorage) {
      let localData = localStorage.getItem(key)
      if (localData === "true") {
          return true
      }

      if (localData === "false") {
          return false
      }

      if (checkValidJSON(localData)) {
          localData = JSON.parse(localData)
      }

      return localData     
  }

  console.error("localStorage is not supported by this device.")
}

export default getLocalStorage