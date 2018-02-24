
import getRouteDetails from './getRouteDetails'

export default (title, routeTitle, session, environment) => {
  if (!document) {
    return null
  }

  let fullTitle = ''
  if (title) {
    fullTitle = title
  }

  /*
  const subRouteHome = getRouteDetails(environment.routes, menuRoute)
  console.log(subRouteHome)
  */

  if (routeTitle) {
    if (fullTitle !== '') {
    fullTitle += ` - ${routeTitle}`
    }
    else {
      fullTitle += routeTitle
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