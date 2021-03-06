import gridColGap from './gridColGap'

export default (viewport) => {
  const gridColumnGap = gridColGap(viewport)
  if (viewport.mobile) {
    return null
  }
  const rowCount = 2
  const percentage = 100/rowCount
  return ({
    ["grid" + rowCount]: {
      display: "grid",
      gridTemplateColumns: `repeat(${rowCount}, calc(${percentage}% - ${gridColumnGap}px)`,
      gridColumnGap,
    },
  })
}