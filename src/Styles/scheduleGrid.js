import gridColGap from './gridColGap'

export default (viewport) => {
  if (viewport.tablet) {
    return null
  }
  const rowCount = 5
  const timeColumnWidth = 50
  const value = (95/rowCount)
  const gridColumnGap = gridColGap(viewport)
  return ({
    scheduleGrid: {
      display: "grid",
      gridTemplateColumns: `${timeColumnWidth}px repeat(${rowCount}, calc(${value}% - ${gridColumnGap}px)`,
      gridColumnGap,
    },
  })
}