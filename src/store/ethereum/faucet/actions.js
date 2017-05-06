export const RECEIVE_FAUCET = 'RECEIVE_FAUCET'
export const RECEIVE_FAUCET_ADDRESSES = 'RECEIVE_FAUCET_ADDRESSES'
export const RECEIVE_FAUCET_EVENT_STORE = 'RECEIVE_FAUCET_EVENT_STORE'
export const RECEIVE_FAUCET_OBJECTS = 'RECEIVE_FAUCET_OBJECTS'
export const FAUCET_CREATED = 'FAUCET_CREATED'
export const FAUCET_UPDATED = 'FAUCET_UPDATED'
export const SEND_WEI = 'SEND_WEI'

import {
  MeshPointManagerContractGetFaucetByCreator,
  MeshPointManagerContractGetFaucetByName,
  MeshPointManagerContractGetAllFaucetAddresses,
  MeshPointManagerContractGetAllFaucetObjects,
  MeshPointManagerContractCreateFaucet,
  MeshPointManagerContractRequestFaucetAccess,
  MeshPointManagerContractAuthorizeFaucetAccess,
  MeshPointManagerContractRevokeFaucetAccess,
  faucetContractSendWei,
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
    MeshPointManagerContractGetFaucetByCreator(_fromAddress, (faucet) => {
      dispatch({
        type: RECEIVE_FAUCET,
        payload: faucet
      })
    })
  }
}

export const getFaucetByName = (_name) => {
  return (dispatch) => {
    MeshPointManagerContractGetFaucetByName(_name, (faucet) => {
      dispatch({
        type: RECEIVE_FAUCET,
        payload: faucet
      })
    })
  }
}

export const getAllFaucetAddresses = () => {
  return (dispatch) => {
    MeshPointManagerContractGetAllFaucetAddresses(addresses => {
      dispatch({
        type: RECEIVE_FAUCET_ADDRESSES,
        payload: addresses
      })
    })
  }
}

export const getAllFaucetObjects = () => {
  return (dispatch) => {
    MeshPointManagerContractGetAllFaucetObjects(faucets => {
      dispatch({
        type: RECEIVE_FAUCET_OBJECTS,
        payload: faucets
      })
    })
  }
}

export const requestFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    MeshPointManagerContractRequestFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {
      console.log('requestFaucetAccess transaction:', _tx)
      let events = eventsFromTransaction(_tx)
      console.log('requestFaucetAccess events:', events)
      if (events.length) {
        dispatch({
          type: 'FAUCET_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }
    })
  }
}

export const authorizeFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    MeshPointManagerContractAuthorizeFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {
      let events = eventsFromTransaction(_tx)
      if (events.length) {
        dispatch({
          type: 'FAUCET_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }
    })
  }
}

export const revokeFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    console.log('revokeFaucetAccess: ', _faucetAddress, _requestorAddress, _fromAddress)
    MeshPointManagerContractRevokeFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {
      let events = eventsFromTransaction(_tx)

      if (events.length) {
        dispatch({
          type: 'FAUCET_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }
    })
  }
}

export const createFaucet = (_name, _fromAddress) => {
  return (dispatch) => {
    MeshPointManagerContractCreateFaucet(_name, _fromAddress, (_tx) => {
      let events = eventsFromTransaction(_tx)

      if (events.length) {
        dispatch({
          type: 'FAUCET_READ_MODEL_EVENTS_RECEIVED',
          payload: events
        })
      }

      dispatch({
        type: FAUCET_CREATED,
        payload: _tx
      })
    })
  }
}

export const sendWei = (_faucetAddress, _recipientAddress, _fromAddress) => {
  return (dispatch) => {
    faucetContractSendWei(_faucetAddress, _recipientAddress, _fromAddress, (_tx) => {
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
