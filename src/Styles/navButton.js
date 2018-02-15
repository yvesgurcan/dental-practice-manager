export default (window) => {
  if (window.tablet) {
    return ({
      nav: {
        background: "red",
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