import gridColGap from './gridColGap'

export default (viewport) => {
  const rowCount = 2
  const percentage = 100/rowCount
  const gridColumnGap = gridColGap(viewport)
  if (viewport.tablet) {
    return null
  }
  return ({
    ["grid" + rowCount]: {
      display: "grid",
      gridTemplateColumns: `repeat(${rowCount}, calc(${percentage}% - ${gridColumnGap*rowCount}px)`,
      gridColumnGap,
    },
  })
}