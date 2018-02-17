import gridColGap from './gridColGap'

export default (viewport) => {
  const rowCount = 12
  const percentage = 100/rowCount
  const gridColumnGap = gridColGap(viewport)
  return ({
    grid12: {
      display: "grid",
      gridTemplateColumns: `repeat(${rowCount}, calc(${percentage}% - ${gridColumnGap}px)`,
      gridColumnGap,
    },
  })
}