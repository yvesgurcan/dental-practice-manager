import gridColGap from './gridColGap'

export default (viewport) => {
  const gridColumnGap = gridColGap(viewport)
  let rowWidth = '410px'
  if (viewport.mobile) {
    rowWidth = '50%'
  }
  else if (viewport.tablet) {
    rowWidth = '232px'
  }
  
  return ({
    shiftUpperNavGrid: {
      display: 'grid',
      gridTemplateColumns: `repeat(2, ${rowWidth})`,
      justifyContent: 'center',
      gridColumnGap,
      marginBottom: 10,
    },
  })
}