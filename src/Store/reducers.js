import { combineReducers } from 'redux'
import appointments from './Reducers/appointments'
import environment from './Reducers/environment'
import patients from './Reducers/patients'
import schedule from './Reducers/schedule'
import session from './Reducers/session'
import settings from './Reducers/settings'
import support from './Reducers/support'
import routeData from './Reducers/routeData'

export default combineReducers({
  session,
  settings,
  schedule,
  appointments,
  patients,
  support,
  environment,
  routeData,
})