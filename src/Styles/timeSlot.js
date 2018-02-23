const shared = {
  fontWeight: 'bold',
}

export default (viewport) => {
  if (viewport.tablet) {
    return ({
      timeSlot: {
        ...shared,
      },
    })
  }

  return ({
    timeSlot: {
      ...shared,
      height: 76,
    },
  })
}