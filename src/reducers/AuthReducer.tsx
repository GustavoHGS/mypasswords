import { LOGIN_SUCCESS } from '../actions/types'

interface IAction {
  type: string
  payload: {}
}

interface IAuth {
  email: string
  password: string
}

interface IState {
  auth?: IAuth
  accesstoken?: string,
  baseRouting?: object
}

const INITIAL_STATE = {
  auth: null,
  baseRouting: null,
}

export default (state = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...INITIAL_STATE, accesstoken: action.payload }
    default:
      return state
  }
}
export { IState }
