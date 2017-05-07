export const RECEIVE_MESHPOINT = 'RECEIVE_MESHPOINT'
export const RECEIVE_MESHPOINT_ADDRESSES = 'RECEIVE_MESHPOINT_ADDRESSES'
export const RECEIVE_MESHPOINT_OBJECTS = 'RECEIVE_MESHPOINT_OBJECTS'
export const MESHPOINT_CREATED = 'MESHPOINT_CREATED'

export const FAUCET_AUTHORIZATION_REQUESTED = 'FAUCET_AUTHORIZATION_REQUESTED'
export const FAUCET_AUTHORIZATION_GRANTED = 'FAUCET_AUTHORIZATION_GRANTED'
export const FAUCET_AUTHORIZATION_REVOKED = 'FAUCET_AUTHORIZATION_REVOKED'

export const RECEIVE_FAUCET_EVENT_STORE = 'RECEIVE_FAUCET_EVENT_STORE'

export const SEND_WEI = 'SEND_WEI'

import {
  managerGetMeshPointByCreator,
  managerGetMeshPointByName,
  managerGetMeshPointAddresses,
  managerGetMeshPointObjects,
  managerCreateMeshPoint,
  managerRequestMeshPointAccess,
  managerAuthorizeMeshPointAccess,
  managerRevokeMeshPointAccess,
  meshPointSendWei,

  getEventStoreEvents
} from 'middleware/ethereum/faucet'


import { eventsFromTransaction } from './event-store'


export const getEventStore = (_address) => {
  console.log('getEventStore...', _address)
  return (dispatch) => {
    getEventStoreEvents(_address, (events) => {
      console.log('getEventStore...', events)
      dispatch({
        type: RECEIVE_FAUCET_EVENT_STORE,
        payload: events
      })
    })
  }
}

export const getFaucetByCreator = (_fromAddress) => {
  return (dispatch) => {
    managerGetMeshPointByCreator(_fromAddress, (faucet) => {
      dispatch({
        type: RECEIVE_MESHPOINT,
        payload: faucet
      })
    })
  }
}

export const getFaucetByName = (_name) => {
  return (dispatch) => {
    managerGetMeshPointByName(_name, (faucet) => {
      dispatch({
        type: RECEIVE_MESHPOINT,
        payload: faucet
      })
    })
  }
}

export const getAllMeshPointAddresses = () => {
  return (dispatch) => {
    managerGetMeshPointAddresses(addresses => {
      dispatch({
        type: RECEIVE_MESHPOINT_ADDRESSES,
        payload: addresses
      })
    })
  }
}

export const getAllMeshPointObjects = () => {
  return (dispatch) => {
    managerGetMeshPointObjects(faucets => {
      dispatch({
        type: RECEIVE_MESHPOINT_OBJECTS,
        payload: faucets
      })
    })
  }
}

export const requestFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    managerRequestMeshPointAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx)
       if (events.length) {
        dispatch({
          type: 'FAUCET_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }
      dispatch({
        type: FAUCET_AUTHORIZATION_REQUESTED,
        payload: _tx
      })
    })
  }
}

export const authorizeFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    managerAuthorizeMeshPointAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx)

       if (events.length) {
        dispatch({
          type: 'FAUCET_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }

      dispatch({
        type: FAUCET_AUTHORIZATION_GRANTED,
        payload: _tx
      })
    })
  }
}

export const revokeFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    console.log('revokeFaucetAccess: ', _faucetAddress, _requestorAddress, _fromAddress)
    managerRevokeMeshPointAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx)

       if (events.length) {
        dispatch({
          type: 'FAUCET_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }

      dispatch({
        type: FAUCET_AUTHORIZATION_REVOKED,
        payload: _tx
      })
    })
  }
}

export const createFaucet = (_name, _fromAddress) => {
  return (dispatch) => {
    managerCreateMeshPoint(_name, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx)
      if (events.length) {
        dispatch({
          type: 'FAUCET_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }
      dispatch({
        type: MESHPOINT_CREATED,
        payload: _tx
      })
    })
  }
}

export const sendWei = (_faucetAddress, _recipientAddress, _fromAddress) => {
  return (dispatch) => {
    meshPointSendWei(_faucetAddress, _recipientAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx)
      if (events.length) {
        dispatch({
          type: 'FAUCET_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }
      dispatch({
        type: SEND_WEI,
        payload: _tx
      })
    })
  }
}
