import { connect } from 'react-redux'
import MeshPointAuthorizeTable from 'components/MeshPointAuthorizeTable'

import { authorizeMeshPointAccess, revokeMeshPointAccess } from 'store/ethereum/meshPoint'

const mapStateToProps = (state, ownProps) => {
    return {
        meshPoint: state.meshPoint
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthorizeFaucetAccess: (authorizeFaucetAccessBindingModel) => {
            console.log('authorizeFaucetAccessBindingModel: ', authorizeFaucetAccessBindingModel);
            dispatch(authorizeMeshPointAccess(
                authorizeFaucetAccessBindingModel.meshPointAddress,
                authorizeFaucetAccessBindingModel.requestorAddress,
                authorizeFaucetAccessBindingModel.fromAddress
            ))
        },
        onRevokeFaucetAccess: (revokeFaucetAccessBindingModel) => {
            console.log('revokeFaucetAccessBindingModel: ', revokeFaucetAccessBindingModel);
            dispatch(revokeMeshPointAccess(
                revokeFaucetAccessBindingModel.meshPointAddress,
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
