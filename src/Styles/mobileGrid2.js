export default (viewport) => {
  const rowCount = 2
  const percentage = 100/rowCount
  return ({
    ["mobileGrid" + rowCount]: {
      display: "grid",
      gridTemplateColumns: `repeat(${rowCount}, ${percentage}%`,
    },
  })
}