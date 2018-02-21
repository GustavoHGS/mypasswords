import * as types from '../actions/types'

interface IState {
  email: string
  isFirstLogin: boolean
}

interface IUser {
  email: string
  name: string
  password: string
}

const INITIAL_STATE = {
  email: '',
  isFirstLogin: false,
}

export default (state = INITIAL_STATE, action: { type: string, payload:  object }) => {
  switch (action.type) {
    case types.FETCH_USER:
      return { ...INITIAL_STATE, ...state, ...action.payload }
    default:
      return state
  }
}
export { IState, IUser }
