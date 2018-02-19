export default (viewport) => {
  if (viewport.mobile) {
    return null
  }
  return ({
    alignRight: {
      textAlign: 'right',
    }
  })
}