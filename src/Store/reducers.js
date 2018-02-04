import { combineReducers } from 'redux'
import environment from './Reducers/environment'
import schedule from './Reducers/schedule'
import session from './Reducers/session'
import settings from './Reducers/settings'

export default combineReducers({
  environment,
  session,
  schedule,
  settings,
})