import { getRandomAddress } from 'env'
import { without, find, unique } from 'lodash'

import {
  RECEIVE_WEB3_ACCOUNTS
} from 'store/ethereum/web3'

import {
  LOCATION_CHANGE,
  getFaucetNameFromPath
} from 'store/location'

import {
  RECEIVE_MESHPOINT,
  RECEIVE_MESHPOINT_ADDRESSES,
  RECEIVE_MESHPOINT_OBJECTS,
  MESHPOINT_CREATED,
  RECEIVE_MESHPOINT_EVENT_STORE,
  SEND_WEI,
  getMeshPointByCreator,
  getMeshPointByName,
  getAllMeshPointObjects,
  getEventStore
} from './actions'

export const initialState = {
  addresses: [],
  objects: null,
  selected: null,
  defaultAddress: null,
  defaultMeshPoint: null,
  authorizedAddressReadModel: null
}

import { authorizedAddressReadModel } from './generators'

import { store } from 'main'

export const meshPointReducer = (state = initialState, action) => {

  if (action.type === 'MESHPOINT_READ_MODEL_EVENTS_RECEIVED') {
    let readModel = authorizedAddressReadModel(state.authorizedAddressReadModel, action.payload)
    return Object.assign({}, state, {
      authorizedAddressReadModel: readModel
    })
  }


  if (action.type === LOCATION_CHANGE) {
    let meshPointName = getFaucetNameFromPath(action.payload.pathname)
    if (meshPointName) {
      store.dispatch(getMeshPointByName(meshPointName))
    }
  }

  if (action.type === RECEIVE_MESHPOINT_EVENT_STORE) {
    let _authorizedAddressReadModel = authorizedAddressReadModel(state.authorizedAddressReadModel, action.payload)
    return Object.assign({}, state, {
      authorizedAddressReadModel: _authorizedAddressReadModel
    })
  }

  if (action.type === RECEIVE_WEB3_ACCOUNTS) {
    let defaultAddress = getRandomAddress(action.payload)
    store.dispatch(getAllMeshPointObjects())
    return Object.assign({}, state, {
      defaultAddress: defaultAddress
    })
  }

  if (action.type === RECEIVE_MESHPOINT) {
    let meshPoint = action.payload

    store.dispatch(getEventStore(meshPoint.address))

    return Object.assign({}, state, {
      selected: meshPoint,
      // isOwner: meshPoint && meshPoint.creator === state.defaultAddress,
      defaultMeshPoint: meshPoint,
      objects: state.objects
    })
  }

  if (action.type === RECEIVE_MESHPOINT_ADDRESSES) {
    return Object.assign({}, state, {
      addresses: without(action.payload, 0)
    })
  }

  if (action.type === RECEIVE_MESHPOINT_OBJECTS) {

    let ownerFaucet = find(action.payload, (f) => {
      return f.creator === state.defaultAddress
    })

    return Object.assign({}, state, {
      objects: action.payload,
      // selected: foundNode,
      defaultMeshPoint: ownerFaucet
    })
  }

  if (action.type === MESHPOINT_CREATED) {
    // store.dispatch(getMeshPointByCreator(state.defaultAddress))
    store.dispatch(getAllMeshPointObjects())
    // console.log('expect logs to contain address of new point: ', action.payload.logs)
    // return Object.assign({}, state, {
    //   addresses: state.addresses.concat(action.payload.logs[0].args._address)
    // })
  }


  if (action.type === SEND_WEI) {
    return Object.assign({}, state, {
      selected: {
        ...state.selected,
        balance: state.selected.balance - 1
      }
    })
  }

  return state
}
