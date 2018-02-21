import * as types from '../actions/types'

interface ISite {
  url: string
  username: string
  password: string
}

interface IState {
  credentials: ISite[]
}

const INITIAL_STATE = {
  credentials: [],
}

export default (state = INITIAL_STATE, action: { type: string, payload:  boolean }) => {
  switch (action.type) {
    case types.FETCH_SITES:
      return { ...state, credentials: action.payload }
    case types.SAVE_SITE:
      return { ...state, credentials: action.payload }
    case types.DELETE_SITE:
      return { ...state, credentials: action.payload }
    default:
      return state
  }
}
export { ISite, IState }
