import { connect } from 'react-redux'
import CreateMeshPointForm from 'components/CreateMeshPointForm'
import { createFaucet } from 'store/ethereum/faucet'

const mapStateToProps = (state, ownProps) => {
  return {
    faucet: state.faucet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateFaucetSubmit: (data) => {
      event.preventDefault()
      dispatch(createFaucet(data.name, data.fromAddress))
    }
  }
}

const CreateMeshPointContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMeshPointForm)

export default CreateMeshPointContainer
