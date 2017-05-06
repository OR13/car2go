import { connect } from 'react-redux'
import MeshPoint from 'components/MeshPoint/MeshPoint'

import { browserHistory } from 'react-router'


import { sendWei, getFaucetByName, requestFaucetAccess } from 'store/ethereum/faucet'

const mapStateToProps = (state, ownProps) => {
  return {
    faucet: state.faucet,
    web3: state.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFaucetByName: (cleanName) => {
      dispatch(getFaucetByName(cleanName));
    },
    onSendWeiFormSubmit: (_faucetAddress, _recipientAddress, _fromAddress) => {
      dispatch(sendWei(_faucetAddress, _recipientAddress, _fromAddress));
    },
    onRequestFaucetAccess: (_faucetAddress, _requestorAddress, _fromAddress) => {
      console.log('_faucetAddress, _requestorAddress, _fromAddress');
      console.log(_faucetAddress, _requestorAddress, _fromAddress);
      dispatch(requestFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress));
    },
    onNavigateToPath: (path) => {
      browserHistory.push(path);
    }
  }
}

const FaucetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MeshPoint)

export default FaucetContainer
