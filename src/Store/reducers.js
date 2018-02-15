import { combineReducers } from 'redux'
import environment from './Reducers/environment'
import schedule from './Reducers/schedule'
import session from './Reducers/session'
import settings from './Reducers/settings'
import support from './Reducers/support'
import routeData from './Reducers/routeData'
import styles from './Reducers/styles'

export default combineReducers({
  session,
  settings,
  schedule,
  support,
  environment,
  routeData,
  styles,
})