import { connect } from 'react-redux'
import MeshPoint from 'components/MeshPoint/MeshPoint'

import { browserHistory } from 'react-router'


import { sendWei, getMeshPointByName, requestMeshPointAccess } from 'store/ethereum/meshPoint'

const mapStateToProps = (state, ownProps) => {
  return {
    meshPoint: state.meshPoint,
    web3: state.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFaucetByName: (cleanName) => {
      dispatch(getMeshPointByName(cleanName))
    },
    onSendWeiFormSubmit: (_meshPointAddress, _recipientAddress, _fromAddress) => {
      dispatch(sendWei(_meshPointAddress, _recipientAddress, _fromAddress))
    },
    onRequestFaucetAccess: (_meshPointAddress, _requestorAddress, _fromAddress) => {
      console.log('_meshPointAddress, _requestorAddress, _fromAddress')
      console.log(_meshPointAddress, _requestorAddress, _fromAddress)
      dispatch(requestMeshPointAccess(_meshPointAddress, _requestorAddress, _fromAddress))
    },
    onNavigateToPath: (path) => {
      browserHistory.push(path)
    }
  }
}

const MeshPointContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MeshPoint)

export default MeshPointContainer
