export default (viewport) => {
  if (viewport.menu) {
    return ({
      navItem: {
        paddingTop: 4,
        paddingBottom: 4,
      },
    })
  }
  return ({
    navItem: {
      borderRight: "1px solid darkgray",
      paddingTop: 9,
      paddingBottom: 9,
    },
  })
}