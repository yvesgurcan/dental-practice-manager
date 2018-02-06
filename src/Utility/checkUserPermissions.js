const checkUserPermissions = (routes, user) => {
  if (!user) return []
  return (Object.keys(routes).filter(route => !routes[route].permissions || routes[route].permissions.indexOf(user.role) > -1))
}

export default checkUserPermissions