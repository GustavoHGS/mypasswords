import { NavigationActions } from 'react-navigation'
const Store = require('react-native-simple-store')
import RNSecureKeyStore from 'react-native-secure-key-store'
import * as Redux from 'redux'
import * as types from './types'
import AuthService from '../services/AuthService'
import { IState as AuthState } from '../reducers/AuthReducer'

interface APIResponse {
  type: string
  message: string
  token: string
}

const saveLocalUser = (authToken: string, email: string) => {
  Store
    .save('user', { authToken, email })
    .then(() => console.log('token salvo ', authToken))
    .catch((err: any) => console.log('erro salvar ', err))
}

export const login = ({ auth }: AuthState) => (
  (dispatch: Redux.Dispatch<any>) => {
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    if (auth) {
      AuthService
      .login(auth.email, auth.password)
      .then((data: APIResponse) => {
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
        if (data && data.type === 'error') {
          return dispatch({ type: types.SHOW_MESSAGE, payload: data.message })
        }
        saveLocalUser(data.token, auth.email)
        dispatch({ type: types.LOGIN_SUCCESS, payload: data.token })
        dispatch({ type: types.FETCH_USER, payload: { email: auth.email } })
        return dispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        }))
      })
      .catch((err: any) => {
        console.log('login error ', err)
        dispatch({ type: types.SHOW_MESSAGE, payload: 'Ocorreu uma falha na requisição.' })
      })
    }
  }
)

export const enableAuthWithLocalCredentials = () => (
  (dispatch: Redux.Dispatch<any>, state: Redux.Store<any>) => {
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    RNSecureKeyStore
      .get('hashPassword')
      .then((res: string) => {
        console.log('loggin local with ', res)
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
        return dispatch({ type: types.ENABLE_FINGERPRINT, payload: true })
      })
      .catch((err: any) => {
        console.log('Erro ao buscar local creds ', err)
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
      })
  }
)
