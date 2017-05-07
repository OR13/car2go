export const RECEIVE_MESHPOINT = 'RECEIVE_MESHPOINT'
export const RECEIVE_MESHPOINT_ADDRESSES = 'RECEIVE_MESHPOINT_ADDRESSES'
export const RECEIVE_MESHPOINT_OBJECTS = 'RECEIVE_MESHPOINT_OBJECTS'
export const MESHPOINT_CREATED = 'MESHPOINT_CREATED'
export const RECEIVE_MESHPOINT_EVENT_STORE = 'RECEIVE_MESHPOINT_EVENT_STORE'

export const MESHPOINT_AUTHORIZATION_REQUESTED = 'MESHPOINT_AUTHORIZATION_REQUESTED'
export const MESHPOINT_AUTHORIZATION_GRANTED = 'MESHPOINT_AUTHORIZATION_GRANTED'
export const MESHPOINT_AUTHORIZATION_REVOKED = 'MESHPOINT_AUTHORIZATION_REVOKED'

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
} from 'middleware/ethereum/meshPoint'


import { eventsFromTransaction } from './event-store'


export const getEventStore = (_address) => {
  console.log('getEventStore...', _address)
  return (dispatch) => {
    getEventStoreEvents(_address, (events) => {
      console.log('getEventStore...', events)
      dispatch({
        type: RECEIVE_MESHPOINT_EVENT_STORE,
        payload: events
      })
    })
  }
}

export const getMeshPointByCreator = (_fromAddress) => {
  return (dispatch) => {
    managerGetMeshPointByCreator(_fromAddress, (meshPoint) => {
      dispatch({
        type: RECEIVE_MESHPOINT,
        payload: meshPoint
      })
    })
  }
}

export const getMeshPointByName = (_name) => {
  return (dispatch) => {
    managerGetMeshPointByName(_name, (meshPoint) => {
      dispatch({
        type: RECEIVE_MESHPOINT,
        payload: meshPoint
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
    managerGetMeshPointObjects(meshPoints => {
      dispatch({
        type: RECEIVE_MESHPOINT_OBJECTS,
        payload: meshPoints
      })
    })
  }
}

export const requestMeshPointAccess = (_meshPointAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    managerRequestMeshPointAccess(_meshPointAddress, _requestorAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx)
       if (events.length) {
        dispatch({
          type: 'MESHPOINT_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }
      dispatch({
        type: MESHPOINT_AUTHORIZATION_REQUESTED,
        payload: _tx
      })
    })
  }
}

export const authorizeMeshPointAccess = (_meshPointAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    managerAuthorizeMeshPointAccess(_meshPointAddress, _requestorAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx)

       if (events.length) {
        dispatch({
          type: 'MESHPOINT_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }

      dispatch({
        type: MESHPOINT_AUTHORIZATION_GRANTED,
        payload: _tx
      })
    })
  }
}

export const revokeMeshPointAccess = (_meshPointAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    console.log('revokeMeshPointAccess: ', _meshPointAddress, _requestorAddress, _fromAddress)
    managerRevokeMeshPointAccess(_meshPointAddress, _requestorAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx)

       if (events.length) {
        dispatch({
          type: 'MESHPOINT_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }

      dispatch({
        type: MESHPOINT_AUTHORIZATION_REVOKED,
        payload: _tx
      })
    })
  }
}

export const createMeshPoint = (_name, _fromAddress) => {
  return (dispatch) => {
    managerCreateMeshPoint(_name, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx)
      if (events.length) {
        dispatch({
          type: 'MESHPOINT_READ_MODEL_EVENTS_RECEIVED',
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

export const sendWei = (_meshPointAddress, _recipientAddress, _fromAddress) => {
  return (dispatch) => {
    meshPointSendWei(_meshPointAddress, _recipientAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx)
      if (events.length) {
        dispatch({
          type: 'MESHPOINT_READ_MODEL_EVENTS_RECEIVED',
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
