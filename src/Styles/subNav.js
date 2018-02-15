const topElementsHeight = 45
const paddingTop = 28

export default (viewport) => {
  if (viewport.menu) {
    return ({
      subNav: {
        borderBottom: "1px solid darkgray",
      },
    })
  }
  return ({
    subNav: {
      borderRight: "1px solid darkgray",
      paddingTop: paddingTop,
      paddingLeft: 10,
      minHeight: `calc(100vh - ${topElementsHeight}px - ${paddingTop}px`,    
    },
  })
}