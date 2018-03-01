import gridColGap from './gridColGap'

export default (viewport) => {
  if (viewport.mobile) {
    return ({
      shiftGrid: {
        marginTop: 10,
        paddingBottom: 10,
        borderBottom: '1px solid gray',
      },
    })
  }
  return ({
    shiftGrid: {
      display: 'grid',
      gridTemplateColumns: 'auto 90px 90px 50px 30px 80px 80px',
      gridColumnGap: gridColGap(viewport),
      alignItems: 'center',
    },
  })
}