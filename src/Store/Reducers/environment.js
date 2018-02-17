import userRoles from './../../Environment/userRoles'
import routes from './../../Environment/routes'
import weekdays from './../../Environment/weekdays'
import regex from './../../Environment/regex'
import styles from './../../Styles/styles'

const getEnvironment = () => ({
  userRoles,
  routes,
  weekdays,
  cancelButton: {
    cancelLabel: "Cancel",
    doneLabel: "Done",
  },
  regex,
})

function environment (state = getEnvironment(), action) {
  let newState = {...state}

  switch (action.type) {
    default:
      break
    
    case "STORE_STYLES": {
      const window = {...action.window}
      const breakpoints = {
        mobile: window.width <= 500,
        tablet: window.width <= 850,
        desktop: window.width > 850,
        menu: window.width < 1000,
      }
      const viewport = {...window, ...breakpoints}
      newState = {
        ...state,
        viewport: {...viewport},
        styles: styles({...viewport}),
      }

      break
    }

    case "TOGGLE_NAV": {
      newState = {
        ...state,
        showNav: !state.showNav,
      }

      break
    }

    case "HIDE_NAV": {
      newState = {
        ...state,
        showNav: undefined,
      }

      break
    }

  }

  return newState
}

export default environment