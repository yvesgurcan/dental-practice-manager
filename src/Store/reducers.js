import { combineReducers } from 'redux'
import environment from './Reducers/environment'
import schedule from './Reducers/schedule'
import session from './Reducers/session'
import settings from './Reducers/settings'
import support from './Reducers/support'

export default combineReducers({
  environment,
  settings,
  support,
  session,
  schedule,
})