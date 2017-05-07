// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE'


// ------------------------------------
// Helpers
// ------------------------------------

const pathContainsFaucet = (pathname) => {
  return pathname.indexOf('/node/') !== -1
}

export const getFaucetNameFromPath = (path) => {
  if (pathContainsFaucet(path)) {
    let parts = decodeURI(path).split('/')
    let cleanName = parts[2].toLowerCase().replace(/\s+/g, '-')
    return cleanName
  }
  return null
}

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

export const initLocation = (nextLocation) => {
  return (dispatch) => {
     dispatch(locationChange(nextLocation))
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null

export const locationReducer = (state = initialState, action) => {
  return action.type === LOCATION_CHANGE ? action.payload : state
}
