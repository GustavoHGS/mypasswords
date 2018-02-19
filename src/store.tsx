import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

export default createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    logger,
  ),
)
