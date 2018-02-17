const topElementsHeight = 70
const padding = 15

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
      padding: padding,
      minWidth: 100,
      maxWidth: 200,
      marginTop: 10,
      minHeight: `calc(100vh - ${topElementsHeight}px - ${padding*2}px`,
    },
  })
}