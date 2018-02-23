export default (viewport) => {
  if (viewport.tablet) {
    return null
  }
  return ({
    appointmentScheduleCard: {
      border: '1px solid darkgray',
      marginBottom: 1,
      padding: 1,
      position: 'relative',
    },
  })
}