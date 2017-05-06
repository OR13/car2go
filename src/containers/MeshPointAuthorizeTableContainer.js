import { connect } from 'react-redux'
import MeshPointAuthorizeTable from 'components/MeshPointAuthorizeTable'

import { authorizeFaucetAccess, revokeFaucetAccess } from 'store/ethereum/faucet'

const mapStateToProps = (state, ownProps) => {
    return {
        faucet: state.faucet
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthorizeFaucetAccess: (authorizeFaucetAccessBindingModel) => {
            console.log('authorizeFaucetAccessBindingModel: ', authorizeFaucetAccessBindingModel);
            dispatch(authorizeFaucetAccess(
                authorizeFaucetAccessBindingModel.faucetAddress,
                authorizeFaucetAccessBindingModel.requestorAddress,
                authorizeFaucetAccessBindingModel.fromAddress
            ))
        },
        onRevokeFaucetAccess: (revokeFaucetAccessBindingModel) => {
            console.log('revokeFaucetAccessBindingModel: ', revokeFaucetAccessBindingModel);
            dispatch(revokeFaucetAccess(
                revokeFaucetAccessBindingModel.faucetAddress,
                revokeFaucetAccessBindingModel.requestorAddress,
                revokeFaucetAccessBindingModel.fromAddress
            ))
        }
    }
}

const MeshPointAuthorizeTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MeshPointAuthorizeTable)

export default MeshPointAuthorizeTableContainer
