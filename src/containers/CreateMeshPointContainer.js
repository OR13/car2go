import { connect } from 'react-redux'
import CreateMeshPointForm from 'components/CreateMeshPointForm'
import { createMeshPoint } from 'store/ethereum/meshPoint'

const mapStateToProps = (state, ownProps) => {
  return {
    meshPoint: state.meshPoint
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateFaucetSubmit: (data) => {
      event.preventDefault()
      dispatch(createMeshPoint(data.name, data.fromAddress))
    }
  }
}

const CreateMeshPointContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMeshPointForm)

export default CreateMeshPointContainer
