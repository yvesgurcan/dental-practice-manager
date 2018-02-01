const getRouteDetails = (routes, selectedRoute, desiredProperty = null) => {

  if (!selectedRoute) {
    return null
  }

  const routeArray = selectedRoute.split('/')
  const routeFragments = routeArray.filter((_, index) => index > 0)

  const routeMatch = Object.keys(routes).filter(route => routes[route].url === '/' + routeFragments[0])

  if (routeMatch.length === 0) {
    throw new Error(`The top route '${routeFragments[0]}' in 
    '${selectedRoute}' could not be found in the routes object.`)
  }

  const routeDetails = routes[routeMatch[0]]
  if (routeFragments.length > 1) {
    if (!routeDetails.subroutes) {
      throw new Error(`The top route '${routeFragments[0]}' does not handle subroutes.`)
    }

    const subrouteMatch = Object.keys(routeDetails.subroutes).filter(subroute => routeDetails.subroutes[subroute].url === '/' + routeFragments[0] + '/' + routeFragments[1])
    if (subrouteMatch.length === 0) {
      throw new Error(`The subroute route '${routeFragments[1]}' in 
      '${selectedRoute}' could not be found in the routes object.`)
    }

    const subrouteDetails = routeDetails.subroutes[subrouteMatch[0]]
    if (desiredProperty) {
      return subrouteDetails[desiredProperty]
    }

    return subrouteDetails

  }

  if (desiredProperty) {
    return routeDetails[desiredProperty]
  }

  return routeDetails
}

export default getRouteDetails