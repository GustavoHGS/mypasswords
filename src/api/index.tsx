import { create } from 'apisauce'
import Config from 'react-native-config'
// import logError from '../utils/logger'


const apiPrd = create({
  baseURL: Config.API_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
})



export default apiPrd
