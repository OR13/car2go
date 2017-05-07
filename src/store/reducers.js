import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import {locationReducer as location} from './location'

import { reducer as form } from 'redux-form'

import { debugReducer as debug } from './debug'
import { web3Reducer as web3 } from './ethereum/web3'
import { uportReducer as uport } from './ethereum/uport'
import { meshPointReducer as meshPoint } from './ethereum/meshPoint'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    debug,
    web3,
    uport,
    meshPoint,
    // Add sync reducers here
    firebase,
    form,
    location,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
