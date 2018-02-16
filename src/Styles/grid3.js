import gridColGap from './gridColGap'

export default (viewport) => {
  const rowCount = 3
  const percentage = 100/rowCount
  const gridColumnGap = gridColGap(viewport)
  return ({
    ["grid" + rowCount]: {
      display: "grid",
      gridTemplateColumns: `repeat(${rowCount}, calc(${percentage}% - ${gridColumnGap*rowCount}px)`,
      gridColumnGap,
    },
  })
}