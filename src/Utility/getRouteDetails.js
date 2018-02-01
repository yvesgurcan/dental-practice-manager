const getRouteDetails = (routes, selectedRoute) => {
  const routeMatch = Object.keys(routes).filter(route => route === selectedRoute)
  return routes[routeMatch[0]]
}

export default getRouteDetails