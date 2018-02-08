const checkValidJSON = (string) => {
  try {
      return (JSON.parse(string) && !!string)
  } catch (e) {
      return false
  }
}

export default checkValidJSON