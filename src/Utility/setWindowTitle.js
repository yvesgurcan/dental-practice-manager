
import getRouteDetails from './getRouteDetails'

export default (title, session, environment, routeData, mainRoute) => {
  if (!document) {
    return null
  }

  let fullTitle = ''

  const subRoute = getRouteDetails(environment.routes, routeData.path)

  if (subRoute && subRoute.name) {
    if (fullTitle !== '') {
    fullTitle += ` - ${subRoute.name}`
    }
    else {
      fullTitle += subRoute.name
    }

  }

  if (title) {
    if (fullTitle !== '' && subRoute && subRoute.name) {
      fullTitle += `: ${title}`
    }
    else if (fullTitle !== '') {
      fullTitle += ` - ${title}`
    }
    else {
      fullTitle += title
    }

  }

  const route = getRouteDetails(environment.routes, mainRoute)
  console.log(route)

  if (route && route.name) {
    if (!subRoute || (subRoute && subRoute.name && subRoute.name !== route.name)) {
      if (fullTitle !== '') {
      fullTitle += ` - ${route.name}`
      }
      else {
        fullTitle += route.name
      }
            
    }

  }
  
  const { client } = session || {}
  if (client && client.name) {
    if (fullTitle !== '') {
      fullTitle += ` - ${client.name}`
    }
    else {
      fullTitle += client.name
    }
  }
  
  const { software } = environment || {}
  if (fullTitle !== '') {
    fullTitle += ` - ${software.name}`

  }
  else {
    fullTitle += software.name

  }
  if (document.title !== fullTitle) {
    document.title = fullTitle

  }
  
}