import { combineReducers } from 'redux'
import { BaseRouter, TabBar } from '../TabBarNavigation'
import AuthReducer from './AuthReducer'
import UIReducer from './UIReducer'

export default combineReducers({
  auth: AuthReducer,
  ui: UIReducer,
  baseRouting: (state, action) => BaseRouter.router.getStateForAction(action, state),
  tabBarRouting: (state, action) => TabBar.router.getStateForAction(action, state),
})
