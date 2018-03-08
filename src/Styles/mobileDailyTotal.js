export default (viewport) => {
  if (viewport.mobile) {
    return ({
      mobileDailyTotal: {
        marginTop: -20,
      },
    })
  }
  return ({
    mobileDailyTotal: {
      display: 'none',
    },
  })
}