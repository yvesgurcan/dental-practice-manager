import userRoles from './../../Environment/userRoles'
import routes from './../../Environment/routes'

const getEnvironment = () => ({
  userRoles: userRoles,
  routes: routes,
})

function environment (state = getEnvironment(), action) {
  return state
}

export default environment