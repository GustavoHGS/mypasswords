import * as types from '../actions/types'

interface IState {
  authToken: string
  errorMessage: string
}

const INITIAL_STATE = {
  applicationIsLoading: false,
  errorMessage: '',
}

export default (state = INITIAL_STATE, action: { type: string, payload:  boolean }) => {
  switch (action.type) {
    case types.APPLICATION_IS_LOADING:
      return { ...state, ...INITIAL_STATE, applicationIsLoading: action.payload }
    case types.SHOW_MESSAGE:
      return { ...state, ...INITIAL_STATE, errorMessage: action.payload }
    default:
      return state
  }
}
export { IState }
