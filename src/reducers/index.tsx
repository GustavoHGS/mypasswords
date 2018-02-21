import { combineReducers } from 'redux'
import { BaseRouter } from '../Navigator'
import AuthReducer from './AuthReducer'
import UIReducer from './UIReducer'
import SitesReducer from './SiteReducer'
import UserReducer from './UserReducer'

export default combineReducers({
  auth: AuthReducer,
  ui: UIReducer,
  sites: SitesReducer,
  user: UserReducer,
  baseRouting: (state, action) => BaseRouter.router.getStateForAction(action, state),
})
