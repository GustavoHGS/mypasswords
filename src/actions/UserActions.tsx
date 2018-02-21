import { NavigationActions } from 'react-navigation'
const Store = require('react-native-simple-store')
import RNSecureKeyStore from 'react-native-secure-key-store'
import * as Redux from 'redux'
import * as types from './types'
import { IUser } from '../reducers/UserReducer'
import UserService from '../services/UserService'

interface APIResponse {
  type: string
  message: string
  errors: string[]
}

export const isUserLogged = () => (
  (dispatch: Redux.Dispatch<any>) => {
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    Store
      .get('user')
      .then((result: any) => {
        console.log('user logado ', result)
        if (result) {
          dispatch({ type: types.LOGIN_SUCCESS, payload: result.authToken })
          return dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
          }))
        }
        return dispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        }))
      })
      .catch((err:any) => alert('error' + err))
  }
)

export const logout = () => (
  (dispatch: Redux.Dispatch<any>) => {
    Store
      .delete('user')
      .then((result: any) => {
        console.log('user deslogado com sucesso! ')
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
        dispatch({ type: types.SHOW_MESSAGE, payload: 'Usuário deslogado com sucesso!' })
        return dispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        }))
      })
      .catch((err:any) => alert('error ' + err))
  }
)


export const showMessage = (message: string) => (
  (dispatch: Redux.Dispatch<any>) => {
    dispatch({ type: types.SHOW_MESSAGE, payload: message })
  }
)


export const userRegister = (user: IUser) => (
  (dispatch: Redux.Dispatch<any>) => {
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    UserService
      .register(user.name, user.email, user.password)
      .then((data: APIResponse) => {
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
        if (data && data.type !== 'error') {
          dispatch({ type: types.SHOW_MESSAGE, payload: 'Usuário cadastrado com sucesso.' })
          return dispatch(NavigationActions.back())
        }
        let errors = ''
        if (data.errors) {
          errors = data.errors.join('. ')
        }
        return dispatch({ type: types.SHOW_MESSAGE, payload: `${data.message} : ${errors}` })
      })
      .catch((err:any) => alert('error ' + err))
  }
)

export const saveFingerprintFlag = () => (
  (dispatch: Redux.Dispatch<any>, state: Redux.Store<any>) => {
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    RNSecureKeyStore
      .set('hashPassword', 'yes')
      .then((res) => {
        console.log('credential success ', res)
        dispatch({ type: types.SHOW_MESSAGE, payload: 'Credencial salva com sucesso.' })
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
        return  dispatch(NavigationActions.navigate({ routeName: 'Home' }))
      })
      .catch(err => alert('Erro ao salvar ' + err))
  }
)

export const isFirstLogin = () => (
  (dispatch: Redux.Dispatch<any>, state: Redux.Store<any>) => {
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    Store
      .get('firstLogin')
      .then((result: boolean) => {
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
        if (result) {
          console.log('não é first login ', result)
          return dispatch({ type: types.FETCH_USER, payload: { isFirstLogin: false } })
        }
        saveFirstLogin()
        return dispatch({ type: types.FETCH_USER, payload: { isFirstLogin: true } })
      })
      .catch((err:any) => alert('error first login' + err))
  }
)


const saveFirstLogin = () => {
  Store
    .save('firstLogin', true)
    .then(() => console.log('firstlogin salvo '))
    .catch((err: any) => console.log('erro salvar firstlogin' + err))
}

export const resetStackAndGo = (route:string) => (
  (dispatch: Redux.Dispatch<any>, state: Redux.Store<any>) => {
    return dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })],
    }))
  }
)


