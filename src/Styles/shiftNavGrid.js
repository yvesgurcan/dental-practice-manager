import gridColGap from './gridColGap'

export default (viewport) => {
  const gridColumnGap = gridColGap(viewport)
  if (viewport.mobile) {
    return ({
      shiftNavGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 50%)',
        justifyContent: 'center',
      }
    })
  }
  let rowWidth = 133
  if (viewport.tablet) {
    rowWidth = 62
  }
  
  return ({
    shiftNavGrid: {
      display: 'grid',
      gridTemplateColumns: `25px repeat(5, ${rowWidth}px) 25px`,
      gridColumnGap,
      textAlign: 'center',
      justifyContent: 'center',
    },
  })
}