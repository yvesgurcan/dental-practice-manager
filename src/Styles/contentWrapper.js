const gap = 20
const maxMenuWidth = 200

export default (viewport) => {
  if (viewport.menu) {
    return null
  }
  return ({
    contentWrapper: {
      display: "grid",
      gridTemplateColumns: `max-content calc(100% - ${maxMenuWidth}px - ${gap}px)`,
      gridColumnGap: gap,
    },
  })
}