import standardMargin from './navItem.js'

export default (viewport) => {
  if (viewport.menu) {
    return ({
      navButton: {
        cursor: "pointer",
        borderBottom: "1px solid darkgray",
      },
    })
  }
  return ({
    navButton: {
      display: "none",
    },
  })
}