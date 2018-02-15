export default (viewport) => {
  if (viewport.menu) {
    return ({
      navItem: {
        paddingTop: 2.5,
        paddingBottom: 2.5,
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