export default (viewport) => {
  if (viewport.menu) {
    return ({
      navItemLink: {
        display: "block",
      },
    })
  }
  return ({
    navItemLink: {
      padding: 10,
      paddingLeft: 13,
      paddingRight: 13,    
    },
  })
}