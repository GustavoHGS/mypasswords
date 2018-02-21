import { NavigationActions } from 'react-navigation'
const Store = require('react-native-simple-store')
const CircularJSON = require('circular-json')
import RNSecureKeyStore from 'react-native-secure-key-store'
import * as Redux from 'redux'
import * as types from './types'
import { ISite } from '../reducers/SiteReducer'

const CREDENTIALS_KEY = 'mycredentials'


export const saveNewSite = (site:ISite) => (
  (dispatch: Redux.Dispatch<any>, state: Redux.Store<any>) => {
    const newSites = [...state().sites.credentials, site]  // tslint:disable-line
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    RNSecureKeyStore
      .set(CREDENTIALS_KEY, CircularJSON.stringify(newSites))
      .then((res) => {
        console.log('credential success ', res)
        dispatch({ type: types.SAVE_SITE, payload: newSites })
        dispatch({ type: types.SHOW_MESSAGE, payload: 'Login salvo com sucesso.' })
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
        return dispatch(NavigationActions.back())
      })
      .catch(err => alert('Erro ao salvar ' + err))
  }
)

export const fetchSites = () => (
  (dispatch: Redux.Dispatch<any>, state: Redux.Store<any>) => {
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    RNSecureKeyStore
      .get(CREDENTIALS_KEY)
      .then((res: any) => {
        console.log('credentials ', CircularJSON.parse(res))
        dispatch({ type: types.FETCH_SITES, payload: CircularJSON.parse(res) })
        return dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
      })
      .catch((err: any) => {
        console.log('Erro ao buscar ', err)
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
      })
  }
)


export const clearSites = () => (
  (dispatch: Redux.Dispatch<any>, state: Redux.Store<any>) => {
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    RNSecureKeyStore
      .remove(CREDENTIALS_KEY)
      .then((res: any) => {
        console.log('remove credentials ', res)
        dispatch({ type: types.SHOW_MESSAGE, payload: 'Todas as credenciais foram apagadas.' })
        dispatch({ type: types.FETCH_SITES, payload: [] })
        return dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
      })
      .catch(err => console.log('Erro ao buscar ', err))
  }
)

export const removeSiteByUrl = (url: string) => (
  (dispatch: Redux.Dispatch<any>, state: Redux.Store<any>) => {
    const localSites = [...state().sites.credentials]
    console.log('sites ', localSites)
    
    const index = localSites.findIndex(item => item.url === url)
    if (index >= 0) {
      dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
      const sites = [
        ...localSites.slice(0, index),
        ...localSites.slice(index + 1),
      ]
      RNSecureKeyStore
        .set(CREDENTIALS_KEY, CircularJSON.stringify(sites))
        .then((res) => {
          console.log('credential remove ', res)
          dispatch({ type: types.FETCH_SITES, payload: sites })
          dispatch({ type: types.SHOW_MESSAGE, payload: 'Site removido com sucesso.' })
          dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
        })
        .catch(err => alert('Erro ao salvar ' + err))
    }
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
  }
)

export const editSite = (site:ISite, index: number) => (
  (dispatch: Redux.Dispatch<any>, state: Redux.Store<any>) => {
    const localSites = [...state().sites.credentials]
    const sites = [
      ...localSites.slice(0, index),
      ...localSites.slice(index + 1),
      site,
    ]
    dispatch({ type: types.APPLICATION_IS_LOADING, payload: true })
    RNSecureKeyStore
      .set(CREDENTIALS_KEY, CircularJSON.stringify(sites))
      .then((res) => {
        console.log('credential success ', res)
        dispatch({ type: types.SAVE_SITE, payload: sites })
        dispatch({ type: types.SHOW_MESSAGE, payload: 'Login editado com sucesso.' })
        dispatch({ type: types.APPLICATION_IS_LOADING, payload: false })
        return dispatch(NavigationActions.back())
      })
      .catch(err => alert('Erro ao editar ' + err))
  }
)


