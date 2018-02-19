import { NavigationActions } from 'react-navigation'
const Store = require('react-native-simple-store')
import * as Redux from 'redux'
import * as types from './types'
import AuthService from '../services/AuthService'
import { IState as AuthState } from '../reducers/AuthReducer'

// interface IFacebookResponse {
//   accessToken: string
// }

interface APIResponse {
  type: string
  message: string
  token: string
}

const saveLocalUser = (authToken: string) => {
  Store
    .save('user', { authToken })
    .then(() => alert('token salvo' + authToken))
    .catch((err: any) => alert('erro salvar ' + err))
}


// export const getAccessToken = ({ accessToken }: IFacebookResponse) => {
//   return (dispatch: Redux.Dispatch<any>) => {
//     dispatch(NavigationActions.navigate({ routeName: 'Loading' }))
//     loginSuccess(dispatch, accessToken)
//   }
// }

// const loginSuccess = (dispatch: Redux.Dispatch<any>, key: string) => {
//   dispatch({ type: types.LOGIN_SUCCESS, payload: key })
//   dispatch(NavigationActions.navigate({ routeName: 'MainScreen' }))
// }

export const login = ({ auth }: AuthState) => (
  (dispatch: Redux.Dispatch<any>) => {
    // dispatch(NavigationActions.navigate({routeName: 'Loading'}))
    // dispatch({type: LOGIN_SUCCESS, payload: key});
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    AuthService
      .login(auth.email, auth.password)
      .then((data: APIResponse) => {
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
        if (data && data.type === 'error') {
          return alert(data.message)
        }
        // alert('response ' + JSON.stringify(data))
        saveLocalUser(data.token)
        return dispatch(NavigationActions.navigate({ routeName: 'MainScreen' }))
      })
      .catch(err => alert(err.message))
  }
)
