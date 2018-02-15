import userRoles from './../../Environment/userRoles'
import routes from './../../Environment/routes'
import styles from './../../Styles/styles.js'

const getEnvironment = () => ({
  userRoles: userRoles,
  routes: routes,
})

function environment (state = getEnvironment(), action) {
  let newState = {...state}

  switch (action.type) {
    default:
      break
    case "STORE_STYLES": {
      const window = {...action.window}
      const breakpoints = {
        mobile: window.width <= 414,
        tablet: window.width <= 800,
        desktop: window.width > 800,
      }
      const viewport = {...window, ...breakpoints}
      newState = {
        ...state,
        window: {...viewport},
        styles: styles({...viewport}),
      }

      break
    }

  }

  return newState
}

export default environment