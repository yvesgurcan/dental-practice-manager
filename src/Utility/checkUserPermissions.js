const checkUserPermissions = (routes, user) => {
  return (Object.keys(routes).filter(route => !routes[route].permissions || routes[route].permissions.indexOf(user.type) > -1))
}

export default checkUserPermissions