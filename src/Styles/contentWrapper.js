const gap = 20
const menuWidth = 237.5

export default (viewport) => {
  if (viewport.menu) {
    return null
  }
  return ({
    contentWrapper: {
      display: "grid",
      gridTemplateColumns: `${menuWidth}px calc(100% - ${menuWidth}px - ${gap}px)`,
      gridColumnGap: gap,
    },
  })
}