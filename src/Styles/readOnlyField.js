import standardMargin from './standardMargin'

export default (viewport) => {
  return ({
    readOnlyField: {
      ...standardMargin,
    },
  })
}