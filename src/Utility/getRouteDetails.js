const getRouteDetails = (routes, selectedRoute, desiredProperty = null) => {

  if (!selectedRoute) {
    return null
  }

  const routeArray = selectedRoute.split('/')
  const routeFragments = routeArray.filter((_, index) => index > 0)

  const routeIdMatch = Object.keys(routes).filter(route => routes[route].idRoute).filter(route => routes[route].idRoute.url === '/' + routeFragments[0] + "/" + routeFragments[1])

  let routeMatch = []
  if (routeIdMatch.length > 0) {
    routeMatch = routeIdMatch
  }
  else {
    routeMatch = Object.keys(routes).filter(route => routes[route].url === '/' + routeFragments[0])
  }

  if (routeMatch.length === 0) {
    return {}
    // throw new Error(`The top route '${routeFragments[0]}' in '${selectedRoute}' could not be found in the routes object.`)
  }

  let routeDetails = routes[routeMatch[0]]
  if (routeFragments.length > 1 && routeIdMatch.length === 0) {
    if (!routeDetails.subroutes) {
      return {}
      // throw new Error(`The top route '${routeFragments[0]}' does not handle subroutes.`)
    }
    let subrouteIdMatch = []
    const subrouteMatch = Object.keys(routeDetails.subroutes).filter(subroute => routeDetails.subroutes[subroute].url === '/' + routeFragments[0] + '/' + routeFragments[1] + (routeFragments[2] ? "/" + routeFragments[2] : ""))
    if (subrouteMatch.length === 0) {
      subrouteIdMatch = Object.keys(routeDetails.subroutes).filter(subroute => routeDetails.subroutes[subroute].idRoute).filter(subroute => routeDetails.subroutes[subroute].idRoute.url === '/' + routeFragments[0] + '/' + routeFragments[1] + (routeFragments[2] ? "/" + routeFragments[2] : ""))
      if (subrouteIdMatch.length === 0) {
        return {}
        // throw new Error(`The subroute route '${routeFragments[1]}' in '${selectedRoute}' could not be found in the routes object.`)  
      }
    }

    let subrouteDetails = routeDetails.subroutes[subrouteMatch[0]]
    if (subrouteIdMatch.length > 0) {
      subrouteDetails = routeDetails.subroutes[subrouteIdMatch[0]].idRoute
    }
    if (desiredProperty) {
      return subrouteDetails[desiredProperty]
    }

    return subrouteDetails

  }

  if (routeIdMatch.length > 0) {
    routeDetails = routeDetails.idRoute
  }

  if (desiredProperty) {
    return routeDetails[desiredProperty]
  }

  return routeDetails
}

export default getRouteDetails