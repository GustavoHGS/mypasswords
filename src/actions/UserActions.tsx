import { NavigationActions } from 'react-navigation'
const Store = require('react-native-simple-store')
import * as Redux from 'redux'
import * as types from './types'

export const isUserLogged = () => (
  (dispatch: Redux.Dispatch<any>) => {
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    Store
      .get('user')
      .then((result: any) => {
        console.log('user logado ', result)
        if (result) {
          dispatch(NavigationActions.navigate({ routeName: 'MainScreen' }))
        }
        return dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
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
        dispatch(NavigationActions.navigate({ routeName: 'Login' }))
      })
      .catch((err:any) => alert('error ' + err))
  }
)

