import gridColGap from './gridColGap'

export default (viewport) => {
  let rowCount = 3
  if (viewport.mobile) {
    return null
  }
  if (viewport.tablet) {
    rowCount = 2
  }
  const percentage = 100/rowCount
  const gridColumnGap = gridColGap(viewport)
  return ({
    grid3: {
      display: "grid",
      gridTemplateColumns: `repeat(${rowCount}, calc(${percentage}% - ${gridColumnGap}px)`,
      gridColumnGap,
    },
  })
}