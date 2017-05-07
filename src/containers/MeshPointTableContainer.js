import { connect } from 'react-redux'
import MeshPointTable from 'components/MeshPointTable'

import { browserHistory } from 'react-router'

const mapStateToProps = (state, ownProps) => {
  return {
    meshPointObjects: state.meshPoint.objects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectRow: (rowData) => {
      event.preventDefault()
      // console.info('selected: ', rowData);
      browserHistory.push('/node/' + rowData.name)
    }
  }
}

const MeshPointTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MeshPointTable)

export default MeshPointTableContainer
