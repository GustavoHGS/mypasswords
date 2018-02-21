import * as types from '../actions/types'

interface IState {
  applicationIsLoading?: boolean
  errorMessage?: string
  showFingerprint?: boolean
}

const INITIAL_STATE = {
  applicationIsLoading: false,
  errorMessage: '',
  showFingerprint: false,
}

export default (state = INITIAL_STATE, action: { type: string, payload:  boolean }) => {
  switch (action.type) {
    case types.APPLICATION_IS_LOADING:
      return { ...INITIAL_STATE, ...state, applicationIsLoading: action.payload }
    case types.SHOW_MESSAGE:
      return { ...INITIAL_STATE, ...state, errorMessage: action.payload }
    case types.ENABLE_FINGERPRINT:
      return { ...INITIAL_STATE, ...state, showFingerprint: action.payload }
    default:
      return state
  }
}
export { IState }
