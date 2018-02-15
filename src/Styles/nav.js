export default (viewport) => {
  if (viewport.menu) {
    return ({
      nav: {
        borderBottom: "1px solid darkgray",
      },
    })
  }
  return ({
    nav: {
      display: "grid",
      gridTemplateColumns: "repeat(11, max-content)",
      border: "1px solid darkgray",  
    },
  })
}