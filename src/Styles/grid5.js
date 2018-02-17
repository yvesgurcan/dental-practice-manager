import gridColGap from './gridColGap'

export default (viewport) => {
  let rowCount = 5
  if (viewport.mobile) {
    return null
  }
  if (viewport.tablet) {
    rowCount = 2
  }
  const percentage = 100/rowCount
  const gridColumnGap = gridColGap(viewport)
  return ({
    grid5: {
      display: "grid",
      gridTemplateColumns: `repeat(${rowCount}, calc(${percentage}% - ${gridColumnGap}px)`,
      gridColumnGap,
    },
  })
}