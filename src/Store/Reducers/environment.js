import userRoles from './../../Environment/userRoles'
import routes from './../../Environment/routes'
import weekdays from './../../Environment/weekdays'
import regex from './../../Environment/regex'
import styles from './../../Styles/styles'
import software from './../Environment/software'

const getEnvironment = () => ({
  software,
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

    case 'STORE_SETTINGS': {
      if (action.settings.hideDentistRole) {
        const userRolesWithoutDentist = Object.keys(userRoles).map(key => userRoles[key]).filter(role => role.type !== 'dentist')
        let userRolesObject = {}
        userRolesWithoutDentist.map(userRole => {
          userRolesObject[userRole.type] = userRole
          return null
        })
        newState = {
          ...state,
          userRoles: userRolesObject,
        }

        break
      }

      const userRolesWithoutHeadHygienist = Object.keys(userRoles).map(key => userRoles[key]).filter(role => role.type !== 'headHygienist')
      let userRolesObject = {}
      userRolesWithoutHeadHygienist.map(userRole => {
        userRolesObject[userRole.type] = userRole
        return null
      })
      newState = {
        ...state,
        userRoles: userRolesObject,
      }

      break
      
    }

    case 'HIDE_DENTIST_ROLE': {
      const userRolesWithoutDentist = Object.keys(userRoles).map(key => userRoles[key]).filter(role => role.type !== 'dentist')
      let userRolesObject = {}
      userRolesWithoutDentist.map(userRole => {
        userRolesObject[userRole.type] = userRole
        return null
      })
      newState = {
        ...state,
        userRoles: userRolesObject,
      }

      break
    }

    case 'SHOW_DENTIST_ROLE': {
      const userRolesWithoutHeadHygienist = Object.keys(userRoles).map(key => userRoles[key]).filter(role => role.type !== 'headHygienist')
      let userRolesObject = {}
      userRolesWithoutHeadHygienist.map(userRole => {
        userRolesObject[userRole.type] = userRole
        return null
      })
      newState = {
        ...state,
        userRoles: userRolesObject,
      }

      break
    }

  }

  return newState
}

export default environment
